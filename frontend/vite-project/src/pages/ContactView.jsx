import "./Contact.css";

export default function ContactView() {
  return (
    <div className="contact-page-new">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <div className="contact-hero-badge">💬 Get in Touch</div>
          <h1 className="contact-hero-title">
            We're here to <span className="contact-gradient">help you</span>
          </h1>
          <p className="contact-hero-desc">
            Have questions about our services, pricing, or want to partner with us? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="contact-methods-section">
        <div className="contact-methods-grid">
          <div className="contact-method-card">
            <div className="contact-method-icon">📧</div>
            <h3 className="contact-method-title">Email Us</h3>
            <p className="contact-method-text">hello@homecarepro.in</p>
            <p className="contact-method-desc">We reply within 24 hours</p>
          </div>

          <div className="contact-method-card">
            <div className="contact-method-icon">📱</div>
            <h3 className="contact-method-title">Call or WhatsApp</h3>
            <p className="contact-method-text">+91 98765 43210</p>
            <p className="contact-method-desc">Mon-Sat, 9 AM - 8 PM</p>
          </div>

          <div className="contact-method-card">
            <div className="contact-method-icon">📍</div>
            <h3 className="contact-method-title">Visit Us</h3>
            <p className="contact-method-text">Coimbatore, Tamil Nadu</p>
            <p className="contact-method-desc">Serving across the city</p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section">
        <div className="contact-form-container">
          <div className="contact-form-header">
            <h2 className="contact-form-title">Send us a message</h2>
            <p className="contact-form-desc">
              Fill out the form below and we'll get back to you within a few hours.
            </p>
          </div>

          <form className="contact-form-new" onSubmit={(e) => e.preventDefault()}>
            <div className="contact-form-grid">
              <div className="contact-form-field">
                <label className="contact-form-label" htmlFor="contact-name">
                  Full name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  className="contact-form-input"
                  placeholder="Enter your name"
                />
              </div>

              <div className="contact-form-field">
                <label className="contact-form-label" htmlFor="contact-phone">
                  Phone number
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  className="contact-form-input"
                  placeholder="Your mobile number"
                />
              </div>

              <div className="contact-form-field contact-form-field-full">
                <label className="contact-form-label" htmlFor="contact-email">
                  Email address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  className="contact-form-input"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="contact-form-field contact-form-field-full">
                <label className="contact-form-label" htmlFor="contact-topic">
                  What can we help you with?
                </label>
                <select id="contact-topic" className="contact-form-input">
                  <option>General inquiry</option>
                  <option>Booking support</option>
                  <option>Pricing questions</option>
                  <option>Partner with us</option>
                  <option>Feedback or complaint</option>
                </select>
              </div>

              <div className="contact-form-field contact-form-field-full">
                <label className="contact-form-label" htmlFor="contact-message">
                  Your message
                </label>
                <textarea
                  id="contact-message"
                  className="contact-form-input contact-form-textarea"
                  rows={5}
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <div className="contact-form-field contact-form-field-full">
                <button type="submit" className="contact-form-submit">
                  <span>Send message</span>
                  <span className="contact-form-arrow">→</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
