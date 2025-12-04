import MainLayout from "../layouts/MainLayout.jsx";
import "./CleanerApply.css";

export default function CleanerApplyView({
  form,
  message,
  error,
  submitting,
  onChange,
  onSubmit,
}) {
  return (
    <MainLayout>
      <section className="cleaner-apply-section">
        <h1 className="cleaner-apply-title">Cleaner Registration</h1>
        <p className="cleaner-apply-subtitle">
          Apply as a freelance cleaner in Coimbatore. Our team will review your
          details and contact you.
        </p>

        {message && <p className="cleaner-apply-message-success">{message}</p>}

        {error && <p className="cleaner-apply-message-error">{error}</p>}

        <form onSubmit={onSubmit} className="cleaner-apply-form">
          <div>
            <label className="cleaner-apply-label">
              Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              required
              className="cleaner-apply-input"
              placeholder="e.g. Ram"
            />
          </div>

          <div>
            <label className="cleaner-apply-label">
              Phone <span style={{ color: "red" }}>*</span>
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={onChange}
              required
              className="cleaner-apply-input"
              placeholder="e.g. 9876543210"
            />
          </div>

          <div>
            <label className="cleaner-apply-label">
              Area (Location) <span style={{ color: "red" }}>*</span>
            </label>
            <input
              name="area"
              value={form.area}
              onChange={onChange}
              required
              className="cleaner-apply-input"
              placeholder="e.g. Saibaba Colony"
            />
          </div>

          <div>
            <label className="cleaner-apply-label">Experience (years)</label>
            <input
              name="experienceYears"
              value={form.experienceYears}
              onChange={onChange}
              className="cleaner-apply-input"
              placeholder="e.g. 2"
            />
          </div>

          <div>
            <label className="cleaner-apply-label">Services Offered</label>
            <input
              name="servicesOffered"
              value={form.servicesOffered}
              onChange={onChange}
              className="cleaner-apply-input"
              placeholder="e.g. 1BHK deep cleaning, kitchen cleaning…"
            />
          </div>

          <div>
            <label className="cleaner-apply-label">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={onChange}
              className="cleaner-apply-textarea"
              rows={3}
              placeholder="Any additional info (timings, preferred areas, etc.)"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="cleaner-apply-submit-button"
          >
            {submitting ? "Submitting…" : "Submit Application"}
          </button>
        </form>
      </section>
    </MainLayout>
  );
}
