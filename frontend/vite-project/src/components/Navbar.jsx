// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const TOKEN_KEY = "HOMECAREPRO_ADMIN_TOKEN";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const token = localStorage.getItem(TOKEN_KEY);
  const isAdmin = !!token;

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setIsMenuOpen(false);
    navigate("/admin/login");
  };

  const isActive = (path) => location.pathname === path;

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const baseLinkStyle = {
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 600,
    color: "#1e40af",
    padding: "8px 14px",
    borderRadius: "999px",
    transition: "all 0.2s ease",
  };

  return (
    <header className="hcp-nav-wrapper">
      <nav className="hcp-nav">
        {/* Logo */}
        <Link to="/" className="hcp-logo">
          <span className="hcp-logo-main">HomeCare</span>
          <span className="hcp-logo-sub">Pro</span>
        </Link>

        {/* Links */}
        <div className={`hcp-nav-links ${isMenuOpen ? "open" : ""}`}>
          {/* Public navigation */}
          <Link
            to="/services"
            style={{
              ...baseLinkStyle,
              backgroundColor: isActive("/services")
                ? "rgba(37, 99, 235, 0.12)"
                : "transparent",
            }}
          >
            Services
          </Link>
          <Link
            to="/about"
            style={{
              ...baseLinkStyle,
              backgroundColor: isActive("/about")
                ? "rgba(37, 99, 235, 0.12)"
                : "transparent",
            }}
          >
            About
          </Link>
          <Link
            to="/contact"
            style={{
              ...baseLinkStyle,
              backgroundColor: isActive("/contact")
                ? "rgba(37, 99, 235, 0.12)"
                : "transparent",
            }}
          >
            Contact
          </Link>

          {/* Public Cleaner Apply – only when NOT admin */}
          {!isAdmin && (
            <Link
              to="/cleaners/apply"
              style={{
                ...baseLinkStyle,
                padding: "7px 16px",
                background:
                  "linear-gradient(135deg, rgba(45,212,191,0.9), rgba(56,189,248,0.95))",
                color: "#0f172a",
                boxShadow: "0 8px 20px rgba(34,211,238,0.35)",
              }}
            >
              Apply as Cleaner
            </Link>
          )}

          {/* Book Now – always visible */}
          <Link
            to="/book"
            style={{
              ...baseLinkStyle,
              padding: "7px 18px",
              background:
                "linear-gradient(135deg, rgba(74,222,128,0.95), rgba(22,163,74,0.98))",
              color: "#022c22",
              boxShadow: "0 10px 24px rgba(34,197,94,0.45)",
            }}
          >
            Book Now
          </Link>

          {/* Admin links & Logout */}
          {isAdmin && (
            <>
              <Link
                to="/admin/bookings"
                style={{
                  ...baseLinkStyle,
                  backgroundColor: isActive("/admin/bookings")
                    ? "rgba(248,250,252,0.18)"
                    : "transparent",
                  color: "#fee2e2",
                }}
              >
                Admin Bookings
              </Link>
              <Link
                to="/admin/cleaners"
                style={{
                  ...baseLinkStyle,
                  backgroundColor: isActive("/admin/cleaners")
                    ? "rgba(248,250,252,0.18)"
                    : "transparent",
                  color: "#fee2e2",
                }}
              >
                Admin Cleaners
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="hcp-nav-logout-btn"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Hamburger button (mobile) */}
        <button
          type="button"
          className={`hcp-nav-menu-toggle ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
