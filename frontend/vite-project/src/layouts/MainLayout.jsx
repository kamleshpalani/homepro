// src/layouts/MainLayout.jsx

import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const TOKEN_KEY = "HOMECAREPRO_ADMIN_TOKEN";

function MainLayout({ children }) {
  const navigate = useNavigate();

  // Check if admin is logged in
  const isAdminLoggedIn = !!localStorage.getItem(TOKEN_KEY);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    navigate("/admin/login", { replace: true });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        padding: "24px 16px",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        background: "linear-gradient(135deg, #f5f5f5, #e0f4ff)",
      }}
    >
      {/* Top Bar with Navbar and Logout */}
      <div
        style={{ maxWidth: "960px", margin: "0 auto", position: "relative" }}
      >
        <Navbar />

        {/* 🔥 Logout button ONLY for admins */}
        {isAdminLoggedIn && (
          <button
            onClick={handleLogout}
            style={{
              position: "absolute",
              right: "0",
              top: "10px",
              backgroundColor: "#dc2626",
              color: "white",
              padding: "6px 14px",
              borderRadius: "6px",
              fontSize: "14px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        )}
      </div>

      {/* Main Page Content */}
      <main style={{ maxWidth: "960px", margin: "0 auto" }}>{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default MainLayout;
