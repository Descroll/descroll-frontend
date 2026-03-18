import { useParams } from 'react-router-dom';
import BottomNav from '../../components/navigation/BottomNav';
import './UserProfile.css';

function UserProfile() {
    const { id } = useParams();

    // placeholder data — replace with real fetch later
    const username = "their username";
    const bio = "their bio/info";
    const posts = []; // fill with real posts later

    return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="profile-cover"></div>

                <div className="profile-info">
                    {/* placeholder for their photo */}
                    <div className="profile-avatar"></div>

                    <h2 className="profile-username">{username}</h2>

                    <p className="profile-bio">{bio}</p>

                    <div className="user-profile-actions">
                        <button className="follow-btn">follow</button>
                        <button className="message-btn">message</button>
                    </div>
                </div>

                <div className="profile-posts">
                    <div className="profile-section">
                        <h3>posts</h3>
                    </div>

                    {posts.length === 0 ? (
                        <div className="user-posts">
                            <p>no posts yet...</p>
                            <span>this user hasn't posted anything yet</span>
                        </div>
                    ) : (
                        <div className="posts-grid">
                            {posts.map((post) => (
                                <div key={post.id} className="post-thumbnail">
                                    {/* render post thumbnails here */}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <BottomNav />
            </div>
        </div>
    );
}

export default UserProfile;