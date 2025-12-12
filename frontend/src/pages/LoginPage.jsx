import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
    <div style={styles.container}>
      {/* LEFT LOGIN PANEL */}
      <div style={styles.leftPanel}>
        <div style={styles.logo}>FINAPP</div>

        <div style={styles.avatar}>
          <i className="fas fa-user" style={styles.icon}></i>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {error && <div style={styles.errorMessage}>{error}</div>}
          
          <div style={styles.inputContainer}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputContainer}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.options}>
            <label style={styles.checkboxLabel}>
              <input type="checkbox" style={styles.checkbox} /> Remember me
            </label>
            <button style={styles.forgotPassword}>
              Forgot password?
            </button>
          </div>

          <button 
            type="submit" 
            style={{
              ...styles.loginButton,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }} 
            disabled={loading}
          >
            {loading ? "LOGGING IN..." : "LOGIN"}
          </button>

          <div style={styles.registerSection}>
            <p style={styles.noAccountText}>
              Don't have an account?
              <span
                style={styles.registerLink}
                onClick={() => navigate("/register")}
              >
                {" "}
                Sign up
              </span>
            </p>
          </div>
          
          <div style={styles.demoCredentials}>
            <p style={styles.demoTitle}>Demo Credentials:</p>
            <p style={styles.demoText}>User: user@finapp.com / password123</p>
            <p style={styles.demoText}>Admin: admin@finapp.com / admin123</p>
          </div>
        </form>

        <div style={styles.dots}>
          <span style={styles.dot}></span>
          <span style={{ ...styles.dot, backgroundColor: "#a42c2c" }}></span>
          <span style={styles.dot}></span>
        </div>
      </div>

      {/* RIGHT PANEL WITH MERCH BACKGROUND */}
      <div style={styles.rightPanel}>
        <div style={styles.overlay}>
          <h1 style={styles.welcomeText}>Shop Smarter with FINAPP</h1>
          <p style={styles.welcomeDesc}>
            Discover stylish merch, manage your budget, and shop effortlessly —
            all in one platform made for smart shoppers like you.
          </p>
          <button style={styles.shopNowBtn}>Start Shopping</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100%",
    fontFamily: "Poppins, sans-serif",
  },
  leftPanel: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopRightRadius: "20px",
    borderBottomRightRadius: "20px",
    boxShadow: "2px 0 20px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#a42c2c",
    marginBottom: "25px",
  },
  avatar: {
    width: "70px",
    height: "70px",
    backgroundColor: "#a42c2c",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "25px",
  },
  icon: {
    color: "#fff",
    fontSize: "30px",
  },
  form: {
    width: "80%",
    maxWidth: "320px",
  },
  inputContainer: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    border: "1.5px solid #a42c2c",
    borderRadius: "25px",
    fontSize: "14px",
    outline: "none",
  },
  options: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
    marginBottom: "20px",
    color: "#444",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
  },
  checkbox: { marginRight: "5px" },
  forgotPassword: {
    color: "#a42c2c",
    textDecoration: "none",
  },
  loginButton: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "25px",
    backgroundColor: "#a42c2c",
    color: "#fff",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    boxShadow: "0 3px 10px rgba(164,44,44,0.3)",
    marginBottom: "15px",
  },
  registerSection: {
    textAlign: "center",
    marginTop: "10px",
  },
  noAccountText: { fontSize: "13px", color: "#444" },
  registerLink: {
    color: "#a42c2c",
    fontWeight: "600",
    textDecoration: "none",
    cursor: "pointer",
  },
  dots: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#ccc",
    margin: "0 4px",
  },
  rightPanel: {
    flex: 1.5,
    borderTopLeftRadius: "20px",
    borderBottomLeftRadius: "20px",
    backgroundImage: "url('/pictures/ferrr.jpg')",
    backgroundColor: "#8a8a8a",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    overflow: "hidden",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.15)",
    textAlign: "center",
    maxWidth: "500px",
    padding: "40px 30px",
    borderRadius: "20px",
    backdropFilter: "blur(1px)",
  },
  welcomeText: {
    fontSize: "2.8rem",
    fontWeight: "700",
    marginBottom: "15px",
    color: "rgba(255, 255, 255, 0.85)",
    textShadow: "2px 2px 8px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.5)",
  },
  welcomeDesc: {
    fontSize: "1.1rem",
    lineHeight: "1.6",
    marginBottom: "25px",
    color: "rgba(255, 255, 255, 0.8)",
    textShadow: "1px 1px 6px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)",
  },
  shopNowBtn: {
    backgroundColor: "#fff",
    color: "#a42c2c",
    border: "none",
    borderRadius: "25px",
    padding: "12px 28px",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(255,255,255,0.3)",
  },
  errorMessage: {
    backgroundColor: "#ffebee",
    color: "#c62828",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "15px",
    fontSize: "14px",
    textAlign: "center",
  },
  demoCredentials: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#f5f5f5",
    borderRadius: "5px",
    fontSize: "12px",
  },
  demoTitle: {
    fontWeight: "600",
    marginBottom: "5px",
    color: "#333",
  },
  demoText: {
    margin: "2px 0",
    color: "#666",
  },
};

export default LoginPage;
