import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get saved user data from localStorage
    const savedUser = JSON.parse(localStorage.getItem("finappUser"));

    if (!savedUser) {
      alert("No registered account found. Please sign up first.");
      return;
    }

    if (username === savedUser.username && password === savedUser.password) {
      alert(`Welcome back, ${username}!`);
      navigate("/shop"); // redirect after login
    } else {
      alert("Invalid username or password.");
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
          <div style={styles.inputContainer}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            <a href="#" style={styles.forgotPassword}>
              Forgot password?
            </a>
          </div>

          <button type="submit" style={styles.loginButton}>
            LOGIN
          </button>

          <div style={styles.registerSection}>
            <p style={styles.noAccountText}>
              Don’t have an account?
              <span
                style={styles.registerLink}
                onClick={() => navigate("/register")}
              >
                {" "}
                Sign up
              </span>
            </p>
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
    backgroundImage:
        "url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=80')",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    position: "relative",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.55)",
    textAlign: "center",
    maxWidth: "500px",
    padding: "40px 30px",
    borderRadius: "20px",
    backdropFilter: "blur(4px)",
  },
  welcomeText: {
    fontSize: "2.8rem",
    fontWeight: "700",
    marginBottom: "15px",
    color: "#fff",
  },
  welcomeDesc: {
    fontSize: "1.1rem",
    lineHeight: "1.6",
    marginBottom: "25px",
    color: "#f5f5f5",
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
};

export default LoginPage;
