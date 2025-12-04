import MainLayout from "../layouts/MainLayout.jsx";
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
    <MainLayout>
      <div className="admin-login-card">
        <h2 className="admin-login-title">Admin Login</h2>

        {error && <p className="admin-login-error">{error}</p>}

        <form onSubmit={onSubmit} className="admin-login-form">
          <div>
            <label className="admin-login-label">Email</label>
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

          <div>
            <label className="admin-login-label">Password</label>
            <input
              type="password"
              required
              className="admin-login-input"
              placeholder="Enter admin password"
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </MainLayout>
  );
}
