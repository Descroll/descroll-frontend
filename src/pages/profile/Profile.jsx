import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BottomNav from '../../components/navigation/BottomNav';
import "../../styles/profile.css";
import UserGallery from '../../components/post/UserGallery';

function Profile() {
    const { id } = useParams(); 
    const targetId = id || 'me'; 

    const [profileData, setProfileData] = useState({ username: "Loading...", bio: "" });
    const [posts, setPosts] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]); 

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllProfileData = async () => {
            try {
                setIsLoading(true);

                const profileRes = await fetch(`http://localhost:5000/user/${targetId}/profile`);
                if (!profileRes.ok) throw new Error('Failed to fetch profile info');
                const profileJson = await profileRes.json();
                
                const postsRes = await fetch(`http://localhost:5000/user/${targetId}/posts`);
                if (!postsRes.ok) throw new Error('Failed to fetch user posts');
                const postsJson = await postsRes.json();

                if (targetId === 'me') {
                    const reqsRes = await fetch(`http://localhost:5000/connections/${targetId}/pending`);
                    if (reqsRes.ok) {
                        const reqsJson = await reqsRes.json();
                        setPendingRequests(reqsJson);
                    }
                }

                setProfileData(profileJson);
                setPosts(postsJson);
                setError(null);

            } catch (err) {
                console.error("Error loading profile:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllProfileData();
    }, [targetId]);


    const handleAccept = async (connectionId) => {
        try {
            const res = await fetch(`http://localhost:5000/connections/${connectionId}/accept`, {
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
            const res = await fetch(`http://localhost:5000/connections/${connectionId}/reject`, {
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
                    <div className="profile-avatar"></div>

                    <h2 className="profile-username">
                        {isLoading ? "Loading..." : profileData.username}
                    </h2>

                    <p className="profile-bio">
                        {isLoading ? "..." : profileData.bio}
                    </p>
                    
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
                        <h3>posts</h3> 
                    </div>

                    {isLoading ? (
                        <p>Loading posts...</p>
                    ) : (
                        <UserGallery posts={posts} />
                    )}
                </div>
                
                <BottomNav />
            </div>
        </div>
    );
}

export default Profile;