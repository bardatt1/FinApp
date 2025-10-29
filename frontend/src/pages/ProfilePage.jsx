import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const profile = {
    firstName: user?.firstName || "John",
    lastName: user?.lastName || "Doe",
    email: user?.email || "john.doe@finapp.com",
    role: user?.role || "Verified Shopper",
    company: "FinApp Shopping",
    phone: user?.phone || "+63 912 345 6789",
    address: user?.address || "Cebu City, Philippines",
    rating: 4.9,
    reviews: 287,
    status: "Active Member",
    joined: "September 2024",
    avatar:
      "https://cdn-icons-png.flaticon.com/512/2922/2922510.png",
    banner:
      "https://images.unsplash.com/photo-1586201375761-83865001e17d?auto=format&fit=crop&w=1600&q=80",
    bio: "Welcome to FinApp Shopping! John Doe is a passionate and loyal shopper who enjoys exploring great deals, discounts, and the latest tech and lifestyle products on FinApp. He values convenience, speed, and quality in every purchase.",
    socials: {
      facebook: "john.doe",
      twitter: "@john_doe",
      linkedin: "linkedin.com/in/johndoe",
    },
  };

  return (
    <div style={styles.page}>
      {/* Banner Section */}
      <div style={styles.bannerContainer}>
        <img src={profile.banner} alt="Banner" style={styles.banner} />
      </div>

      {/* Profile Header */}
      <div style={styles.profileHeader}>
        <img src={profile.avatar} alt="Avatar" style={styles.avatar} />
        <div style={styles.profileInfo}>
          <h2 style={styles.name}>
            {profile.firstName} {profile.lastName}
          </h2>
          <p style={styles.role}>
            {profile.role} at {profile.company}
          </p>
          <p style={styles.location}>📍 {profile.address}</p>
          <div style={styles.socials}>
            <span>🌐 {profile.socials.linkedin}</span>
            <span>🐦 {profile.socials.twitter}</span>
            <span>📘 {profile.socials.facebook}</span>
          </div>
        </div>
        <div style={styles.actionButtons}>
          <button
            onClick={() => navigate("/shop")}
            style={{ ...styles.button, backgroundColor: "#a42c2c", color: "#fff" }}
          >
            Go to Shop
          </button>
          <button
            onClick={handleLogout}
            style={{
              ...styles.button,
              backgroundColor: "#fff",
              border: "2px solid #a42c2c",
              color: "#a42c2c",
            }}
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div style={styles.infoSection}>
        <div style={styles.leftColumn}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>📞 Contact Information</h3>
            <p>Email: {profile.email}</p>
            <p>Phone: {profile.phone}</p>
            <p>Status: <b>{profile.status}</b></p>
            <p>Member since: {profile.joined}</p>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>⭐ Ratings & Reviews</h3>
            <h2 style={{ color: "#f4b400", marginBottom: "5px" }}>
              {profile.rating} / 5
            </h2>
            <p>Based on {profile.reviews} reviews</p>
            <p style={{ marginTop: "10px", fontStyle: "italic" }}>
              “John is a trusted customer who always leaves helpful feedback and
              insightful product reviews.”
            </p>
          </div>
        </div>

        <div style={styles.rightColumn}>
          <div style={styles.cardLarge}>
            <h3 style={styles.cardTitle}>🛍️ About Me</h3>
            <p>{profile.bio}</p>
            <p style={{ marginTop: "10px" }}>
              John is part of FinApp’s premium shopper community, frequently
              exploring exclusive items, gadgets, and lifestyle products. He
              enjoys taking advantage of seasonal sales and promoting trusted
              brands through his reviews.
            </p>
          </div>

          <div style={styles.cardLarge}>
            <h3 style={styles.cardTitle}>🧾 Recent Activity</h3>
            <ul style={styles.list}>
              <li>🛒 Purchased “Apple AirPods Pro” — Oct 26, 2025</li>
              <li>💬 Left a 5-star review on “Nike Running Shoes”</li>
              <li>❤️ Added “Samsung Galaxy Watch 6” to wishlist</li>
              <li>📦 Order #FA12345 delivered successfully</li>
              <li>🏆 Earned “Top Buyer of the Month” badge</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div style={styles.footer}>
        <p>
          © 2025 FinApp Shopping — Profile of <b>{profile.firstName} {profile.lastName}</b>
        </p>
      </div>
    </div>
  );
};

// INLINE STYLES
const styles = {
  page: {
    fontFamily: "Poppins, sans-serif",
    backgroundColor: "#f5f6fa",
    minHeight: "100vh",
    color: "#333",
  },
  bannerContainer: {
    width: "100%",
    height: "240px",
    overflow: "hidden",
  },
  banner: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "brightness(0.9)",
  },
  profileHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    padding: "20px 40px",
    margin: "0 auto",
    marginTop: "-70px",
    width: "90%",
    maxWidth: "1100px",
  },
  avatar: {
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    border: "5px solid white",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  profileInfo: {
    flex: 1,
    marginLeft: "30px",
  },
  name: {
    fontSize: "1.8rem",
    fontWeight: "700",
    marginBottom: "5px",
  },
  role: {
    color: "#a42c2c",
    fontWeight: "600",
    marginBottom: "5px",
  },
  location: {
    color: "#777",
    fontSize: "0.9rem",
    marginBottom: "10px",
  },
  socials: {
    display: "flex",
    gap: "15px",
    fontSize: "0.9rem",
    color: "#555",
  },
  actionButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "25px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "15px",
    transition: "0.3s",
  },
  infoSection: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    margin: "30px auto",
    width: "90%",
    maxWidth: "1100px",
  },
  leftColumn: {
    flex: "1 1 300px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  rightColumn: {
    flex: "2 1 600px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    padding: "20px",
  },
  cardLarge: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    padding: "25px",
  },
  cardTitle: {
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#a42c2c",
    marginBottom: "10px",
  },
  list: {
    listStyleType: "none",
    paddingLeft: "0",
    lineHeight: "1.8",
  },
  footer: {
    textAlign: "center",
    padding: "20px 0",
    color: "#777",
    fontSize: "0.85rem",
  },
};

export default ProfilePage;
