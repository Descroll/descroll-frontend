import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../../api';

const Comment = ({ postId, comment, onReplyAdded }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReplySubmit = async () => {
    if (!replyText.trim()) return;
    setIsSubmitting(true);

    try {
      const res = await apiFetch(
        `/posts/${postId}/comments/${comment.comment_id}/reply`,
        {
          method: 'POST',
          body: JSON.stringify({ text: replyText.trim() }),
        }
      );
      if (!res.ok) throw new Error('Failed to post reply');
      const newReply = await res.json();
      setReplyText('');
      setShowReplyBox(false);
      if (onReplyAdded) onReplyAdded(comment.comment_id, newReply);
    } catch (err) {
      console.error('Failed to post reply', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleReplySubmit();
  };

  return (
    <div className="comment-container">
      <div className="comment-main">
        <span className="comment-author">{comment.author || 'User'}</span>
        <p className="comment-text">{comment.content}</p>
      </div>
      
      <button
        className="reply-toggle-btn"
        onClick={() => setShowReplyBox(!showReplyBox)}
      >
        {showReplyBox ? 'Cancel' : 'Reply'}
      </button>

      {showReplyBox && (
        <div className="reply-input-box">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a reply..."
            className="reply-input"
            autoFocus
          />
          <button 
            onClick={handleReplySubmit}
            disabled={!replyText.trim() || isSubmitting}
            className="reply-submit-btn"
          >
            {isSubmitting ? 'posting...' : 'post'}
          </button>
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="replies-container">
          {comment.replies.map((reply) => (
            <Comment 
              key={reply.comment_id}
              postId={postId}
              comment={reply}
              onReplyAdded={onReplyAdded}
            />
          ))}
        </div>
      )}
    </div>
  );
};


export default function CommentList({ postId, newComments = [] }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiFetch(`/posts/${postId}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data)
      })
      .catch((err) => {
        console.error("Failed to fetch comments", err)
      })
      .finally(() => setIsLoading(false));
  }, [postId]);

  const allComments = [...comments, ...newComments.filter(
    (nc) => !comments.find((c) => c.comment_id === nc.comment_id)
  )];

  const handleReplyAdded = (parentCommentId, newReply) => {
    const addReplyToTree = (commentsList) => {
      return commentsList.map(c => {
        if (c.comment_id === parentCommentId) {
          return { ...c, replies: [...(c.replies || []), newReply] };
        }
        if (c.replies) {
          return { ...c, replies: addReplyToTree(c.replies) };
        }
        return c;
      });
    };
    setComments( (prev) => addReplyToTree(prev));
  };

  if (isLoading) return <p className="loading">Loading comments...</p>;
  if (comments.length === 0) return <p className="no-comments">No comments yet.</p>;

  return (
    <div className="comments-list">
      {allComments.map((comment) => (
        <Comment 
          key={comment.comment_id}
          postId={postId}
          comment={comment}
          onReplyAdded={handleReplyAdded}
        />
      ))}
    </div>
  );
}