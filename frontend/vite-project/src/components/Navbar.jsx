// src/components/Navbar.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

const TOKEN_KEY = "HOMECAREPRO_ADMIN_TOKEN";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem(TOKEN_KEY);
  const isAdmin = !!token;

  // Check for customer login
  const [isCustomer, setIsCustomer] = useState(false);
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    const customerToken = localStorage.getItem("customerToken");
    const customerUser = localStorage.getItem("customerUser");
    if (customerToken && customerUser) {
      setIsCustomer(true);
      try {
        const user = JSON.parse(customerUser);
        setCustomerName(user.firstName);
      } catch {
        setCustomerName("User");
      }
    } else {
      setIsCustomer(false);
      setCustomerName("");
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    navigate("/admin/login");
  };

  const handleCustomerLogout = () => {
    localStorage.removeItem("customerToken");
    localStorage.removeItem("customerUser");
    setIsCustomer(false);
    setCustomerName("");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header-new">
      <nav className="nav-container">
        <Link to="/" className="nav-logo">
          <div className="nav-logo-icon">🏠</div>
          <div className="nav-logo-text">
            <span className="nav-logo-name">HomeCare</span>
            <span className="nav-logo-pro">Pro</span>
          </div>
        </Link>

        <div className="nav-menu">
          <Link
            to="/services"
            className={`nav-link ${
              isActive("/services") ? "nav-link-active" : ""
            }`}
          >
            Services
          </Link>
          <Link
            to="/about"
            className={`nav-link ${
              isActive("/about") ? "nav-link-active" : ""
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`nav-link ${
              isActive("/contact") ? "nav-link-active" : ""
            }`}
          >
            Contact
          </Link>

          {!isAdmin && (
            <Link to="/cleaners/apply" className="nav-link">
              Join as Cleaner
            </Link>
          )}

          {isAdmin && (
            <>
              <Link
                to="/admin/bookings"
                className={`nav-link ${
                  isActive("/admin/bookings") ? "nav-link-active" : ""
                }`}
              >
                Bookings
              </Link>
              <Link
                to="/admin/cleaners"
                className={`nav-link ${
                  isActive("/admin/cleaners") ? "nav-link-active" : ""
                }`}
              >
                Cleaners
              </Link>
            </>
          )}
        </div>

        <div className="nav-actions">
          {isAdmin ? (
            <button
              type="button"
              onClick={handleLogout}
              className="nav-btn-logout"
            >
              Logout
            </button>
          ) : isCustomer ? (
            <>
              <Link to="/account/dashboard" className="nav-user-btn">
                <span className="nav-user-avatar">{customerName?.charAt(0)}</span>
                <span className="nav-user-name">{customerName}</span>
              </Link>
              <Link to="/book" className="nav-btn-primary">
                <span>Book Now</span>
                <span className="nav-btn-arrow">→</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/account/login" className="nav-btn-login">
                Login
              </Link>
              <Link to="/book" className="nav-btn-primary">
                <span>Book Now</span>
                <span className="nav-btn-arrow">→</span>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
