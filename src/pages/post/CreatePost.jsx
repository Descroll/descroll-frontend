import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";
import BottomNav from "../../components/navigation/BottomNav";
import StateBox from "../../components/StateBox";

function CreatePost() {
    const username = "my username";
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

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

    useEffect(() =>{ setTimeout(()=>{try {setLoading(false);} catch {setError(true); setLoading(false);} }, 800);}, []);


    //this is temp so that when you click post it will take you to the post details page
    const handlePostSubmit = () => {
        if (!isPostEnabled) return;

        try {
            setSuccess(true);
            setTimeout(() => {navigate("/posts/:id",{state:{username, caption:text, previewUrl, fileType: file ? file.type : "",},});}, 800);

        } catch {setError(true)};

        //navigate("/posts/:id",{state:{username, caption:text, previewUrl, fileType: file ? file.type : "",},});
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

                    {loading && <StateBox title="loading post creator..." />}
                    {error && <StateBox title="something went wrong" subtitle="try again later" />}
                    {!loading && !error && success && <StateBox title="post created" subtitle="sending you to your post..." />}
                    
                    {!loading && !error && !success && (
                        <>
                        

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
                        </>
                    )}
                </div>  

               

            </div>

           <BottomNav />
            
        </div>

    );
}
export default CreatePost;