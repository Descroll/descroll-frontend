import React, { useState } from 'react';

const Comment = ({ comment, onReply }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReplySubmit = () => {
    if (replyText.trim()) {
      onReply(comment.id, replyText);
      setReplyText('');
      setShowReplyBox(false);
    }
  };

  return (
    <div className="comment-container">
      <p><strong>{comment.author}</strong>: {comment.text}</p>
      {/* Button to toggle the reply input box */}
      <button onClick={() => setShowReplyBox(!showReplyBox)}>
        {showReplyBox ? 'Cancel Reply' : 'Reply'}
      </button>

      {/* Conditional rendering of the reply box */}
      {showReplyBox && (
        <div className="reply-box">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Add a reply..."
          />
          <button onClick={handleReplySubmit}>Post Reply</button>
        </div>
      )}

      {/* Recursively render nested replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="replies-container">
          {comment.replies.map(reply => (
            <Comment key={reply.id} comment={reply} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
