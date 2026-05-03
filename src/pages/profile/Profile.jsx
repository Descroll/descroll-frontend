import { useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../components/auth/AuthContext';
import BottomNav from '../../components/navigation/BottomNav';
import "../../styles/profile.css";
import "../../App.css";
import UserGallery from '../../components/post/UserGallery';
import { apiFetch } from '../../api';

function Profile() {
    const { id } = useParams();
    const { currentUser } = useAuth();
    const targetId = id || currentUser?.id;
    const isOwnProfile = !id || Number(id) === Number(currentUser?.id);

    const [profileData, setProfileData] = useState(null);
    const [posts, setPosts] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    const [activeTab, setActiveTab] = useState('posts');    const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!targetId) return;
        const fetchAllProfileData = async () => {
            try {
                setIsLoading(true);

                const [profileRes, postsRes] = await Promise.all([
                    apiFetch(`/user/${targetId}/profile`),
                    apiFetch(`/user/${targetId}/posts`),
                ]);

                if (!profileRes.ok) throw new Error('Failed to fetch profile info');
                if (!postsRes.ok) throw new Error('Failed to fetch user posts');

                const [profileJson, postsJson] = await Promise.all([
                    profileRes.json(),
                    postsRes.json()
                ]);

                setProfileData(profileJson);
                setPosts(postsJson);

                if (isOwnProfile) {
                    const savedRes = await apiFetch(`/me/posts/saved`);
                    if (savedRes.ok) setSavedPosts(await savedRes.json());
                }

                setError(null);

            } catch (err) {
                console.error("Error loading profile:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllProfileData();
    }, [targetId, isOwnProfile]);

    if (error) return <div className="profile-page" style={{ padding: '2rem' }}>Error: {error}</div>;

    return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="profile-cover"></div>

                {isOwnProfile && (
                    <Link to="/settings" className="settings-icon-btn">
                        ⚙️
                    </Link>
                )}

                <div className="profile-info">
                    <div className="profile-avatar">
                        {profileData?.avatar_url && (
                            <img src={profileData.avatar_url} alt="avatar" />
                        )}
                    </div>

                    <h2 className="profile-username">
                        {isLoading ? "Loading..." : profileData?.display_name}
                    </h2>

                    <p className="profile-bio">
                        {isLoading ? "..." : profileData?.bio}
                    </p>

                    {isOwnProfile ? (
                        <Link to="/profile/edit" className="edit-profile-btn">
                        edit profile
                        </Link>
                    ) : (
                        <Link to={`/user/${targetId}`} className="connections-btn">
                        view profile
                        </Link>
                    )}

                    {targetId === 'me' && (
                        <button className='remove-btn' onClick={() => setShowDeleteAccountModal(true)}>delete account</button>
                    )}
                </div>
                
                <div className="profile-posts">
                    <div className="profile-section">
                        <button className={`tab-btn ${activeTab === 'posts' ? 'active' : ''}`} onClick={() => setActiveTab('posts')}>posts</button>
                        {isOwnProfile && (
                            <button className={`tab-btn ${activeTab === 'saved' ? 'active' : ''}`} onClick={() => setActiveTab('saved')}>saved</button>
                        )}
                    </div>

                    {isLoading ? (
                        <p>Loading posts...</p>
                    ) : (
                        <UserGallery
                            posts={activeTab === 'posts' ? posts : savedPosts}
                            username={profileData?.display_name}
                            avatarUrl={profileData?.avatar_url}
                        />
                    )}
                </div>

                {showDeleteAccountModal && (
                    <div className='modal-overlay'>
                        <div className='modal-card'>
                            <h3>delete account</h3>
                            <p>are you sure that you want to delete your account?</p>
                            <p className='warning-text'>this action can NOT be undone.</p>

                            <div className='modal-actions'>
                                <button className='cancel-btn' onClick={() => setShowDeleteAccountModal(false)}>cancel</button>

                                <button className='danger-btn' onClick={() => console.log("deleting account...")}>delete account</button>
                            </div>
                        </div>
                    </div>
                )}
                
                <BottomNav />
            </div>
        </div>
    );
}

export default Profile;