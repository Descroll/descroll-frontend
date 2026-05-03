import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/auth/AuthContext';
import BottomNav from '../../components/navigation/BottomNav';
import { apiFetch } from '../../api';

function EditProfile() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const [displayName, setDisplayName] = useState('');
    const [bio, setBio]                 = useState('');
    const [avatarFile, setAvatarFile]   = useState(null);
    const [avatarPreview, setAvatarPreview] = useState('');
    const [isSubmitting, setIsSubmitting]   = useState(false);
    const [error, setError]             = useState(null);

    // Pre-fill with current profile data
    useEffect(() => {
        apiFetch(`/user/${currentUser.id}/profile`)
        .then((res) => res.json())
        .then((data) => {
            setDisplayName(data.display_name || '');
            setBio(data.bio || '');
            setAvatarPreview(data.avatar_url || '');
        })
        .catch((err) => console.error('Failed to load profile:', err));
    }, []);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleSave = async () => {
        setIsSubmitting(true);
        setError(null);

        try {
        let avatar_url = null;

        // Upload new avatar to R2 if one was selected
        if (avatarFile) {
            const urlRes = await apiFetch(`/me/upload-url?filename=${encodeURIComponent(avatarFile.name)}&filetype=${encodeURIComponent(avatarFile.type)}`);
            if (!urlRes.ok) throw new Error('Failed to get upload URL');
            const { uploadUrl, mediaUrl } = await urlRes.json();

            const uploadRes = await fetch(uploadUrl, {
            method: 'PUT',
            headers: { 'Content-Type': avatarFile.type },
            body: avatarFile,
            });
            if (!uploadRes.ok) throw new Error('Failed to upload avatar');
            avatar_url = mediaUrl;
        }

        const res = await apiFetch(`/me/profile`, {
            method: 'PATCH',
            body: JSON.stringify({
            display_name: displayName.trim() || null,
            bio:          bio.trim() || null,
            avatar_url,
            }),
        });
        if (!res.ok) throw new Error('Failed to update profile');

        navigate('/profile');
        } catch (err) {
        console.error(err);
        setError(err.message || 'Something went wrong');
        } finally {
        setIsSubmitting(false);
        }
    };

    return (
        <div className="create-post-page">
        <div className="create-post-card">
            <div className="create-post-header">
            <button className="back-btn" onClick={() => navigate('/profile')}>back</button>
            <h2>edit profile</h2>
            <button
                className="post-btn"
                onClick={handleSave}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'saving...' : 'save'}
            </button>
            </div>

            <div className="create-post-body">
            {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}

            {/* Avatar */}
            <div className="avatar-upload-section">
                <label className="avatar-upload-label">
                <div className="edit-profile-avatar">
                    {avatarPreview
                    ? <img src={avatarPreview} alt="avatar preview" />
                    : <span>+</span>
                    }
                </div>
                <span className="avatar-upload-hint">tap to change photo</span>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    hidden
                />
                </label>
            </div>

            {/* Display name */}
            <div className="form-field">
                <label htmlFor="display-name">display name</label>
                <input
                id="display-name"
                type="text"
                className="auth-input"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="your name"
                maxLength={50}
                />
            </div>

            {/* Bio */}
            <div className="form-field">
                <label htmlFor="bio">bio</label>
                <textarea
                id="bio"
                className="post-textarea"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="tell people a little about yourself"
                maxLength={160}
                />
            </div>
            </div>
        </div>

        <BottomNav />
        </div>
    );
}

export default EditProfile;