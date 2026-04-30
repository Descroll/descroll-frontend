import React from 'react';

const UserResult = ({ user, loading, error }) => {
  if (loading) {
    return <div className="user-result-loading">Loading user...</div>;
  }

  if (error) {
    return <div className="user-result-error">Error: Could not load user.</div>;
  }

  if (!user) {
    return <div className="user-result-empty">No user found.</div>;
  }

  return (
    <div className="user-result-card">
      <h4>{user.display_name}</h4>
      <p>{user.bio}</p>

    </div>
  );
};

export default UserResult;