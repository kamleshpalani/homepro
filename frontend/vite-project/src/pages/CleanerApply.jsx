// src/pages/CleanerApply.jsx
import { useState } from "react";
import CleanerApplyView from "./CleanerApplyView.jsx";

export default function CleanerApply() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
    experienceYears: "",
    servicesOffered: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    setError("");

    try {
      console.log("➡ Sending cleaner application:", form);

      const res = await fetch("http://localhost:4000/api/cleaners/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit application");
      }

      setMessage(
        data.message ||
          "Thank you! Your application was submitted successfully."
      );

      setForm({
        name: "",
        phone: "",
        area: "",
        experienceYears: "",
        servicesOffered: "",
        notes: "",
      });
    } catch (err) {
      console.error("Cleaner apply error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <CleanerApplyView
      form={form}
      message={message}
      error={error}
      submitting={submitting}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
