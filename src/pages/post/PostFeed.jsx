import { useState, useEffect, useRef, useCallback } from 'react' 
import PostCard from "../../components/post/PostCard";
import BottomNav from "../../components/navigation/BottomNav";
import { apiFetch } from '../../api';
import "../../styles/feed.css";

const LIMIT = 10;

export default function Feed() {
  const [posts, setPosts] = useState([])
  const [cursor, setCursor] = useState(null);
  //const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const loaderRef = useRef(null);

  const seenRef = useRef(new Set());

  const markSeen = useCallback(async (postIds) => {
    const unseenIds = postIds.filter((id) => !seenRef.current.has(id));
    if (unseenIds.length === 0) return;

    // Fire-and-forget — mark seen in the background, don't block UI
    await Promise.allSettled(
      unseenIds.map((id) =>
        apiFetch(`/posts/${id}/seen`, {
          method: "POST",
        })
      )
    );

    unseenIds.forEach((id) => seenRef.current.add(id));
  }, []);

  const fetchPosts = useCallback(async (currentCursor) => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(null);

    try {
      const url = currentCursor
        ? `/feed?limit=${LIMIT}&cursor=${currentCursor}`
        : `/feed?limit=${LIMIT}`;

      const res = await apiFetch(url);
      if (!res.ok) throw new Error("Failed to fetch feed");

      const { posts: newPosts, nextCursor } = await res.json();

      setPosts((prev) => [...prev, ...newPosts]);
      setCursor(nextCursor);
      if (!nextCursor) {
        setHasMore(false);
        const allIds = newPosts.map((p) => p.post_id);
        markSeen(allIds);
      }
    } catch (err) {
      console.error(err);
      setError("Could not load feed.");
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, markSeen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchPosts(cursor);
        }
      },
      { threshold: 1.0 }
    );

    const el = loaderRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [cursor, hasMore, loading, fetchPosts]);

  return (
    <div className="feed-page">
      <div className="feed-card">
        <h1 className="feed-title">Feed</h1>

        {posts.length === 0 && !loading && (
          <div className="empty-feed">
            <p>nothing new to see</p>
            <span>connect with people to see their posts here</span>
          </div>
        )}

        <div className="feed-posts">
          {posts.map((post) => (
            <PostCard key={post.post_id} post={post} mode="feed" />
          ))}
        </div>

        {/* Sentinel — IntersectionObserver triggers next page fetch when this is visible */}
        <div ref={loaderRef} style={{ height: 1 }} />

        {loading && <p className="loading-text">Loading...</p>}
        {error   && <p className="error-text">{error}</p>}
        {!hasMore && posts.length > 0 && (
          <p className="end-of-feed">you're all caught up</p>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
