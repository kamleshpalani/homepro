// src/pages/CleanerApplySimple.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";

const API_BASE = "http://localhost:4000";

const COIMBATORE_AREAS = [
  "Peelamedu",
  "Saibaba Colony",
  "Gandhipuram",
  "R.S. Puram",
  "Singanallur",
  "Ganapathy",
  "Saravanampatti",
  "Vadavalli",
  "Kuniyamuthur",
  "Podanur",
  "Ukkadam",
  "Town Hall",
  "Kovaipudur",
  "Thudiyalur",
  "Others / Not listed",
];

const SERVICES = [
  "Deep Cleaning",
  "Kitchen Cleaning",
  "Bathroom Cleaning",
  "Window Cleaning",
  "Floor Polishing",
  "Carpet Cleaning",
  "Post-Construction Cleaning",
  "Move-In/Move-Out Cleaning",
];

export default function CleanerApplySimple() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    area: "",
    areaOther: "",
    areasServed: "",
    city: "Coimbatore",
    address1: "",
    state: "Tamil Nadu",
    pincode: "",
    experienceYears: "0-1",
    expectedSalaryPerJob: "",
    preferredContactMethod: "whatsapp",
    servicesOffered: "",
    languagesKnown: "",
    idProofType: "",
    idProofNumber: "",
    notes: "",
    // Availability
    availabilityDays: "",
    maxJobsPerDay: 3,
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/api/cleaners/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Application failed");
      }

      setSuccess(true);
      alert(data.message);

      // Redirect after success
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      console.error("Application error:", err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <MainLayout>
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h1 style={{ color: "#28a745" }}>✅ Application Submitted!</h1>
          <p>
            Thank you for applying. We'll review your application within 24
            hours.
          </p>
          <p>Redirecting to home...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
        <h1 style={{ marginBottom: "10px" }}>🧹 Apply as a Cleaner</h1>
        <p style={{ color: "#666", marginBottom: "30px" }}>
          Join our team of professional cleaners in Coimbatore
        </p>

        {error && (
          <div
            style={{
              padding: "10px",
              marginBottom: "20px",
              backgroundColor: "#fee",
              border: "1px solid #fcc",
              borderRadius: "4px",
              color: "#c00",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <fieldset style={fieldsetStyle}>
            <legend style={legendStyle}>Personal Information</legend>

            <div style={rowStyle}>
              <div style={colStyle}>
                <label style={labelStyle}>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>
              <div style={colStyle}>
                <label style={labelStyle}>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={rowStyle}>
              <div style={colStyle}>
                <label style={labelStyle}>Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  placeholder="10-digit number"
                  style={inputStyle}
                />
              </div>
              <div style={colStyle}>
                <label style={labelStyle}>Email (Optional)</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
            </div>
          </fieldset>

          {/* Location */}
          <fieldset style={fieldsetStyle}>
            <legend style={legendStyle}>Location</legend>

            <div style={rowStyle}>
              <div style={colStyle}>
                <label style={labelStyle}>Primary Area *</label>
                <select
                  name="area"
                  value={form.area}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                >
                  <option value="">Select Area</option>
                  {COIMBATORE_AREAS.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>
              {form.area === "Others / Not listed" && (
                <div style={colStyle}>
                  <label style={labelStyle}>Specify Area</label>
                  <input
                    type="text"
                    name="areaOther"
                    value={form.areaOther}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
              )}
            </div>

            <label style={labelStyle}>
              Other Areas You Serve (comma-separated)
            </label>
            <input
              type="text"
              name="areasServed"
              value={form.areasServed}
              onChange={handleChange}
              placeholder="e.g., Peelamedu, Gandhipuram, Saibaba Colony"
              style={inputStyle}
            />

            <div style={rowStyle}>
              <div style={colStyle}>
                <label style={labelStyle}>Address</label>
                <input
                  type="text"
                  name="address1"
                  value={form.address1}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
              <div style={colStyle}>
                <label style={labelStyle}>Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  pattern="[0-9]{6}"
                  style={inputStyle}
                />
              </div>
            </div>
          </fieldset>

          {/* Professional Details */}
          <fieldset style={fieldsetStyle}>
            <legend style={legendStyle}>Professional Details</legend>

            <div style={rowStyle}>
              <div style={colStyle}>
                <label style={labelStyle}>Experience</label>
                <select
                  name="experienceYears"
                  value={form.experienceYears}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5+">5+ years</option>
                </select>
              </div>
              <div style={colStyle}>
                <label style={labelStyle}>Expected Salary Per Job</label>
                <input
                  type="text"
                  name="expectedSalaryPerJob"
                  value={form.expectedSalaryPerJob}
                  onChange={handleChange}
                  placeholder="e.g., ₹500-800"
                  style={inputStyle}
                />
              </div>
            </div>

            <label style={labelStyle}>
              Services You Offer (comma-separated)
            </label>
            <input
              type="text"
              name="servicesOffered"
              value={form.servicesOffered}
              onChange={handleChange}
              placeholder="e.g., Deep Cleaning, Kitchen Cleaning, Window Cleaning"
              style={inputStyle}
            />
            <small style={{ color: "#666", fontSize: "12px" }}>
              Suggestions: {SERVICES.join(", ")}
            </small>

            <label style={labelStyle}>Languages Known</label>
            <input
              type="text"
              name="languagesKnown"
              value={form.languagesKnown}
              onChange={handleChange}
              placeholder="e.g., Tamil, English, Hindi"
              style={inputStyle}
            />

            <label style={labelStyle}>Preferred Contact Method</label>
            <select
              name="preferredContactMethod"
              value={form.preferredContactMethod}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="whatsapp">WhatsApp</option>
              <option value="phone">Phone Call</option>
              <option value="email">Email</option>
            </select>
          </fieldset>

          {/* Availability */}
          <fieldset style={fieldsetStyle}>
            <legend style={legendStyle}>Availability</legend>

            <label style={labelStyle}>Available Days (comma-separated)</label>
            <input
              type="text"
              name="availabilityDays"
              value={form.availabilityDays}
              onChange={handleChange}
              placeholder="e.g., Mon, Tue, Wed, Thu, Fri"
              style={inputStyle}
            />

            <label style={labelStyle}>Max Jobs Per Day</label>
            <input
              type="number"
              name="maxJobsPerDay"
              value={form.maxJobsPerDay}
              onChange={handleChange}
              min="1"
              max="10"
              style={inputStyle}
            />
          </fieldset>

          {/* ID Proof */}
          <fieldset style={fieldsetStyle}>
            <legend style={legendStyle}>Identity Verification</legend>

            <div style={rowStyle}>
              <div style={colStyle}>
                <label style={labelStyle}>ID Proof Type</label>
                <select
                  name="idProofType"
                  value={form.idProofType}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  <option value="">Select</option>
                  <option value="Aadhar">Aadhar Card</option>
                  <option value="PAN">PAN Card</option>
                  <option value="Driving License">Driving License</option>
                  <option value="Voter ID">Voter ID</option>
                </select>
              </div>
              <div style={colStyle}>
                <label style={labelStyle}>ID Proof Number</label>
                <input
                  type="text"
                  name="idProofNumber"
                  value={form.idProofNumber}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
            </div>
          </fieldset>

          {/* Additional Notes */}
          <label style={labelStyle}>Additional Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows="3"
            placeholder="Any additional information..."
            style={{ ...inputStyle, resize: "vertical" }}
          />

          <button
            type="submit"
            disabled={submitting}
            style={{
              ...buttonStyle,
              opacity: submitting ? 0.6 : 1,
              cursor: submitting ? "not-allowed" : "pointer",
            }}
          >
            {submitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </MainLayout>
  );
}

const fieldsetStyle = {
  border: "1px solid #ddd",
  borderRadius: "4px",
  padding: "15px",
  marginBottom: "20px",
};

const legendStyle = {
  fontWeight: "600",
  fontSize: "16px",
  padding: "0 10px",
};

const rowStyle = {
  display: "flex",
  gap: "15px",
  marginBottom: "15px",
};

const colStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
};

const labelStyle = {
  fontWeight: "500",
  marginBottom: "5px",
  fontSize: "14px",
};

const inputStyle = {
  padding: "10px",
  fontSize: "14px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  marginBottom: "15px",
  fontFamily: "inherit",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  fontSize: "16px",
  fontWeight: "600",
  color: "#fff",
  backgroundColor: "#007bff",
  border: "none",
  borderRadius: "4px",
  marginTop: "10px",
};
