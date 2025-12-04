import "./Book.css";

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

export default function BookView({ form, message, onChange, onSubmit }) {
  return (
    <section className="book-section">
      <h1 className="book-title">Book a cleaning in Coimbatore</h1>
      <p className="book-subtitle">
        Share your details and preferred service. We&apos;ll match you with a
        verified cleaner in your area.
      </p>

      <form onSubmit={onSubmit} className="book-form">
        {/* Name */}
        <div className="book-form-field-half">
          <label className="book-label">Full Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            className="book-input"
          />
        </div>

        {/* Phone */}
        <div className="book-form-field-half-right">
          <label className="book-label">Mobile Number *</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={onChange}
            className="book-input"
          />
        </div>

        {/* Area */}
        <div className="book-form-field-half">
          <label className="book-label">Area / Locality in Coimbatore *</label>
          <select
            name="area"
            value={form.area}
            onChange={onChange}
            className="book-select"
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
        <div className="book-form-field-half-right">
          <label className="book-label">Service required *</label>
          <select
            name="service"
            value={form.service}
            onChange={onChange}
            className="book-select"
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
        <div className="book-form-field-half">
          <label className="book-label">Preferred Date *</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={onChange}
            className="book-input"
          />
        </div>

        {/* Time slot */}
        <div className="book-form-field-half-right">
          <label className="book-label">Preferred Time Slot</label>
          <select
            name="timeSlot"
            value={form.timeSlot}
            onChange={onChange}
            className="book-select"
          >
            <option value="">Any time</option>
            <option value="8–11am">8–11 AM</option>
            <option value="11–2pm">11 AM – 2 PM</option>
            <option value="2–5pm">2–5 PM</option>
          </select>
        </div>

        {/* Notes – full width */}
        <div className="book-form-field-full">
          <label className="book-label">Additional details (optional)</label>
          <textarea
            name="notes"
            rows={3}
            value={form.notes}
            onChange={onChange}
            className="book-textarea"
          />
        </div>

        {/* Submit button – full width */}
        <div className="book-submit-wrapper">
          <button type="submit" className="book-submit-button">
            Submit Booking Request
          </button>
        </div>
      </form>

      {message && <p className="book-message">{message}</p>}
    </section>
  );
}
