import { Link } from "react-router-dom";
import "./CleanerAuth.css";

export default function CleanerLoginView({
  form,
  message,
  error,
  submitting,
  onChange,
  onSubmit,
}) {
  return (
    <div className="cleaner-auth-page">
      <div className="cleaner-auth-container">
        {/* Left Side - Branding */}
        <div className="cleaner-auth-branding">
          <div className="cleaner-auth-brand-content">
            <div className="cleaner-auth-logo">
              <span className="cleaner-auth-logo-icon">🧹</span>
              <span className="cleaner-auth-logo-text">HomeCare Pro</span>
            </div>
            <h1 className="cleaner-auth-brand-title">
              Welcome Back,
              <span className="cleaner-auth-gradient"> Professional!</span>
            </h1>
            <p className="cleaner-auth-brand-desc">
              Login to access your dashboard, view new assignments, and manage
              your bookings.
            </p>

            <div className="cleaner-auth-features">
              <div className="cleaner-auth-feature">
                <span className="cleaner-auth-feature-icon">✓</span>
                <span>View available jobs</span>
              </div>
              <div className="cleaner-auth-feature">
                <span className="cleaner-auth-feature-icon">✓</span>
                <span>Track your earnings</span>
              </div>
              <div className="cleaner-auth-feature">
                <span className="cleaner-auth-feature-icon">✓</span>
                <span>Manage your schedule</span>
              </div>
              <div className="cleaner-auth-feature">
                <span className="cleaner-auth-feature-icon">✓</span>
                <span>Get customer reviews</span>
              </div>
            </div>

            <div className="cleaner-auth-testimonial">
              <div className="cleaner-auth-testimonial-avatar">RS</div>
              <div className="cleaner-auth-testimonial-content">
                <p className="cleaner-auth-testimonial-text">
                  "Best platform for professional cleaners. Regular work and
                  timely payments!"
                </p>
                <p className="cleaner-auth-testimonial-author">
                  - Rajesh S., Verified Cleaner
                </p>
              </div>
            </div>
          </div>

          {/* Decorative Shapes */}
          <div className="cleaner-auth-shape cleaner-auth-shape-1"></div>
          <div className="cleaner-auth-shape cleaner-auth-shape-2"></div>
        </div>

        {/* Right Side - Login Form */}
        <div className="cleaner-auth-form-wrapper">
          <div className="cleaner-auth-form-container">
            <div className="cleaner-auth-form-header">
              <h2 className="cleaner-auth-form-title">Cleaner Login</h2>
              <p className="cleaner-auth-form-subtitle">
                Enter your credentials to access your account
              </p>
            </div>

            {message && (
              <div className="cleaner-auth-alert cleaner-auth-alert-success">
                <span className="cleaner-auth-alert-icon">✓</span>
                {message}
              </div>
            )}

            {error && (
              <div className="cleaner-auth-alert cleaner-auth-alert-error">
                <span className="cleaner-auth-alert-icon">⚠</span>
                {error}
              </div>
            )}

            <form className="cleaner-auth-form" onSubmit={onSubmit}>
              <div className="cleaner-auth-field">
                <label className="cleaner-auth-label">
                  <span className="cleaner-auth-label-icon">📧</span>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  className="cleaner-auth-input"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="cleaner-auth-field">
                <label className="cleaner-auth-label">
                  <span className="cleaner-auth-label-icon">🔒</span>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={onChange}
                  required
                  className="cleaner-auth-input"
                  placeholder="Enter your password"
                />
              </div>

              <div className="cleaner-auth-options">
                <label className="cleaner-auth-checkbox">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <Link
                  to="/cleaner/forgot-password"
                  className="cleaner-auth-link"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="cleaner-auth-submit-btn"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <span className="cleaner-auth-spinner"></span>
                    Logging in...
                  </>
                ) : (
                  <>
                    <span>Login to Dashboard</span>
                    <span className="cleaner-auth-btn-arrow">→</span>
                  </>
                )}
              </button>

              <div className="cleaner-auth-divider">
                <span>New to our platform?</span>
              </div>

              <Link to="/cleaner/apply" className="cleaner-auth-secondary-btn">
                <span className="cleaner-auth-secondary-icon">✨</span>
                Apply as a Cleaner
              </Link>
            </form>

            <div className="cleaner-auth-footer">
              <p>
                Not a cleaner?{" "}
                <Link to="/account/login" className="cleaner-auth-link">
                  Customer Login →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
