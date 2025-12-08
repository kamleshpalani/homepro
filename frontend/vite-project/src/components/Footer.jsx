// src/components/Footer.jsx
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-new">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">🏠</div>
              <div className="footer-logo-text">
                <span className="footer-logo-name">HomeCare</span>
                <span className="footer-logo-pro">Pro</span>
              </div>
            </div>
            <p className="footer-tagline">
              Professional home cleaning services in Coimbatore. Book trusted
              cleaners with transparent pricing and flexible scheduling.
            </p>
            <div className="footer-social">
              <a href="#" className="footer-social-link" aria-label="Facebook">
                📘
              </a>
              <a href="#" className="footer-social-link" aria-label="Instagram">
                📸
              </a>
              <a href="#" className="footer-social-link" aria-label="Twitter">
                🐦
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h3 className="footer-column-title">Services</h3>
              <a href="/services" className="footer-link">
                Home Cleaning
              </a>
              <a href="/services" className="footer-link">
                Deep Cleaning
              </a>
              <a href="/services" className="footer-link">
                Move-in/Move-out
              </a>
              <a href="/services" className="footer-link">
                Office Cleaning
              </a>
            </div>

            <div className="footer-column">
              <h3 className="footer-column-title">Company</h3>
              <a href="/about" className="footer-link">
                About Us
              </a>
              <a href="/cleaners/apply" className="footer-link">
                Join as Cleaner
              </a>
              <a href="#" className="footer-link">
                Careers
              </a>
              <a href="#" className="footer-link">
                Blog
              </a>
            </div>

            <div className="footer-column">
              <h3 className="footer-column-title">Support</h3>
              <a href="/contact" className="footer-link">
                Contact Us
              </a>
              <a href="#" className="footer-link">
                Help Center
              </a>
              <a href="#" className="footer-link">
                Terms of Service
              </a>
              <a href="#" className="footer-link">
                Privacy Policy
              </a>
            </div>

            <div className="footer-column">
              <h3 className="footer-column-title">Get Started</h3>
              <a href="/book" className="footer-link footer-link-highlight">
                Book a Cleaning →
              </a>
              <p className="footer-contact">
                <strong>Call us:</strong>
                <br />
                +91 98765 43210
              </p>
              <p className="footer-contact">
                <strong>Email:</strong>
                <br />
                hello@homecarepro.in
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} HomeCare Pro. All rights reserved.
          </p>
          <div className="footer-badges">
            <span className="footer-badge">🌟 4.9 Rating</span>
            <span className="footer-badge">✅ Verified Cleaners</span>
            <span className="footer-badge">💚 Made in Coimbatore</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
