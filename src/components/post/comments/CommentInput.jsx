import React, { useState } from 'react';

// passing postId so backend knows the post to attach the comment to
export default function CommentInput({ postId, onCommentAdded }) {
  const [commentValue, setCommentValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitComment = () => {
    if (!commentValue.trim()) return;
    setIsSubmitting(true);


    fetch(`http://localhost:5000/posts/${postId}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: commentValue })
    })
      .then((res) => res.json())
      .then((newComment) => {
        setCommentValue('');
        if (onCommentAdded) onCommentAdded(newComment);
      })
      .catch((err) => console.error("Failed to post comment", err))
      .finally(() => setIsSubmitting(false));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') submitComment();
  };

  return (
    <div className="comments-box">
      <input 
        id="comments-input"
        type="text" 
        value={commentValue}
        onChange={(e) => setCommentValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a comment..."
      />
      <button 
        onClick={submitComment} 
        disabled={!commentValue.trim() || isSubmitting}
      >
        Post
      </button>
    </div>
  );
}