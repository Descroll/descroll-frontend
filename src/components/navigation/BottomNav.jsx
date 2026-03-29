import { useLocation, useNavigate } from 'react-router-dom';
import './BottomNavStyle.css';

function HomeIcon({ active }) {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 14L16 5L26 14V26C26 26.55 25.55 27 25 27H20V20H12V27H7C6.45 27 6 26.55 6 26V14Z"
        stroke={active ? '#FFAABB' : '#1a1a2e'}
        strokeWidth="2"
        strokeLinejoin="round"
        fill={active ? 'rgba(255,160,180,0.15)' : 'none'}
      />
    </svg>
  );
}

function CreateIcon({ active }) {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="18" cy="18" r="14"
        stroke={active ? '#FFAABB' : '#1a1a2e'}
        strokeWidth="2.2"
        fill={active ? 'rgba(255,160,180,0.1)' : 'none'}
      />
      <path
        d="M18 12V24M12 18H24"
        stroke={active ? '#FFAABB' : '#1a1a2e'}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ProfileIcon({ active }) {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="16" cy="11" r="5"
        stroke={active ? '#FFAABB' : '#1a1a2e'}
        strokeWidth="2"
        fill={active ? 'rgba(255,160,180,0.15)' : 'none'}
      />
      <path
        d="M6 27C6 21.477 10.477 17 16 17C21.523 17 26 21.477 26 27"
        stroke={active ? '#FFAABB' : '#1a1a2e'}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

// SCRUM-63: New icon for the logout button
function LogoutIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M12 26H8C6.89543 26 6 25.1046 6 24V8C6 6.89543 6.89543 6 8 6H12M20 22L26 16M26 16L20 10M26 16H10" 
        stroke="#1a1a2e" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

const tabs = [
  { path: '/home',      Icon: HomeIcon    },
  { path: '/posts/new', Icon: CreateIcon  },
  { path: '/profile',   Icon: ProfileIcon },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();


  const handleLogout = async () => {
    try {

      const response = await fetch('http://localhost:5000/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {

        navigate('/login'); 
      } else {
        console.error('Logout failed on the backend.');
      }
    } catch (error) {
      console.error('Network error while trying to log out:', error);
    }
  };

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav__pill">
        {tabs.map(({ path, Icon }) => {
          const active = location.pathname === path;
          return (
            <button
              key={path}
              className={`bottom-nav__tab${active ? ' bottom-nav__tab--active' : ''}`}
              onClick={() => navigate(path)}
            >
              <Icon active={active} />
            </button>
          );
        })}

        <button
          className="bottom-nav__tab"
          onClick={handleLogout}
          aria-label="Logout"
        >
          <LogoutIcon />
        </button>
      </div>
    </nav>
  );
}