// src/pages/CleanerApply.jsx
import { useState } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import CleanerApplyView from "./CleanerApplyView.jsx";

export default function CleanerApply() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    preferredContactMethod: "whatsapp",
    preferredContactTime: "",
    area: "",
    areaOther: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    experienceYears: "",
    typeOfWork: "",
    languagesKnown: "",
    expectedSalaryPerJob: "",
    servicesOffered: "",
    serviceOther: "",
    idProofType: "",
    idProofNumber: "",
    idProofFile: null,
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm((prev) => ({ ...prev, [name]: files[0] || null }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    setError("");

    try {
      console.log("➡ Sending cleaner application:", form);

      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      const res = await fetch("http://localhost:4000/api/cleaners/apply", {
        method: "POST",
        body: formData,
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
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        preferredContactMethod: "whatsapp",
        preferredContactTime: "",
        area: "",
        areaOther: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        experienceYears: "",
        typeOfWork: "",
        languagesKnown: "",
        expectedSalaryPerJob: "",
        servicesOffered: "",
        serviceOther: "",
        idProofType: "",
        idProofNumber: "",
        idProofFile: null,
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
      <CleanerApplyView
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
