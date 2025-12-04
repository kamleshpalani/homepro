// src/pages/CleanerApply.jsx
import { useState } from "react";
import MainLayout from "../layouts/MainLayout.jsx";

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
    <MainLayout>
      <section
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "20px",
          boxShadow: "0 12px 30px rgba(15, 23, 42, 0.12)",
          maxWidth: "720px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ fontSize: "22px", marginBottom: "4px" }}>
          Cleaner Registration
        </h1>
        <p style={{ fontSize: "14px", marginBottom: "16px", color: "#4b5563" }}>
          Apply as a freelance cleaner in Coimbatore. Our team will review your
          details and contact you.
        </p>

        {message && (
          <p
            style={{
              fontSize: "14px",
              color: "#065f46",
              background: "#ecfdf3",
              padding: "8px 10px",
              borderRadius: "8px",
              marginBottom: "10px",
            }}
          >
            {message}
          </p>
        )}

        {error && (
          <p
            style={{
              fontSize: "14px",
              color: "#b91c1c",
              background: "#fef2f2",
              padding: "8px 10px",
              borderRadius: "8px",
              marginBottom: "10px",
            }}
          >
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-medium block mb-1">
              Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
              placeholder="e.g. Ram"
            />
          </div>

          <div>
            <label className="font-medium block mb-1">
              Phone <span style={{ color: "red" }}>*</span>
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
              placeholder="e.g. 9876543210"
            />
          </div>

          <div>
            <label className="font-medium block mb-1">
              Area (Location) <span style={{ color: "red" }}>*</span>
            </label>
            <input
              name="area"
              value={form.area}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
              placeholder="e.g. Saibaba Colony"
            />
          </div>

          <div>
            <label className="font-medium block mb-1">Experience (years)</label>
            <input
              name="experienceYears"
              value={form.experienceYears}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="e.g. 2"
            />
          </div>

          <div>
            <label className="font-medium block mb-1">Services Offered</label>
            <input
              name="servicesOffered"
              value={form.servicesOffered}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="e.g. 1BHK deep cleaning, kitchen cleaning…"
            />
          </div>

          <div>
            <label className="font-medium block mb-1">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows={3}
              placeholder="Any additional info (timings, preferred areas, etc.)"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 rounded-md font-semibold text-white"
            style={{
              backgroundColor: submitting ? "#6b7280" : "#059669",
            }}
          >
            {submitting ? "Submitting…" : "Submit Application"}
          </button>
        </form>
      </section>
    </MainLayout>
  );
}
