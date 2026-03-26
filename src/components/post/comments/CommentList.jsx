import { useState, useEffecvt} from 'react';

const Comment = ({ comment }) => {
    return(
        <div className="comment">
            <p><strong>{comment.user}</strong>{comment.text}</p>
        </div>
    );
};

const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // Fetch comments for the given postId
        fetch(`/api/posts/${postId}/comments`)
            .then(response => response.json())
            .then(data => setComments(data))
            .catch(error => console.error('Error fetching comments:', error));
    }, [postId]);

    return (
        <div className = "comments-section">
            <h3>Comments</h3>
            {comments.map(comment => (
                <Comment key={comment.id} comment={comment} />
            ))}
            <CommentBox
                commentValue= {this.state.commentValue}
                handleCommentValue={this.handleCommentValue}
                enterCommentLine={this.enterCommentLine}
                submitCommentLine={this.submitCommentLine}
            />
        </div>
    )
}

export default CommentList;