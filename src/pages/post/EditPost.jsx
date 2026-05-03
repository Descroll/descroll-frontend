import { useState } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../components/auth/AuthContext";
import "../../styles/post.css";
import "../../App.css";
import BottomNav from "../../components/navigation/BottomNav";
import { apiFetch } from "../../api";

function EditPost() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { post_id } = useParams();

    const post = location.state || {};
    
//temp for post button being disabled if the fields are empty
//temp for being able to add an image to a new post creation
    const [text, setText] = useState(post.caption || "");
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(post.media_url || "");
    const [fileType, setFileType] = useState(post.media_type || "");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const [showDeletePostModal, setShowDeletePostModal] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
            setFileType(selectedFile.type.startsWith("video/") ? "video" : "image");
        }
    };

    const isPostEnabled = (text.trim() !== "" || previewUrl !== "") && !isSubmitting;

    const handleSave = async () => {
        if (!isPostEnabled) return;
        setIsSubmitting(true);
        setError(null);

        try {
            let media_url  = post.media_url  || null;
            let media_type = post.media_type || null;

            // If a new file was selected, upload it to R2 first
            if (file) {
                const urlRes = await apiFetch(
                    `/me/upload-url?filename=${encodeURIComponent(file.name)}&filetype=${encodeURIComponent(file.type)}`
                );
                if (!urlRes.ok) throw new Error("Failed to get upload URL");
                const { uploadUrl, mediaUrl } = await urlRes.json();

                const uploadRes = await fetch(uploadUrl, {
                    method: "PUT",
                    headers: { "Content-Type": file.type },
                    body: file,
                });
                if (!uploadRes.ok) throw new Error("Failed to upload file");

                media_url  = mediaUrl;
                media_type = file.type.startsWith("video/") ? "video" : "image";
            }

            const res = await apiFetch(`/me/post/${post_id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    caption: text.trim() || null,
                    media_url,
                    media_type,
                }),
            });
            if (!res.ok) throw new Error("Failed to update post");
            const updated = await res.json();

            navigate(`/posts/${post_id}`, { state: updated });
        } catch (err) {
            console.error(err);
            setError(err.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="create-post-page">
            <div className="create-post-card">
                <div className="create-post-header">
                    <button className="back-btn" onClick={() => navigate(-1)}>back</button>

                    <h2>edit post</h2>

                    <div className="edit-post-actions">
                        <button className="remove-btn" type="button" onClick={() => setShowDeletePostModal(true)}>delete</button>
                        <button className="post-btn" disabled={!isPostEnabled} onClick={handleSave}>{isSubmitting ? "saving..." : "save"}</button>
                    </div>


                </div>

                <div className="create-post-body">
                    <div className="user-row">
                        {/*placeholder for the users photo*/}
                        <div className="mini-avatar">{currentUser?.avatar_url || null}</div>
                        <span className="post-username">{post.display_name || "you"}</span>

                    </div>
                    {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}
                
                    <textarea className="post-textarea" placeholder="what are you sharing today?" value={text} onChange={(e) => setText(e.target.value)}></textarea>

                    <div className="upload-section">

                        <label className="upload-box">
                            {previewUrl ? (
                                fileType === "video" || fileType.startsWith("video/") ? (
                                    <video className="upload-preview" controls>
                                        <source src={previewUrl} type={file?.type || "video/mp4"} />
                                    video type not supported
                                    </video>
                                ) : (
                                <img src={previewUrl} alt="preview" className="upload-preview" />
                                )
                            ) : (
                                <div className="upload-placeholder">
                                    <span className="upload-icon">+</span>
                                    <span>add a photo or video</span>
                                </div>
                            )}

                            <input type="file" accept="image/*, video/*" onChange={handleFileChange} hidden/>
                        </label>

                    </div>
                </div> 

                {showDeletePostModal && (
                    <div className='modal-overlay'>
                        <div className='modal-card'>
                            <h3>delete post</h3>
                            <p>are you sure that you want to delete this post?</p>
                            <p className='warning-text'>this action can NOT be undone.</p>

                            <div className='modal-actions'>
                                <button className='cancel-btn' onClick={() => setShowDeletePostModal(false)}>cancel</button>

                                <button className='danger-btn' onClick={() => console.log("deleting post...")}>delete</button>
                            </div>
                        </div>
                    </div>
                )} 

              <BottomNav />

            </div>
            
        </div>

    );
}
export default EditPost;