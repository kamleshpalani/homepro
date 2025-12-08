import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import CustomerLoginView from "./CustomerLoginView";

const API_URL = "http://localhost:4000";

export default function CustomerLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token and user info
      localStorage.setItem("customerToken", data.token);
      localStorage.setItem("customerUser", JSON.stringify(data.user));

      // Redirect to dashboard
      window.location.href = "/account/dashboard";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <CustomerLoginView
        form={form}
        loading={loading}
        error={error}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </MainLayout>
  );
}
