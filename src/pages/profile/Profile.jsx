function Profile() {
    return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="profile-cover"></div>

                <div className="profile-info">
                    <div className="profile-avatar"></div>

                    <h2 className="profile-username">my username</h2>
                    <p className="profile-bio">bio/info</p>
                    <p className="profile-connections">connections</p>
                    
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