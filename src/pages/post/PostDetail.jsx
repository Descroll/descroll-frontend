import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/post.css"
import BottomNav from "../../components/navigation/BottomNav";

function PostDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const postData = location.state || { id: 1, username: "username", caption: "just a sample caption for rn", previewUrl: "", fileType: "" };
    const { id, username, caption, previewUrl, fileType } = postData;

    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const markAsSeen = async () => {
            try {
                await fetch(`http://localhost:5000/posts/${id}/seen`, { method: 'POST' });
            } catch (err) {
                console.error("Failed to mark seen:", err);
            }
        };
        markAsSeen();
    }, [id]);

    const handleToggleSave = async () => {
        try {
            const method = isSaved ? 'DELETE' : 'POST';
            const res = await fetch(`http://localhost:5000/posts/${id}/save`, { method });
            
            if (!res.ok) throw new Error("Failed to toggle save");
            setIsSaved(!isSaved);
        } catch (err) {
            console.error("Error saving post:", err);
            alert("Could not update save status.");
        }
    };

    const handleDeletePost = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`http://localhost:5000/me/post/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error("Failed to delete post");
            
            alert("Post deleted!");
            navigate('/profile'); 
        } catch (err) {
            console.error("Error deleting post:", err);
            alert("Could not delete post.");
        }
    };

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
                        <div className="post-user-info">
                            <div className="mini-avatar"></div>
                            <span className="post-username">{username}</span>
                        </div>
                        
                        <div className="post-actions">
                            <button onClick={handleToggleSave} className="save-btn">
                                {isSaved ? "unsave" : "save"}
                            </button>
                            <button onClick={handleDeletePost} className="delete-btn">
                                delete
                            </button>
                        </div>
                    </div>

                    {previewUrl && (
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