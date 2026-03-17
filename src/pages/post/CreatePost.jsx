import { useState } from "react";
import { Link } from "react-router-dom";

function CreatePost() {
    const username = "my username";
//temp for being able to add an image to a new post creation
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];
        if (file){
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };


    return (
        <div className="create-post-page">
            <div className="create-post-card">
                <div className="create-post-header">
                    <Link to="/profile" className="back-btn">back</Link>

                    <h2>new post</h2>
                    <button className="post-btn">post</button>

                </div>

                <div className="create-post-body">
                    <div className="user-row">
                        {/*placeholder for the users photo*/}
                        <div className="mini-avatar"></div> 
                        <span className="post-username">{username}</span>

                    </div>
                    
                
                    <textarea className="post-textarea" placeholder="what are you sharing today?"></textarea>

                    <div className="upload-section">

                        <label className="upload-box">
                            {selectedImage ? (
                                <img src={selectedImage} alt="preview" className="upload-preview"/>
                            ):(
                                <div className="upload-placeholder">
                                    <span className="upload-icon">+</span>
                                    <span>add a photo</span>
                                </div>
                            )}

                            <input type="file" accept="image/*" onChange={handleImageChange} hidden/>
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
export default CreatePost;