import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/auth/AuthContext";
import BottomNav from "../../components/navigation/BottomNav";
import { apiFetch } from "../../api";

function CreatePost() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

//temp for post button being disabled if the fields are empty
//temp for being able to add an image to a new post creation
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError]         = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        if (selectedFile){setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const isPostEnabled = (text.trim() !== "" || file !== null) && !isSubmitting;
//this is temp so that when you click post it will take you to the post details page
    const handlePostSubmit = async () => {
        if (!isPostEnabled) return;

        setIsSubmitting(true);
        setError(null);

        try {
            let media_url  = null;
            let media_type = null;

            // Step 1: If there's a file, get a presigned URL from the backend and upload to R2
            if (file) {
                const urlRes = await apiFetch(
                    `/me/upload-url?filename=${encodeURIComponent(file.name)}&filetype=${encodeURIComponent(file.type)}`
                );
                if (!urlRes.ok) throw new Error("Failed to get upload URL");
                const { uploadUrl, mediaUrl } = await urlRes.json();

                // Step 2: PUT the file directly to R2 (no auth header needed — URL is presigned)
                const uploadRes = await fetch(uploadUrl, {
                    method: "PUT",
                    headers: { "Content-Type": file.type },
                    body: file,
                });
                if (!uploadRes.ok) throw new Error("Failed to upload file");

                media_url  = mediaUrl;
                media_type = file.type.startsWith("video/") ? "video" : "image";
            }

            // Step 3: Create the post with the CDN URL (or just caption if text-only)
            const postRes = await apiFetch(`/me/post`, {
                method: "POST",
                body: JSON.stringify({
                    caption:    text.trim() || null,
                    media_url,
                    media_type,
                }),
            });
            if (!postRes.ok) throw new Error("Failed to create post");
            const newPost = await postRes.json();

        navigate(`/posts/${newPost.post_id}`, { state: newPost });
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
                    <Link to="/profile" className="back-btn">back</Link>

                    <h2>new post</h2>
                    <button className="post-btn" disabled={!isPostEnabled} onClick={handlePostSubmit}>{isSubmitting ? "posting..." : "post"}</button>

                </div>

                <div className="create-post-body">
                    <div className="user-row">
                        <div className="user-row">
                            <div className="mini-avatar">
                            {currentUser?.avatar_url && (
                                <img src={currentUser.avatar_url} alt="avatar" />
                            )}
                            </div>
                            <span className="post-username">{currentUser?.display_name || "you"}</span>
                        </div>
                        {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}

                    </div>
                    
                
                    <textarea className="post-textarea" placeholder="what are you sharing today?" value={text} onChange={(e) => setText(e.target.value)} />

                    <div className="upload-section">

                        <label className="upload-box">
                            {file ? (
                                file.type.startsWith("video/") ? (
                                    <video className="upload-preview" controls>
                                        <source src={previewUrl} type={file.type}/> not supported video tag
                                    </video>
                                    ) : (
                                    <img src={previewUrl} alt="preview" className="upload-preview"/>

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

               

            </div>

           <BottomNav />
            
        </div>

    );
}
export default CreatePost;