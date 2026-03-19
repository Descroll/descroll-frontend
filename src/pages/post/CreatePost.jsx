import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BottomNav from "../../components/navigation/BottomNav";

function CreatePost() {
    const username = "my username";
    const navigate = useNavigate();

//temp for post button being disabled if the fields are empty
//temp for being able to add an image to a new post creation
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        if (selectedFile){setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const isPostEnabled = text.trim() !== "" || file !== null;
//this is temp so that when you click post it will take you to the post details page
    const handlePostSubmit = () => {
        if (!isPostEnabled) return;

        navigate("/posts/:id",{state:{username, caption:text, previewUrl, fileType: file ? file.type : "",},});
    };


    return (
        <div className="create-post-page">
            <div className="create-post-card">
                <div className="create-post-header">
                    <Link to="/profile" className="back-btn">back</Link>

                    <h2>new post</h2>
                    <button className="post-btn" disabled={!isPostEnabled} onClick={handlePostSubmit}>post</button>

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