import "./Contact.css";

export default function ContactView() {
  return (
    <div className="contact-page-new">
      {/* Animated Background */}
      <div className="contact-bg">
        <div className="contact-bg-shape-1"></div>
        <div className="contact-bg-shape-2"></div>
      </div>

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <div className="contact-hero-badge">💬 Get in Touch</div>
          <h1 className="contact-hero-title">
            We're here to <span className="contact-gradient">help you</span>
          </h1>
          <p className="contact-hero-desc">
            Have questions about our services, pricing, or want to partner with
            us? We'd love to hear from you.
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

      {/* Support Highlights */}
      <section className="contact-support-section">
        <div className="contact-support-grid">
          <div className="contact-support-card">
            <div className="contact-support-icon">⚡</div>
            <h3 className="contact-support-title">Fast responses</h3>
            <p className="contact-support-text">
              Most queries answered within 1 business hour during working times.
            </p>
          </div>
          <div className="contact-support-card">
            <div className="contact-support-icon">🛡️</div>
            <h3 className="contact-support-title">Secure & verified</h3>
            <p className="contact-support-text">
              Identity-verified support reps with audit trails for every
              request.
            </p>
          </div>
          <div className="contact-support-card">
            <div className="contact-support-icon">🤝</div>
            <h3 className="contact-support-title">Partner friendly</h3>
            <p className="contact-support-text">
              Dedicated channel for partners and corporates to coordinate
              schedules.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form - Split Layout */}
      <section className="contact-form-section">
        <div className="contact-form-container">
          {/* Left Side - Contact Info */}
          <div className="contact-info-side">
            <div className="contact-form-header">
              <h2 className="contact-form-title">Get in touch</h2>
              <p className="contact-form-desc">
                We're here to help! Reach out through any of these channels or
                fill out the form.
              </p>
            </div>

            <div className="contact-info-items">
              <div className="contact-info-item">
                <div className="contact-info-icon">📧</div>
                <div className="contact-info-content">
                  <h4 className="contact-info-label">Email</h4>
                  <p className="contact-info-value">hello@homecarepro.in</p>
                  <p className="contact-info-note">24-hour response time</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">📱</div>
                <div className="contact-info-content">
                  <h4 className="contact-info-label">Phone</h4>
                  <p className="contact-info-value">+91 98765 43210</p>
                  <p className="contact-info-note">Mon-Sat, 9 AM - 8 PM</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">📍</div>
                <div className="contact-info-content">
                  <h4 className="contact-info-label">Location</h4>
                  <p className="contact-info-value">Coimbatore, Tamil Nadu</p>
                  <p className="contact-info-note">Serving across the city</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">⏱️</div>
                <div className="contact-info-content">
                  <h4 className="contact-info-label">Business Hours</h4>
                  <p className="contact-info-value">Monday - Saturday</p>
                  <p className="contact-info-note">9:00 AM - 8:00 PM IST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="contact-form-side">
            <h3 className="contact-form-side-title">Send us a message</h3>
            <form
              className="contact-form-new"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="contact-form-field">
                <label className="contact-form-label" htmlFor="contact-name">
                  Full name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  className="contact-form-input"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="contact-form-field">
                <label className="contact-form-label" htmlFor="contact-email">
                  Email address *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  className="contact-form-input"
                  placeholder="your.email@example.com"
                  required
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

              <div className="contact-form-field">
                <label className="contact-form-label" htmlFor="contact-topic">
                  Subject *
                </label>
                <select
                  id="contact-topic"
                  className="contact-form-input"
                  required
                >
                  <option value="">Select a topic</option>
                  <option>General inquiry</option>
                  <option>Booking support</option>
                  <option>Pricing questions</option>
                  <option>Partner with us</option>
                  <option>Feedback or complaint</option>
                </select>
              </div>

              <div className="contact-form-field">
                <label className="contact-form-label" htmlFor="contact-message">
                  Your message *
                </label>
                <textarea
                  id="contact-message"
                  className="contact-form-input contact-form-textarea"
                  rows={6}
                  placeholder="Tell us more about your inquiry..."
                  required
                />
              </div>

              <button type="submit" className="contact-form-submit">
                <span>Send message</span>
                <span className="contact-form-arrow">→</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="contact-faq-section">
        <div className="contact-faq-content">
          <div className="contact-faq-header">
            <p className="contact-faq-eyebrow">Quick answers</p>
            <h2 className="contact-faq-title">Most asked questions</h2>
            <p className="contact-faq-desc">
              If you don’t see your question here, drop us a line—we usually
              reply fast.
            </p>
          </div>
          <div className="contact-faq-grid">
            <div className="contact-faq-item">
              <h3 className="contact-faq-question">Do you bring supplies?</h3>
              <p className="contact-faq-answer">
                Yes. Our cleaners bring standard supplies; let us know if you
                prefer eco options.
              </p>
            </div>
            <div className="contact-faq-item">
              <h3 className="contact-faq-question">Can I reschedule?</h3>
              <p className="contact-faq-answer">
                You can reschedule up to 12 hours before the slot with no extra
                charges.
              </p>
            </div>
            <div className="contact-faq-item">
              <h3 className="contact-faq-question">
                Is there a satisfaction guarantee?
              </h3>
              <p className="contact-faq-answer">
                Absolutely. If anything’s missed, we’ll re-clean the specific
                area for free.
              </p>
            </div>
            <div className="contact-faq-item">
              <h3 className="contact-faq-question">
                Which areas do you serve?
              </h3>
              <p className="contact-faq-answer">
                We currently serve Coimbatore and nearby neighborhoods. More
                cities soon.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Section */}
      <section className="contact-visit-section">
        <div className="contact-visit-card">
          <div className="contact-visit-copy">
            <p className="contact-visit-eyebrow">Come say hello</p>
            <h2 className="contact-visit-title">
              Meet us at our Coimbatore studio
            </h2>
            <p className="contact-visit-desc">
              Schedule a walkthrough, discuss custom cleaning plans, or partner
              with us for offices.
            </p>
            <div className="contact-visit-meta">
              <span>Mon - Sat</span>
              <span>9:00 AM - 8:00 PM</span>
            </div>
          </div>
          <div className="contact-visit-action">
            <a
              className="contact-visit-btn"
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
            >
              Open in Google Maps
            </a>
            <p className="contact-visit-note">
              Coimbatore, Tamil Nadu · Visits by prior appointment
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
