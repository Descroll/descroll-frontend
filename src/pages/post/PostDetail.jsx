import { Link } from "react-router-dom";
import "../../styles/post.css"
function PostDetail() {
    const username = "username"
    const caption = "this is just a sample for rn for captions, will come from post data later."

    return (
        <div className="post-detail-page">
            <div className="post-detail-card">
                <div className="post-detail-header">
                    <Link to="/profile" className="back-btn">back</Link>

                    <h2>post</h2>

                    <div style={{width: "40px" }}></div>
                </div>

                <div className="post-detail-body">
                    <div className="user-row">
                        <div className="mini-avatar"></div>
                        <span className="post-username">{username}</span>
                    </div>

                    <div className="post-detail-media"></div>

                    <p className="post-detail-caption">{caption}</p>

                    <div className="post-comments-section">
                        <h3>comments</h3>
                        <div className="empty-comments">
                            <p>no comments yet...</p>
                            <span>comments will appear here later</span>
                        </div>
                    </div>
                </div>

                <div className="navbar-temp">navbar will be here</div>
            </div>
            
        </div>

    );
}
export default PostDetail;