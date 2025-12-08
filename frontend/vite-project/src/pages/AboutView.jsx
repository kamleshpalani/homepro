import { Link } from "react-router-dom";
import "./About.css";

export default function AboutView() {
  return (
    <div className="about-page-new">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="about-hero-badge"> About Us</div>
          <h1 className="about-hero-title">
            Making <span className="about-gradient">professional cleaning</span> accessible to everyone
          </h1>
          <p className="about-hero-desc">
            HomeCare Pro connects busy families and professionals with trusted, verified cleaners in Coimbatore. We're building a platform where quality meets convenience.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story-section">
        <div className="about-story-grid">
          <div className="about-story-card">
            <div className="about-story-icon"></div>
            <h2 className="about-story-title">Our Mission</h2>
            <p className="about-story-text">
              To make hotel-grade cleanliness accessible and hassle-free for every home and office in India. We believe everyone deserves a clean, healthy living space without the stress of finding reliable help.
            </p>
          </div>

          <div className="about-story-card">
            <div className="about-story-icon"></div>
            <h2 className="about-story-title">Why We Started</h2>
            <p className="about-story-text">
              Finding trustworthy cleaners shouldn't be difficult. We created HomeCare Pro to solve this problem—connecting verified professionals with customers who need quality cleaning services they can rely on.
            </p>
          </div>

          <div className="about-story-card">
            <div className="about-story-icon"></div>
            <h2 className="about-story-title">Our Approach</h2>
            <p className="about-story-text">
              Unlike generic marketplaces, we focus exclusively on cleaning services. Every feature—from booking to feedback—is designed around hygiene, reliability, and customer safety.
            </p>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="about-how-section">
        <h2 className="about-how-title">How we ensure quality</h2>
        <div className="about-how-grid">
          <div className="about-how-step">
            <div className="about-how-number">01</div>
            <h3 className="about-how-heading">Verified Cleaners</h3>
            <p className="about-how-text">
              All cleaners undergo identity verification, background checks, and training on our standardized cleaning checklist.
            </p>
          </div>

          <div className="about-how-step">
            <div className="about-how-number">02</div>
            <h3 className="about-how-heading">Transparent Pricing</h3>
            <p className="about-how-text">
              See exact pricing upfront before booking. No hidden charges, no surprises—just honest, fair rates.
            </p>
          </div>

          <div className="about-how-step">
            <div className="about-how-number">03</div>
            <h3 className="about-how-heading">Quality Monitoring</h3>
            <p className="about-how-text">
              Every job is reviewed and rated. We continuously monitor feedback to maintain high standards.
            </p>
          </div>

          <div className="about-how-step">
            <div className="about-how-number">04</div>
            <h3 className="about-how-heading">Customer Support</h3>
            <p className="about-how-text">
              Real-time updates via SMS and WhatsApp. Our support team is always available to help.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats-section">
        <div className="about-stats-grid">
          <div className="about-stat-card">
            <div className="about-stat-number">2,500+</div>
            <div className="about-stat-label">Happy Customers</div>
          </div>
          <div className="about-stat-card">
            <div className="about-stat-number">150+</div>
            <div className="about-stat-label">Verified Cleaners</div>
          </div>
          <div className="about-stat-card">
            <div className="about-stat-number">4.9</div>
            <div className="about-stat-label">Average Rating</div>
          </div>
          <div className="about-stat-card">
            <div className="about-stat-number">98%</div>
            <div className="about-stat-label">Satisfaction Rate</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="about-cta-content">
          <h2 className="about-cta-title">Ready to experience the difference?</h2>
          <p className="about-cta-text">
            Join thousands of satisfied customers in Coimbatore. Book your first cleaning service today.
          </p>
          <Link to="/book" className="about-cta-btn">
            <span>Book a service</span>
            <span className="about-cta-arrow"></span>
          </Link>
        </div>
      </section>
    </div>
  );
}
