import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Feed from './pages/post/PostFeed';
import Profile from './pages/profile/Profile';
import CreatePost from './pages/post/CreatePost';
import PostDetail from './pages/post/PostDetail';
import EditPost from './pages/post/EditPost';
import BottomNav from './components/navigation/BottomNav';
import UserProfile from './pages/profile/OtherProfile';
import EditProfile from './pages/profile/EditProfile';
import SearchUsers from './pages/home/SearchUsers';
import ConnectionsPage from './pages/home/Connections';
import ThemeStore from './pages/themes/ThemeStore';
import Dashboard from './pages/admin/AdminDashboard';

const HIDE_NAV = ['/login', '/signup'];

function AppContent() {
  const location = useLocation();
  const showNav = !HIDE_NAV.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/posts/new" element={<CreatePost />} />
        <Route path="/posts/:post_id" element={<PostDetail />} />
        <Route path="/posts/:post_id/edit" element={<EditPost />} />
        <Route path="/search" element={<SearchUsers />} />
        <Route path="/connections" element={<ConnectionsPage />} />
        <Route path="/themes" element={<ThemeStore />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
      {showNav && <BottomNav />}
    </>
  );
}

export default function App() {
  return <AppContent />;
}
