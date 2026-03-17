import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../styles/post.css";

function EditPost() {
    
    const navigate = useNavigate();
    const location = useLocation();

    const postData = location.state || {username:"username", caption:"", previewUrl:"",fileType:"", };
    const username = postData.username;
//temp for post button being disabled if the fields are empty
//temp for being able to add an image to a new post creation
    const [text, setText] = useState(postData.caption || "");
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(postData.previewUrl || "");
    const [fileType, setFileType] = useState(postData.fileType || "");

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
            setFileType(selectedFile.type);
        }
    };

    const isPostEnabled = text.trim() !== "" || previewUrl !== "";
//this is temp so that when you click post it will take you to the post details page
    const handlePostSubmit = () => {
        if (!isPostEnabled) return;

        navigate("/post-detail",{state:{username, caption:text, previewUrl, fileType,},});
    };


    return (
        <div className="create-post-page">
            <div className="create-post-card">
                <div className="create-post-header">
                    <Link to="/post-detail" className="back-btn">back</Link>

                    <h2>edit post</h2>
                    <button className="post-btn" disabled={!isPostEnabled} onClick={handlePostSubmit}>save</button>

                </div>

                <div className="create-post-body">
                    <div className="user-row">
                        {/*placeholder for the users photo*/}
                        <div className="mini-avatar"></div> 
                        <span className="post-username">{username}</span>

                    </div>
                    
                
                    <textarea className="post-textarea" placeholder="what are you sharing today?" value={text} onChange={(e) => setText(e.target.value)}></textarea>

                    <div className="upload-section">

                        <label className="upload-box">
                            {previewUrl ? (
                                fileType.startsWith("video/") ? (
                                    <video className="upload-preview" controls>
                                        <source src={previewUrl} type={fileType} />
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

                <div className="navbar-temp">
                navbar will be here
                </div>

            </div>

           
            
        </div>

    );
}
export default EditPost;