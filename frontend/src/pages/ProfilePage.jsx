import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in (replace with your Auth logic)
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser) {
      // If no user is logged in, redirect to login page
      navigate('/login');
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #6a11cb, #6a6f76ff)',
    fontFamily: 'Poppins, sans-serif',
  };

  const cardStyle = {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '12px',
    width: '400px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    textAlign: 'center',
  };

  const titleStyle = {
    marginBottom: '20px',
    color: '#333',
  };

  const infoStyle = {
    margin: '10px 0',
    fontSize: '16px',
    color: '#555',
  };

  const buttonStyle = {
    marginTop: '20px',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '8px',
    background: '#2575fc',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  };

  const handleLogout = () => {
    // Clear user data and redirect to login
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return null; // Optional: You can show a loading spinner here
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Profile</h2>
        <p style={infoStyle}><strong>Username:</strong> {user.username}</p>
        <p style={infoStyle}><strong>Email:</strong> {user.email}</p>
        <button style={buttonStyle} onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default ProfilePage;
