// src/components/Navbar.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const TOKEN_KEY = "HOMECAREPRO_ADMIN_TOKEN";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem(TOKEN_KEY);
  const isAdmin = !!token;

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    navigate("/admin/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="hcp-nav-wrapper">
      <nav className="hcp-nav">
        {/* Logo */}
        <Link to="/" className="hcp-logo">
          <span className="hcp-logo-main">HomeCare</span>
          <span className="hcp-logo-sub">Pro</span>
        </Link>

        {/* Links */}
        <div className="hcp-nav-links">
          {/* Public navigation */}
          <Link
            to="/services"
            className={isActive("/services") ? "active" : ""}
          >
            Services
          </Link>
          <Link to="/about" className={isActive("/about") ? "active" : ""}>
            About
          </Link>
          <Link to="/contact" className={isActive("/contact") ? "active" : ""}>
            Contact
          </Link>

          {/* Public Cleaner Apply – only when NOT admin */}
          {!isAdmin && (
            <Link to="/cleaners/apply" className="active">
              Apply as Cleaner
            </Link>
          )}

          {/* Book Now – always visible */}
          <Link to="/book" className={isActive("/book") ? "active" : ""}>
            Book Now
          </Link>

          {/* Admin links & Logout */}
          {isAdmin && (
            <>
              <Link
                to="/admin/bookings"
                className={isActive("/admin/bookings") ? "active" : ""}
              >
                Admin Bookings
              </Link>
              <Link
                to="/admin/cleaners"
                className={isActive("/admin/cleaners") ? "active" : ""}
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
      </nav>
    </header>
  );
}

export default Navbar;
