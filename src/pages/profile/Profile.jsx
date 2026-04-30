import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../components/auth/AuthContext';
import BottomNav from '../../components/navigation/BottomNav';
import "../../styles/profile.css";
import UserGallery from '../../components/post/UserGallery';
import BASE_URL from '../../api';

function Profile() {
    const { id } = useParams();
    const { currentUser } = useAuth();
    const targetId = id || currentUser?.id;
    const isOwnProfile = !id || Number(id) === Number(currentUser?.id);

    const [profileData, setProfileData] = useState(null);
    const [posts, setPosts] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    const [activeTab, setActiveTab] = useState('posts');
    const [pendingRequests, setPendingRequests] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!targetId) return;
        const fetchAllProfileData = async () => {
            try {
                setIsLoading(true);

                const [profileRes, postsRes] = await Promise.all([
                    fetch(`${BASE_URL}/user/${targetId}/profile`, { credentials: 'include' }),
                    fetch(`${BASE_URL}/user/${targetId}/posts`,   { credentials: 'include' }),
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
                    const savedRes = await fetch(`${BASE_URL}/me/posts/saved`, {
                        credentials: 'include',
                    });
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


    const handleAccept = async (connectionId) => {
        try {
            const res = await fetch(`${BASE_URL}/connections/${connectionId}/accept`, {
                method: "PATCH",
            });
            if (!res.ok) throw new Error("Failed to accept request");
            
            setPendingRequests((prev) => prev.filter(req => req.id !== connectionId));
        } catch (err) {
            console.error(err);
        }
    };


    const handleReject = async (connectionId) => {
        try {
            const res = await fetch(`${BASE_URL}/connections/${connectionId}/reject`, {
                method: "PATCH",
            });
            if (!res.ok) throw new Error("Failed to reject request");
            
            setPendingRequests((prev) => prev.filter(req => req.id !== connectionId));
        } catch (err) {
            console.error(err);
        }
    };

    if (error) return <div className="profile-page" style={{padding: '2rem'}}>Error: {error}</div>;
    return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="profile-cover"></div>

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
                        // Connection actions handled in UserProfile for other users
                        <Link to={`/user/${targetId}`} className="connections-btn">
                        view profile
                        </Link>
                    )}
                    
                    <button className="connections-btn">connections</button>
                </div>

                {targetId === 'me' && pendingRequests.length > 0 && (
                    <div>
                        <h3>Pending Requests</h3>
                        {pendingRequests.map((req) => (
                            <div key={req.id}>
                                <span>{req.requester_name || 'A user'}</span>
                                <button type="button" onClick={() => handleAccept(req.id)}>Accept</button>
                                <button type="button" onClick={() => handleReject(req.id)}>Reject</button>
                            </div>
                        ))}
                    </div>
                )}
                
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
                        <UserGallery posts={activeTab === 'posts' ? posts : savedPosts} />
                    )}
                </div>
                
                <BottomNav />
            </div>
        </div>
    );
}

export default Profile;