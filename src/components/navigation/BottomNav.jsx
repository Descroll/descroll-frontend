import { useLocation, useNavigate } from 'react-router-dom';
import BASE_URL from '../../api';
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

function ConnectionsIcon({ active }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.931 6.936l1.275 4.249m5.607 5.609l4.251 1.275"
        stroke={active ? '#FFAABB' : '#1a1a2e'}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M11.683 12.317l5.759 -5.759"
        stroke={active ? '#FFAABB' : '#1a1a2e'}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M4 5.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0"
        stroke={active ? '#FFAABB' : '#1a1a2e'}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M17 5.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0"
        stroke={active ? '#FFAABB' : '#1a1a2e'}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M17 18.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0"
        stroke={active ? '#FFAABB' : '#1a1a2e'}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M4 15.5a4.5 4.5 0 1 0 9 0a4.5 4.5 0 1 0 -9 0"
        stroke={active ? '#FFAABB' : '#1a1a2e'}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function AltConnectionsIcon({ active }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"
        stroke={active ? '#FFAABB' : '#1a1a2e'}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"
        stroke={active ? '#FFAABB' : '#1a1a2e'}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M16 3.13a4 4 0 0 1 0 7.75"
        stroke={active ? '#FFAABB' : '#1a1a2e'}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M21 21v-2a4 4 0 0 0 -3 -3.85"
        stroke={active ? '#FFAABB' : '#1a1a2e'}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

const tabs = [
  { path: '/home',        Icon: HomeIcon          },
  { path: '/connections', Icon: ConnectionsIcon  },
  { path: '/posts/new',   Icon: CreateIcon        },
  { path: '/profile',     Icon: ProfileIcon       },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();


  const handleLogout = async () => {
    try {

      const response = await fetch(`${BASE_URL}/auth/logout`, {
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