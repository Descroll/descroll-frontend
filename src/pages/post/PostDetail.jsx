import { Link, useLocation} from "react-router-dom";
import "../../styles/post.css"
import BottomNav from "../../components/navigation/BottomNav";

function PostDetail() {
    const location = useLocation();
    const postData = location.state || {username:"username", caption:"just a sample caption for rn", previewUrl:"",fileType:"", };
    const {username, caption, previewUrl, fileType} = postData;

    return (
        <div className="post-detail-page">
            <div className="post-detail-card">
                <div className="post-detail-header">
                    <Link to="/profile" className="back-btn">back</Link>

                    <h2>post</h2>

                    <Link to="/posts/:id/edit" state={{username, caption, previewUrl, fileType}} className="edit-btn">edit</Link>
                </div>

                <div className="post-detail-body">
                    <div className="user-row">
                        <div className="mini-avatar"></div>
                        <span className="post-username">{username}</span>
                    </div>

                    {previewUrl && (                        // this lets you do a local preview of a post made in createpost page
                        fileType.startsWith("video/") ? (
                            <video className="post-detail-preview" controls>
                                <source src={previewUrl} type={fileType} />
                                video type not supported
                            </video>
                        ) : (
                            <img src={previewUrl} alt="post preview" className="post-detail-preview"/>
                        )
                    )}

                    {caption && <p className="post-detail-caption">{caption}</p>}

                    <div className="post-comments-section">
                        <h3>comments</h3>
                        <div className="empty-comments">
                            <p>no comments yet...</p>
                            <span>comments will appear here later</span>
                        </div>
                    </div>
                </div>

                <BottomNav />
            </div>
            
        </div>

    );
}
export default PostDetail;