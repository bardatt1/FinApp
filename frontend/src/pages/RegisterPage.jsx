import React, { useState } from 'react';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Registering with\nUsername: ${username}\nEmail: ${email}\nPassword: ${password}`);
    // Replace alert with actual registration logic
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #6a11cb, #6a6f76ff)',
    fontFamily: 'Poppins, sans-serif',
  };

  const formStyle = {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '12px',
    width: '350px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    margin: '10px 0',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    marginTop: '15px',
    border: 'none',
    borderRadius: '8px',
    background: '#2575fc',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  };

  const linkStyle = {
    textAlign: 'center',
    marginTop: '15px',
    fontSize: '14px',
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={titleStyle}>Register</h2>

        <label>Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={inputStyle}
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>Register</button>

        <p style={linkStyle}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
