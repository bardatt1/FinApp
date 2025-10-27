import React from 'react';  // Remove useEffect if not used

function ProfilePage({ user }) {  // Remove setUser if not used
  return (
    <div className="page profile-page">
      <h1>Profile</h1>
      {user && (
        <div className="profile-info">
          <p>Welcome, {user.name}</p>
          {/* Add more profile content here */}
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
