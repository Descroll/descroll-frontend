import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BottomNav from '../../components/navigation/BottomNav';
import './UserProfile.css';
import { apiFetch } from '../../api';
import UserGallery from '../../components/post/UserGallery';

function UserProfile() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [profileData, setProfileData] = useState(null);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    //new state tracking if this user is blocked
    const [isBlocked, setIsBlocked] = useState(false);

    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            try {
                setLoading(true);
                
                const [profileRes, postsRes] = await Promise.all([
                    apiFetch(`/user/${id}/profile`),
                    apiFetch(`/user/${id}/posts`)
                ]);

                if (!profileRes.ok) {
                    throw new Error(`HTTP error: Status ${profileRes.status}`);
                }
                if (!postsRes.ok) {
                    throw new Error(`HTTP error: Status ${postsRes.status}`);
                }
                const [profileJson, postsJson] = await Promise.all([
                    profileRes.json(),
                    postsRes.json()
                ])

                setProfileData(profileJson);
                setPosts(postsJson);
                
                // ** this flag needs to be added to the backend **
                if (profileJson.isBlocked !== undefined) {
                    setIsBlocked(profileJson.isBlocked);
                }
                
                setError(null);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message);
                setProfileData({ username: "Error", bio: "Could not load profile." });
            } finally {
                setLoading(false); 
            }
        };

            fetchData();
    }, [id]);

    const handleRemoveConnection = async () => {
        try {
            const res = await apiFetch(`/connections/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error(`HTTP error: Status ${res.status}`);
            
            const data = await res.json();
            console.log(data.message); 
            alert("Connection removed"); 
        } catch (err) {
            console.error("Failed to remove connection:", err);
            alert("Could not remove connection.");
        }
    };

    const handleBlockUser = async () => {
        try {
            const res = await apiFetch(`/users/${id}/block`, {
                method: 'POST',
            });
            if (!res.ok) throw new Error(`HTTP error: Status ${res.status}`);
            
            setIsBlocked(true); 
            alert("User blocked");
        } catch (err) {
            console.error("Failed to block user:", err);
            alert("Could not block user.");
        }
    };

    const handleUnblockUser = async () => {
        try {
            const res = await apiFetch(`/users/${id}/block`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error(`HTTP error: Status ${res.status}`);
            
            setIsBlocked(false);
            alert("User unblocked");
        } catch (err) {
            console.error("Failed to unblock user:", err);
            alert("Could not unblock user.");
        }
    };

    if (error) {
        return <div className="profile-page" style={{padding: '2rem'}}>Error: {error}</div>;
    }

    return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="profile-cover"></div>

                <div className="profile-info">
                    <div className="profile-avatar">{profileData?.avatar_url && (
                        <img src={profileData.avatar_url} alt="avatar" />
                    )}</div>

                    <h2 className="profile-username">{loading ? "Loading..." : profileData?.username}</h2>
                    <p className="profile-bio">{loading ? "..." : profileData?.bio}</p>

                    {/*<div className="user-profile-actions">
                        <button 
                            className="remove-btn"
                            onClick={handleRemoveConnection}
                        >
                            remove connection
                        </button>
                        {/*<button className="message-btn">message</button>
                        
                        {isBlocked ? (
                            <button 
                                className="unblock-btn"
                                onClick={handleUnblockUser}
                                style={{ backgroundColor: '#666', color: 'white' }}
                            >
                                unblock
                            </button>
                        ) : (
                            <button 
                                className="block-btn" 
                                onClick={handleBlockUser}
                                style={{ backgroundColor: '#ff4d4d', color: 'white' }}
                            >
                                block
                            </button>
                        )}
                    </div>*/}
                </div>

                <div className="profile-posts">
                    <div className="profile-section">
                        <h3>posts</h3>
                    </div>

                    {loading ? (
                        <div className="user-posts"><p>Loading posts...</p></div>
                    ) : posts.length === 0 ? (
                        <div className="user-posts">
                            <p>no posts yet...</p>
                            <span>this user hasn't posted anything yet</span>
                        </div>
                    ) : (
                        <UserGallery
                            posts={posts}
                            username={profileData?.username}
                            avatarUrl={profileData?.avatar_url}
                        />
                    )}
                </div>

                <BottomNav />
            </div>
        </div>
    );
}

export default UserProfile;