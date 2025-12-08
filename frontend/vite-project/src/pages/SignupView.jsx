import { Link } from "react-router-dom";
import "./CustomerAuth.css";

export default function SignupView({
  form,
  loading,
  error,
  success,
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
            Join <span className="auth-gradient">HomeCarePro</span>
          </h1>
          <p className="auth-tagline">
            Create your account and enjoy hassle-free home cleaning services
          </p>

          {/* Benefits */}
          <div className="auth-features">
            <div className="auth-feature-item">
              <span className="auth-feature-icon">📅</span>
              <div className="auth-feature-text">
                <h3>Easy Booking</h3>
                <p>Schedule cleanings in just a few clicks</p>
              </div>
            </div>
            <div className="auth-feature-item">
              <span className="auth-feature-icon">📍</span>
              <div className="auth-feature-text">
                <h3>Save Addresses</h3>
                <p>Store multiple addresses for quick booking</p>
              </div>
            </div>
            <div className="auth-feature-item">
              <span className="auth-feature-icon">📋</span>
              <div className="auth-feature-text">
                <h3>Track History</h3>
                <p>View all your past and upcoming bookings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-badge">✨ Get Started</div>
            <h2 className="auth-title">Create Account</h2>
            <p className="auth-subtitle">
              Fill in your details to create your account
            </p>
          </div>

          {error && (
            <div className="auth-error">
              <span className="auth-error-icon">⚠️</span>
              {error}
            </div>
          )}

          {success && (
            <div className="auth-success">
              <span className="auth-success-icon">✅</span>
              Account created successfully! Redirecting to dashboard...
            </div>
          )}

          <form onSubmit={onSubmit} className="auth-form">
            <div className="auth-form-row">
              <div className="auth-form-field">
                <label className="auth-label">
                  <span className="auth-label-icon">👤</span>
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  className="auth-input"
                  placeholder="John"
                  value={form.firstName}
                  onChange={onChange}
                />
              </div>

              <div className="auth-form-field">
                <label className="auth-label">
                  <span className="auth-label-icon">👤</span>
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  className="auth-input"
                  placeholder="Doe"
                  value={form.lastName}
                  onChange={onChange}
                />
              </div>
            </div>

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
              />
            </div>

            <div className="auth-form-field">
              <label className="auth-label">
                <span className="auth-label-icon">📞</span>
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                required
                className="auth-input"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={onChange}
              />
            </div>

            <div className="auth-form-row">
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
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={onChange}
                />
              </div>

              <div className="auth-form-field">
                <label className="auth-label">
                  <span className="auth-label-icon">🔑</span>
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  className="auth-input"
                  placeholder="Confirm password"
                  value={form.confirmPassword}
                  onChange={onChange}
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="auth-button">
              {loading ? (
                <>
                  <span className="auth-btn-spinner"></span>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <span className="auth-btn-arrow">→</span>
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p className="auth-footer-text">
              Already have an account?{" "}
              <Link to="/account/login" className="auth-link">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
