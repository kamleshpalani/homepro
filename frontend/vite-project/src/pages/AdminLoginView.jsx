import "./AdminLogin.css";

export default function AdminLoginView({
  email,
  password,
  error,
  loading,
  onChangeEmail,
  onChangePassword,
  onSubmit,
}) {
  return (
    <div className="admin-login-page">
      {/* Left Side - Branding */}
      <div className="admin-login-left">
        <div className="admin-login-brand">
          <div className="admin-login-logo">
            <span className="admin-login-logo-icon">🏠</span>
            <span className="admin-login-logo-text">
              Home<span className="admin-login-logo-highlight">Care</span>Pro
            </span>
          </div>
          <h1 className="admin-login-welcome">
            Welcome to <span className="admin-gradient">Admin Portal</span>
          </h1>
          <p className="admin-login-tagline">
            Manage your home care services with powerful tools and insights
          </p>
          
          {/* Feature List */}
          <div className="admin-login-features">
            <div className="admin-feature-item">
              <span className="admin-feature-icon">📊</span>
              <div className="admin-feature-text">
                <h3>Analytics Dashboard</h3>
                <p>Real-time insights and reports</p>
              </div>
            </div>
            <div className="admin-feature-item">
              <span className="admin-feature-icon">👥</span>
              <div className="admin-feature-text">
                <h3>User Management</h3>
                <p>Manage customers and cleaners</p>
              </div>
            </div>
            <div className="admin-feature-item">
              <span className="admin-feature-icon">📅</span>
              <div className="admin-feature-text">
                <h3>Booking Control</h3>
                <p>Oversee all appointments</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="admin-login-right">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="admin-login-badge">🔐 Secure Access</div>
            <h2 className="admin-login-title">Admin Login</h2>
            <p className="admin-login-subtitle">
              Enter your credentials to access the admin dashboard
            </p>
          </div>

          {error && (
            <div className="admin-login-error">
              <span className="admin-error-icon">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="admin-login-form">
            <div className="admin-form-field">
              <label className="admin-login-label">
                <span className="admin-label-icon">📧</span>
                Email Address
              </label>
              <input
                type="email"
                required
                className="admin-login-input"
                placeholder="admin@homecarepro.com"
                value={email}
                onChange={onChangeEmail}
                autoComplete="username"
              />
            </div>

            <div className="admin-form-field">
              <label className="admin-login-label">
                <span className="admin-label-icon">🔑</span>
                Password
              </label>
              <input
                type="password"
                required
                className="admin-login-input"
                placeholder="Enter your password"
                value={password}
                onChange={onChangePassword}
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="admin-login-button"
            >
              {loading ? (
                <>
                  <span className="admin-btn-spinner"></span>
                  Logging in...
                </>
              ) : (
                <>
                  Login to Dashboard
                  <span className="admin-btn-arrow">→</span>
                </>
              )}
            </button>
          </form>

          <div className="admin-login-footer">
            <p className="admin-login-note">
              🔒 This is a secure admin area. Unauthorized access is prohibited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
