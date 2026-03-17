function Profile() {
    const username = "my username";
    const bio = "bio/info";
    return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="profile-cover"></div>

                <div className="profile-info">
                    {/*placeholder for the users photo*/}
                    <div className="profile-avatar"></div>

                    <h2 className="profile-username">{username}</h2>

                    <p className="profile-bio">{bio}</p>
                    <button className="connections-btn">connections</button>
                   
                    
                </div>
                <div className="profile-posts">
                    <div className="profile-section">
                        <h3>posts</h3> 
                    </div>

                    <div className="user-posts">
                        <p>no posts yet...</p>
                        <span>your photos, videos, and text posts will show here</span>
                    </div>
                </div>
                <div className="navbar-temp">
                    navbar will be here
                </div>
            </div>
            
        </div>

    );
}
export default Profile;