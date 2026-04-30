import { useState } from 'react';
import './PostCard.css';

function LikeIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

// mode: "feed" | "grid"
export default function PhotoPost({ post, mode = 'feed', onClick }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount ?? 0);

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  if (mode === 'grid') {
    return (
      <div className="post-card grid" onClick={onClick}>
        <div className="post-grid-thumb">
          <img src={post.imageUrl} alt={post.caption ?? 'photo'} />
          <div className="post-grid-overlay">
            <ImageIcon />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="post-card feed">
      <div className="post-header">
        <div className="post-avatar">
          {post.avatarUrl && <img src={post.avatarUrl} alt={post.username} />}
        </div>
        <div className="post-meta">
          <span className="post-username">{post.username}</span>
          <span className="post-timestamp">{post.timestamp}</span>
        </div>
      </div>

      <img className="post-image" src={post.imageUrl} alt={post.caption ?? 'photo'} />

      {post.caption && <p className="post-caption">{post.caption}</p>}

      <div className="post-actions">
        {/*<button className={`post-action-btn${liked ? ' liked' : ''}`} onClick={handleLike}>
          <LikeIcon filled={liked} />
          {likeCount}
        </button>*/}
        <button className="post-action-btn" onClick={onClick}>
          <CommentIcon />
          {post.commentCount ?? 0}
        </button>
      </div>
    </div>
  );
}