import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../components/auth/AuthContext";
import "../../styles/post.css"
import "../../App.css";
import BottomNav from "../../components/navigation/BottomNav";
import CommentInput from "../../components/post/comments/CommentInput";
import CommentList from "../../components/post/comments/CommentList";
import { apiFetch } from "../../api";

function PostDetail() {
    const { post_id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [post, setPost] = useState(location.state || null);

    const [isSaved, setIsSaved] = useState(location.state?.isSaved || false);
    const [loading, setLoading] = useState(!location.state);
    const [error, setError]     = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await apiFetch(`/posts/${post_id}`);
                if (!res.ok) throw new Error("Post not found");
                const data = await res.json();
                setPost(data);
                setIsSaved(data.isSaved);
            } catch (err) {
                console.error(err);
                setError("Could not load post.");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [post_id]);

    useEffect(() => {
        if (!post_id) return;
        apiFetch(`/posts/${post_id}/seen`, {
            method: "POST",
        }).catch((err) => console.error("Failed to mark seen:", err));
    }, [post_id]);

    const handleToggleSave = async () => {
        try {
            const method = isSaved ? 'DELETE' : 'POST';
            const res = await apiFetch(`/posts/${post_id}/save`, {method});
            
            if (!res.ok) throw new Error("Failed to toggle save");
            setIsSaved(!isSaved);
        } catch (err) {
            console.error("Error saving post:", err);
        }
    };

    const handleDeletePost = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (!confirmDelete) return;

        try {
            const res = await apiFetch(`/me/post/${post_id}`, { method: 'DELETE'});
            if (!res.ok) throw new Error("Failed to delete post");
            
            navigate('/profile');
        } catch (err) {
            console.error("Error deleting post:", err);
        }
    };

    const handleCommentAdded = (newComment) => {
        setComments((prev) => [...prev, newComment]);
    };

    if (loading) return <div className="post-detail-page"><p className="loading-text">Loading...</p></div>;
    if (error)   return <div className="post-detail-page"><p className="error-text">{error}</p></div>;
    if (!post)   return null;

    const isOwner = currentUser && Number(currentUser.id) === Number(post.user_id);

    return (
        <div className="post-detail-page">
            <div className="post-detail-card">
                <div className="post-detail-header">
                    <button className="back-btn" onClick={() => navigate(-1)}>back</button>
                    
                    {isOwner && (
                        <Link to={`/posts/${post_id}/edit`} state={post} className="edit-btn">edit</Link>
                    )}
                </div>

                <div className="post-detail-body">
                    <div className="user-row">
                        <div className="post-user-info">
                            <div className="mini-avatar">
                                {post.avatar_url && (
                                    <img src={post.avatar_url} alt="avatar" />
                                )}
                            </div>

                            <span className="post-username">
                                {post.display_name}
                            </span>
                        </div>
                        
                        <div className="post-actions">
                            <button onClick={handleToggleSave} className="save-btn">
                                {isSaved ? "unsave" : "save"}
                            </button>
                            {isOwner && (
                                <button onClick={handleDeletePost} className="delete-btn">
                                delete
                            </button>)}
                        </div>
                    </div>

                    {post.media_url && (
                        post.media_type === "video" ? (
                            <video className="post-detail-preview" controls>
                                <source src={post.media_url} type="video/mp4" />
                                video type not supported
                            </video>
                        ) : (
                            <img src={post.media_url} alt="post preview" className="post-detail-preview"/>
                        )
                    )}

                    {post.caption && <p className="post-detail-caption">{post.caption}</p>}

                    <div className="post-comments-section">
                        <h3>comments</h3>
                        <CommentInput postId={post_id} onCommentAdded={handleCommentAdded} />
                        <CommentList postId={post_id} newComments={comments} />
                    </div>
                </div>

                <BottomNav />
            </div>
        </div>
    );
}
export default PostDetail;