import React, { useState, useEffect } from 'react';

const Comment = ({ postId, comment, onReplyAdded }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReplySubmit = () => {
    if (!replyText.trim()) return;
    setIsSubmitting(true);

    fetch(`http://localhost:5000/posts/${postId}/comments/${comment.id}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: replyText })
    })
      .then((res) => res.json())
      .then((newReply) => {
        setReplyText('');
        setShowReplyBox(false);
        if (onReplyAdded) onReplyAdded(comment.id, newReply);
      })
      .catch((err) => console.error("Failed to post reply", err))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="comment-container">
      <p><strong>{comment.author || 'User'}</strong>: {comment.text}</p>
      
      <button 
        className="textbox"
        onClick={() => setShowReplyBox(!showReplyBox)}
      >
        {showReplyBox ? 'Cancel' : 'Reply'}
      </button>

      {showReplyBox && (
        <div className="reply-box">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Add a reply..."
            className="reply"
          />
          <button 
            onClick={handleReplySubmit} 
            disabled={!replyText.trim() || isSubmitting}
            className="text-sm"
          >
            Post
          </button>
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="replies-container">
          {comment.replies.map(reply => (
            <Comment 
              key={reply.id} 
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


export default function CommentList({ postId }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/posts/${postId}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch comments", err);
        setIsLoading(false);
      });
  }, [postId]);

  const handleReplyAdded = (parentCommentId, newReply) => {
    const addReplyToTree = (commentsList) => {
      return commentsList.map(c => {
        if (c.id === parentCommentId) {
          return { ...c, replies: [...(c.replies || []), newReply] };
        }
        if (c.replies) {
          return { ...c, replies: addReplyToTree(c.replies) };
        }
        return c;
      });
    };
    setComments(prev => addReplyToTree(prev));
  };

  if (isLoading) return <p className="loading">Loading comments...</p>;
  if (comments.length === 0) return <p className="no-comments">No comments yet.</p>;

  return (
    <div className="comments-list">
      {comments.map(comment => (
        <Comment 
          key={comment.id} 
          postId={postId} 
          comment={comment} 
          onReplyAdded={handleReplyAdded} 
        />
      ))}
    </div>
  );
}