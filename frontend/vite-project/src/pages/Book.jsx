import { useState } from "react";
import MainLayout from "../layouts/MainLayout.jsx";

const SERVICES = [
  "1BHK Home Deep Cleaning",
  "2BHK Home Deep Cleaning",
  "Villa / Individual House Cleaning",
  "Kitchen & Chimney Deep Clean",
  "Bathroom Deep Cleaning",
  "Office / Shop Cleaning",
];

const AREAS = [
  "RS Puram",
  "Saibaba Colony",
  "Gandhipuram",
  "Peelamedu",
  "Singanallur",
  "Saravanampatti",
  "Vadavalli",
  "Town Hall",
];

function Book() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
    service: "",
    date: "",
    timeSlot: "",
    notes: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // 👉 NEW VERSION: sends data to backend
  async function handleSubmit(e) {
    e.preventDefault();

    // very simple validation
    if (
      !form.name ||
      !form.phone ||
      !form.area ||
      !form.service ||
      !form.date
    ) {
      setMessage("Please fill all required fields (marked *).");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to submit booking");
      }

      const data = await response.json();

      setMessage(
        `Booking submitted to backend! Reference ID: ${data.bookingId}. (Currently stored in server memory.)`
      );

      // Optional: clear form after success
      // setForm({
      //   name: "",
      //   phone: "",
      //   area: "",
      //   service: "",
      //   date: "",
      //   timeSlot: "",
      //   notes: "",
      // });
    } catch (err) {
      console.error(err);
      setMessage(
        "Something went wrong while sending your booking. Please try again."
      );
    }
  }

  return (
    <MainLayout>
      <section
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "20px",
          boxShadow: "0 12px 30px rgba(15, 23, 42, 0.12)",
        }}
      >
        <h1 style={{ fontSize: "22px", marginBottom: "4px" }}>
          Book a cleaning in Coimbatore
        </h1>
        <p
          style={{
            fontSize: "14px",
            color: "#4b5563",
            marginBottom: "16px",
          }}
        >
          Share your details and preferred service. We&apos;ll match you with a
          verified cleaner in your area.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gap: "12px",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          {/* Name */}
          <div style={{ gridColumn: "1 / span 1" }}>
            <label
              style={{
                fontSize: "13px",
                display: "block",
                marginBottom: "4px",
              }}
            >
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px 10px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "13px",
              }}
            />
          </div>

          {/* Phone */}
          <div style={{ gridColumn: "2 / span 1" }}>
            <label
              style={{
                fontSize: "13px",
                display: "block",
                marginBottom: "4px",
              }}
            >
              Mobile Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px 10px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "13px",
              }}
            />
          </div>

          {/* Area */}
          <div style={{ gridColumn: "1 / span 1" }}>
            <label
              style={{
                fontSize: "13px",
                display: "block",
                marginBottom: "4px",
              }}
            >
              Area / Locality in Coimbatore *
            </label>
            <select
              name="area"
              value={form.area}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px 10px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "13px",
              }}
            >
              <option value="">Select area</option>
              {AREAS.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          {/* Service */}
          <div style={{ gridColumn: "2 / span 1" }}>
            <label
              style={{
                fontSize: "13px",
                display: "block",
                marginBottom: "4px",
              }}
            >
              Service required *
            </label>
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px 10px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "13px",
              }}
            >
              <option value="">Select service</option>
              {SERVICES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div style={{ gridColumn: "1 / span 1" }}>
            <label
              style={{
                fontSize: "13px",
                display: "block",
                marginBottom: "4px",
              }}
            >
              Preferred Date *
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px 10px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "13px",
              }}
            />
          </div>

          {/* Time slot */}
          <div style={{ gridColumn: "2 / span 1" }}>
            <label
              style={{
                fontSize: "13px",
                display: "block",
                marginBottom: "4px",
              }}
            >
              Preferred Time Slot
            </label>
            <select
              name="timeSlot"
              value={form.timeSlot}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px 10px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "13px",
              }}
            >
              <option value="">Any time</option>
              <option value="8–11am">8–11 AM</option>
              <option value="11–2pm">11 AM – 2 PM</option>
              <option value="2–5pm">2–5 PM</option>
            </select>
          </div>

          {/* Notes – full width */}
          <div style={{ gridColumn: "1 / span 2" }}>
            <label
              style={{
                fontSize: "13px",
                display: "block",
                marginBottom: "4px",
              }}
            >
              Additional details (optional)
            </label>
            <textarea
              name="notes"
              rows={3}
              value={form.notes}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px 10px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "13px",
                resize: "vertical",
              }}
            />
          </div>

          {/* Submit button – full width */}
          <div style={{ gridColumn: "1 / span 2", marginTop: "4px" }}>
            <button
              type="submit"
              style={{
                padding: "10px 18px",
                borderRadius: "999px",
                border: "none",
                backgroundColor: "#0f766e",
                color: "white",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Submit Booking Request
            </button>
          </div>
        </form>

        {message && (
          <p
            style={{
              marginTop: "10px",
              fontSize: "13px",
              color: "#065f46",
            }}
          >
            {message}
          </p>
        )}
      </section>
    </MainLayout>
  );
}

export default Book;
