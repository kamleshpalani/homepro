// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import AdminLoginView from "./AdminLoginView.jsx";

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
      <AdminLoginView
        email={email}
        password={password}
        error={error}
        loading={loading}
        onChangeEmail={(e) => setEmail(e.target.value)}
        onChangePassword={(e) => setPassword(e.target.value)}
        onSubmit={handleSubmit}
      />
    </MainLayout>
  );
}
