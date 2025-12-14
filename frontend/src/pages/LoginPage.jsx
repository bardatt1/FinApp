import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Client-side validation
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!password.trim()) {
      setError("Password is required");
      return;
    }
    
    setLoading(true);

    try {
      const result = await login(email.trim(), password);
      if (result.success) {
        // Redirect to shop page after successful login
        navigate("/shop");
      } else {
        setError(result.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: "url('/pictures/ferrr.jpg')" }}>
      {/* LEFT LOGIN PANEL */}
      <div className="login-left-panel">
        <div className="login-logo">FINAPP</div>

        <div className="login-avatar">
          <i className="fas fa-user login-avatar-icon"></i>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error-message">{error}</div>}
          
          <div className="login-input-container">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
          </div>
          <div className="login-input-container">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? "LOGGING IN..." : "LOGIN"}
          </button>

          <div className="login-register-section">
            <p className="login-no-account-text">
              Don't have an account?
              <span
                className="login-register-link"
                onClick={() => navigate("/register")}
              >
                {" "}
                Sign up
              </span>
            </p>
          </div>
        </form>
      </div>

      {/* RIGHT PANEL WITH MERCH BACKGROUND */}
      <div className="login-right-panel" style={{ backgroundImage: "url('/pictures/ferrr.jpg')" }}>
        <div className="login-overlay">
          <h1 className="login-welcome-text">Shop Smarter with FINAPP</h1>
          <p className="login-welcome-desc">
            Discover stylish merch, manage your budget, and shop effortlessly —
            all in one platform made for smart shoppers like you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
