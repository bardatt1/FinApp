import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (!firstName.trim()) {
      setError("First name is required");
      return;
    }
    if (!lastName.trim()) {
      setError("Last name is required");
      return;
    }
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!password.trim()) {
      setError("Password is required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }

    setLoading(true);

    try {
      const result = await register({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password
      });
      
      if (result.success) {
        // Redirect to shop page after successful registration
        navigate("/shop");
      } else {
        setError(result.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* LEFT PANEL */}
      <div style={styles.leftPanel}>
        <div style={styles.logo}>FINAPP</div>

        <div style={styles.avatar}>
          <i className="fas fa-user-plus" style={styles.icon}></i>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {error && <div style={styles.errorMessage}>{error}</div>}
          
          {/* First Name */}
          <div style={styles.inputContainer}>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          {/* Last Name */}
          <div style={styles.inputContainer}>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          {/* Email */}
          <div style={styles.inputContainer}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          {/* Password */}
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

          {/* Confirm Password */}
          <div style={styles.inputContainer}>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          {/* Register Button */}
          <button 
            type="submit" 
            style={{
              ...styles.registerButton,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }} 
            disabled={loading}
          >
            {loading ? "REGISTERING..." : "REGISTER"}
          </button>

          {/* Login Redirect */}
          <div style={styles.loginSection}>
            <p style={styles.haveAccountText}>
              Already have an account?
              <span
                style={styles.loginLink}
                onClick={() => navigate("/login")}
              >
                {" "}
                Log in
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

      {/* RIGHT PANEL */}
      <div style={styles.rightPanel}>
        <div style={styles.overlay}>
          <h1 style={styles.welcomeText}>Join the FINAPP Merch Store</h1>
          <p style={styles.welcomeDesc}>
           Sign up today and unlock access to the latestmerch apparel designed for true fans of smart fashion.
          </p>
          <button style={styles.shopNowBtn}>Explore Merch</button>
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
    transition: "0.3s",
  },
  registerButton: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "25px",
    backgroundColor: "#a42c2c",
    color: "#fff",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    marginTop: "10px",
    boxShadow: "0 4px 10px rgba(164,44,44,0.3)",
  },
  loginSection: {
    textAlign: "center",
    marginTop: "10px",
  },
  haveAccountText: {
    fontSize: "13px",
    color: "#444",
  },
  loginLink: {
    color: "#a42c2c",
    fontWeight: "600",
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
    fontSize: "2.6rem",
    fontWeight: "700",
    marginBottom: "15px",
    color: "rgba(255, 255, 255, 0.85)",
  },
  welcomeDesc: {
    fontSize: "1.1rem",
    lineHeight: "1.6",
    marginBottom: "25px",
    color: "rgba(245, 245, 245, 0.8)",
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
};

export default RegisterPage;
