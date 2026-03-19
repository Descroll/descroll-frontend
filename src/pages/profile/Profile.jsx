import BottomNav from '../../components/navigation/BottomNav';
import "../../styles/profile.css";
import UserGallery from '../../components/post/UserGallery';
function Profile() {
    const username = "my username";
    const bio = "bio/info";
    const posts = [] //fill this in later with real data
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
                    <UserGallery posts={posts} /> {/* replace with real posts later */}
                </div>
                <BottomNav />
            </div>
            
        </div>

    );
}
export default Profile;