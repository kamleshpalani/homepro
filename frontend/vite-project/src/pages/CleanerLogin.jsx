import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import CleanerLoginView from "./CleanerLoginView";

const API_URL = "http://localhost:4000";

export default function CleanerLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/api/cleaners/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // Store token and user data
        localStorage.setItem("cleanerToken", data.token);
        localStorage.setItem("cleanerUser", JSON.stringify(data.cleaner));

        setMessage("Login successful! Redirecting...");

        // Redirect to cleaner dashboard
        setTimeout(() => {
          navigate("/cleaner/dashboard");
        }, 1500);
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <CleanerLoginView
        form={form}
        message={message}
        error={error}
        submitting={submitting}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </MainLayout>
  );
}
