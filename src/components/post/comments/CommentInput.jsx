import React, { useState } from 'react';
import BASE_URL from '../../../api';

// passing postId so backend knows the post to attach the comment to
export default function CommentInput({ postId, onCommentAdded }) {
  const [commentValue, setCommentValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitComment = async () => {
    if (!commentValue.trim()) return;
    setIsSubmitting(true);

    try {
      const res = await fetch(`${BASE_URL}/posts/${postId}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ text: commentValue.trim() }),
      });

      if (!res.ok) throw new Error('Failed to post comment');
      const newComment = await res.json();
      setCommentValue('');
      if (onCommentAdded) onCommentAdded(newComment);
    } catch (err) {
      console.error('Failed to post comment', err);
    } finally {
      setIsSubmitting(false);
    }
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
        {isSubmitting ? 'posting...' : 'post'}
      </button>
    </div>
  );
}