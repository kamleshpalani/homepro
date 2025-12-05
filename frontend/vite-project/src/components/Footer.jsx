// src/components/Footer.jsx
import "./Footer.css";

function Footer() {
  return (
    <footer className="home-footer">
      <div className="home-footer-inner">
        <div className="home-footer-brand">
          <div className="home-footer-logo">HomeCare Pro</div>
          <p className="home-footer-text">
            Reliable hourly home cleaning in Coimbatore with clear pricing,
            trusted cleaners, and simple online booking.
          </p>
        </div>

        <div className="home-footer-menus">
          <div className="home-footer-column">
            <h4 className="home-footer-heading">Company</h4>
            <a href="#" className="home-footer-link">
              About us
            </a>
            <a href="#" className="home-footer-link">
              Our cleaners
            </a>
            <a href="#" className="home-footer-link">
              Service areas
            </a>
          </div>

          <div className="home-footer-column">
            <h4 className="home-footer-heading">Services</h4>
            <a href="#" className="home-footer-link">
              Hourly cleaning
            </a>
            <a href="#" className="home-footer-link">
              Deep cleaning
            </a>
            <a href="#" className="home-footer-link">
              Move-in / move-out
            </a>
          </div>

          <div className="home-footer-column">
            <h4 className="home-footer-heading">Support</h4>
            <a href="#" className="home-footer-link">
              Contact
            </a>
            <a href="#" className="home-footer-link">
              FAQs
            </a>
            <a href="#" className="home-footer-link">
              Terms &amp; Privacy
            </a>
          </div>
        </div>
      </div>

      <div className="home-footer-bottom">
        <span>
          © {new Date().getFullYear()} HomeCare Pro. All rights reserved.
        </span>
        <span className="home-footer-meta">Made with care in Coimbatore.</span>
      </div>
    </footer>
  );
}

export default Footer;
