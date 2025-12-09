import { Link } from "react-router-dom";
import "./CustomerAuth.css";

export default function CustomerLoginView({
  form,
  loading,
  error,
  onChange,
  onSubmit,
}) {
  return (
    <div className="auth-page">
      {/* Left Side - Branding */}
      <div className="auth-left">
        <div className="auth-brand">
          <div className="auth-logo">
            <span className="auth-logo-icon">🏠</span>
            <span className="auth-logo-text">
              Home<span className="auth-logo-highlight">Care</span>Pro
            </span>
          </div>
          <h1 className="auth-welcome">
            Welcome <span className="auth-gradient">Back!</span>
          </h1>
          <p className="auth-tagline">
            Login to your account to manage bookings and access exclusive
            features
          </p>

          {/* Benefits */}
          <div className="auth-features">
            <div className="auth-feature-item">
              <span className="auth-feature-icon">📅</span>
              <div className="auth-feature-text">
                <h3>Manage Bookings</h3>
                <p>View and track all your cleaning appointments</p>
              </div>
            </div>
            <div className="auth-feature-item">
              <span className="auth-feature-icon">🔄</span>
              <div className="auth-feature-text">
                <h3>Quick Rebooking</h3>
                <p>Easily rebook your favorite services</p>
              </div>
            </div>
            <div className="auth-feature-item">
              <span className="auth-feature-icon">🎁</span>
              <div className="auth-feature-text">
                <h3>Exclusive Offers</h3>
                <p>Get special discounts for members</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-badge">🔐 Secure Login</div>
            <h2 className="auth-title">Login</h2>
            <p className="auth-subtitle">
              Enter your credentials to access your account
            </p>
          </div>

          {error && (
            <div className="auth-error">
              <span className="auth-error-icon">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="auth-form">
            <div className="auth-form-field">
              <label className="auth-label">
                <span className="auth-label-icon">📧</span>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                className="auth-input"
                placeholder="john@example.com"
                value={form.email}
                onChange={onChange}
                autoComplete="username"
              />
            </div>

            <div className="auth-form-field">
              <label className="auth-label">
                <span className="auth-label-icon">🔑</span>
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                className="auth-input"
                placeholder="Enter your password"
                value={form.password}
                onChange={onChange}
                autoComplete="current-password"
              />
            </div>

            <button type="submit" disabled={loading} className="auth-button">
              {loading ? (
                <>
                  <span className="auth-btn-spinner"></span>
                  Logging in...
                </>
              ) : (
                <>
                  Login to Dashboard
                  <span className="auth-btn-arrow">→</span>
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p className="auth-footer-text">
              Don't have an account?{" "}
              <Link to="/account/signup" className="auth-link">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
