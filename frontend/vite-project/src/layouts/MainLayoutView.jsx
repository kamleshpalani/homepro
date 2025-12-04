// src/layouts/MainLayoutView.jsx
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import "./MainLayout.css";

function MainLayoutView({ children, isAdminLoggedIn, onLogout }) {
  return (
    <div className="main-layout-root">
      {/* Top Bar with Navbar and Logout */}
      <div className="main-layout-topbar">
        <Navbar />

        {/* 🔥 Logout button ONLY for admins */}
        {isAdminLoggedIn && (
          <button onClick={onLogout} className="main-layout-logout">
            Logout
          </button>
        )}
      </div>

      {/* Main Page Content */}
      <main className="main-layout-main">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default MainLayoutView;
