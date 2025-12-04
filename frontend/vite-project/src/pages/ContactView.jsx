import "./Contact.css";

export default function ContactView() {
  return (
    <section className="contact-section">
      <div className="contact-header">
        <h1 className="contact-title">Contact HomeCare Pro</h1>
        <p className="contact-subtitle">
          Have a question about bookings, pricing, or partnering with us? Drop
          your details and our team will get back within a few working hours.
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-card contact-card--info">
          <h2 className="contact-card-title">Reach us directly</h2>
          <p className="contact-text">
            We&apos;re based in Coimbatore and currently serve the city and
            nearby areas.
          </p>

          <div className="contact-meta">
            <div className="contact-meta-item">
              <span className="contact-meta-label">Email</span>
              <span className="contact-meta-value">
                support@homecarepro.com
              </span>
            </div>
            <div className="contact-meta-item">
              <span className="contact-meta-label">WhatsApp</span>
              <span className="contact-meta-value">+91-90000-00000</span>
            </div>
            <div className="contact-meta-item">
              <span className="contact-meta-label">Support hours</span>
              <span className="contact-meta-value">
                Mon–Sat, 9:00 AM – 8:00 PM
              </span>
            </div>
          </div>

          <p className="contact-text contact-text-muted">
            For urgent booking changes, WhatsApp is usually the fastest way to
            reach us.
          </p>
        </div>

        <div className="contact-card contact-card--form">
          <h2 className="contact-card-title">Send us a message</h2>
          <p className="contact-text contact-text-muted">
            Share a few details so we can help you better.
          </p>

          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="contact-form-row">
              <div className="contact-field">
                <label className="contact-label" htmlFor="contact-name">
                  Full name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  className="contact-input"
                  placeholder="Enter your name"
                />
              </div>

              <div className="contact-field">
                <label className="contact-label" htmlFor="contact-phone">
                  Phone number
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  className="contact-input"
                  placeholder="For quick follow-ups"
                />
              </div>
            </div>

            <div className="contact-field">
              <label className="contact-label" htmlFor="contact-email">
                Email address
              </label>
              <input
                id="contact-email"
                type="email"
                className="contact-input"
                placeholder="We'll send a reply here"
              />
            </div>

            <div className="contact-field">
              <label className="contact-label" htmlFor="contact-topic">
                Topic
              </label>
              <select id="contact-topic" className="contact-input">
                <option>General question</option>
                <option>Booking support</option>
                <option>Pricing / packages</option>
                <option>Partner with HomeCare Pro</option>
              </select>
            </div>

            <div className="contact-field">
              <label className="contact-label" htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                className="contact-input contact-textarea"
                rows={4}
                placeholder="Tell us a bit more about how we can help"
              />
            </div>

            <button type="submit" className="contact-submit-btn">
              Submit enquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
