function CreatePost() {
    const username = "my username";
    return (
        <div className="create-post-page">
            <div className="create-post-card">
                <div className="create-post-header">

                    <button className="back-btn">back</button>
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

                        <div className="upload-box">
                            <span>add a photo or video</span>
                        </div>

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