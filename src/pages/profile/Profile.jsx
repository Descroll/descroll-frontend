import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BottomNav from '../../components/navigation/BottomNav';
import "../../styles/profile.css";
import UserGallery from '../../components/post/UserGallery';

function Profile() {

    const { id } = useParams(); 

    const [profileData, setProfileData] = useState({ username: "Loading...", bio: "" });
    const [posts, setPosts] = useState([]);
    

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchAllProfileData = async () => {
            try {
                setIsLoading(true);
                

                const targetId = id || 'me'; 


                const profileRes = await fetch(`http://localhost:5000/user/${targetId}/profile`);
                if (!profileRes.ok) throw new Error('Failed to fetch profile info');
                const profileJson = await profileRes.json();
                

                const postsRes = await fetch(`http://localhost:5000/user/${targetId}/posts`);
                if (!postsRes.ok) throw new Error('Failed to fetch user posts');
                const postsJson = await postsRes.json();


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
    }, [id]);


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
                    <p><Link to="/settings" className='settings-btn'>settings</Link></p>
                    
                </div>
                
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