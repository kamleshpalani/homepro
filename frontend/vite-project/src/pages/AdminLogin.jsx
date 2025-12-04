// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";

const TOKEN_KEY = "HOMECAREPRO_ADMIN_TOKEN"; // same as in Bookings.jsx

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        email: email.trim().toLowerCase(),
        password: password.trim(),
      };

      console.log("➡ Sending login payload:", payload);

      const res = await fetch("http://localhost:4000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("⬅ Login response:", data);

      if (!res.ok) {
        throw new Error(data.message || "Invalid credentials");
      }
      if (!data.token) {
        throw new Error("No token received from server");
      }

      // Save token with SAME key used in Bookings.jsx
      localStorage.setItem(TOKEN_KEY, data.token);
      console.log("✅ Token saved, navigating to /admin/bookings...");

      navigate("/admin/bookings", { replace: true });

      // Fallback in case navigate is ignored
      setTimeout(() => {
        if (window.location.pathname !== "/admin/bookings") {
          window.location.href = "/admin/bookings";
        }
      }, 200);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto my-20 p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

        {error && (
          <p className="text-red-600 text-center mb-4 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              required
              className="w-full p-2 border rounded-md mt-1"
              placeholder="admin@homecarepro.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              required
              className="w-full p-2 border rounded-md mt-1"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </MainLayout>
  );
}
