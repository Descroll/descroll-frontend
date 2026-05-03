import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/auth/AuthContext';
import { apiFetch } from '../../api';
import BottomNav from '../../components/navigation/BottomNav';
import { useTheme } from '../../components/ui/ThemeContext';

function Settings() {
    const { logout } = useAuth();
    const navigate   = useNavigate();

    const [emailForm, setEmailForm]     = useState({ email: '', password: '' });
    const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [emailStatus, setEmailStatus]   = useState(null);
    const [passwordStatus, setPasswordStatus] = useState(null);
    const [emailLoading, setEmailLoading]     = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const { resetTheme } = useTheme();

    const handleEmailChange = async () => {
        if (!emailForm.email || !emailForm.password) {
        return setEmailStatus({ error: 'Please fill in all fields' });
        }
        setEmailLoading(true);
        setEmailStatus(null);
        try {
        const res = await apiFetch('/me/email', {
            method: 'PATCH',
            body: JSON.stringify(emailForm),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to update email');
        setEmailStatus({ success: 'Email updated successfully' });
        setEmailForm({ email: '', password: '' });
        } catch (err) {
        setEmailStatus({ error: err.message });
        } finally {
        setEmailLoading(false);
        }
    };

    const handlePasswordChange = async () => {
        if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
        return setPasswordStatus({ error: 'Please fill in all fields' });
        }
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        return setPasswordStatus({ error: 'New passwords do not match' });
        }
        if (passwordForm.newPassword.length < 8) {
        return setPasswordStatus({ error: 'Password must be at least 8 characters' });
        }
        setPasswordLoading(true);
        setPasswordStatus(null);
        try {
        const res = await apiFetch('/me/password', {
            method: 'PATCH',
            body: JSON.stringify({
            currentPassword: passwordForm.currentPassword,
            newPassword:     passwordForm.newPassword,
            }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to update password');
        setPasswordStatus({ success: 'Password updated successfully' });
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
        setPasswordStatus({ error: err.message });
        } finally {
        setPasswordLoading(false);
        }
    };

    const handleLogout = () => {
        resetTheme();
        logout();
        navigate('/login');
    };

    return (
        <div className="create-post-page">
        <div className="create-post-card">
            <div className="create-post-header">
            <button className="back-btn" onClick={() => navigate('/profile')}>back</button>
            <h2>settings</h2>
            <div style={{ width: 40 }} />
            </div>

            <div className="create-post-body" style={{ gap: 24 }}>

            {/* Theme store link */}
            <div className="settings-section">
                <h3>appearance</h3>
                <Link to="/themes" className="settings-row">
                <span>theme store</span>
                <span>›</span>
                </Link>
            </div>

            {/* Change email */}
            <div className="settings-section">
                <h3>change email</h3>
                {emailStatus?.error   && <p style={{ color: 'red',   fontSize: '0.85rem' }}>{emailStatus.error}</p>}
                {emailStatus?.success && <p style={{ color: 'green', fontSize: '0.85rem' }}>{emailStatus.success}</p>}
                <input
                className="auth-input"
                type="email"
                placeholder="new email"
                value={emailForm.email}
                onChange={(e) => setEmailForm((p) => ({ ...p, email: e.target.value }))}
                />
                <input
                className="auth-input"
                type="password"
                placeholder="confirm with current password"
                value={emailForm.password}
                onChange={(e) => setEmailForm((p) => ({ ...p, password: e.target.value }))}
                />
                <button
                className="primary-btn"
                onClick={handleEmailChange}
                disabled={emailLoading}
                >
                {emailLoading ? 'saving...' : 'update email'}
                </button>
            </div>

            {/* Change password */}
            <div className="settings-section">
                <h3>change password</h3>
                {passwordStatus?.error   && <p style={{ color: 'red',   fontSize: '0.85rem' }}>{passwordStatus.error}</p>}
                {passwordStatus?.success && <p style={{ color: 'green', fontSize: '0.85rem' }}>{passwordStatus.success}</p>}
                <input
                className="auth-input"
                type="password"
                placeholder="current password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))}
                />
                <input
                className="auth-input"
                type="password"
                placeholder="new password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))}
                />
                <input
                className="auth-input"
                type="password"
                placeholder="confirm new password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))}
                />
                <button
                className="primary-btn"
                onClick={handlePasswordChange}
                disabled={passwordLoading}
                >
                {passwordLoading ? 'saving...' : 'update password'}
                </button>
            </div>

            {/* Logout */}
            <div className="settings-section">
                <button
                className="primary-btn"
                onClick={handleLogout}
                style={{ background: '#ff4d4d' }}
                >
                log out
                </button>
            </div>

            </div>
        </div>
        <BottomNav />
        </div>
    );
}

export default Settings;