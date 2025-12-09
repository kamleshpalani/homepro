import { Link } from "react-router-dom";
import "./About.css";

export default function AboutView() {
  return (
    <div className="about-page-new">
      {/* Animated Background */}
      <div className="about-bg">
        <div className="about-bg-shape-1"></div>
        <div className="about-bg-shape-2"></div>
      </div>

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="about-hero-badge"> About Us</div>
          <h1 className="about-hero-title">
            Making <span className="about-gradient">professional cleaning</span>{" "}
            accessible to everyone
          </h1>
          <p className="about-hero-desc">
            HomeCare Pro connects busy families and professionals with trusted,
            verified cleaners in Coimbatore. We're building a platform where
            quality meets convenience.
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
              To make hotel-grade cleanliness accessible and hassle-free for
              every home and office in India. We believe everyone deserves a
              clean, healthy living space without the stress of finding reliable
              help.
            </p>
          </div>

          <div className="about-story-card">
            <div className="about-story-icon"></div>
            <h2 className="about-story-title">Why We Started</h2>
            <p className="about-story-text">
              Finding trustworthy cleaners shouldn't be difficult. We created
              HomeCare Pro to solve this problem—connecting verified
              professionals with customers who need quality cleaning services
              they can rely on.
            </p>
          </div>

          <div className="about-story-card">
            <div className="about-story-icon"></div>
            <h2 className="about-story-title">Our Approach</h2>
            <p className="about-story-text">
              Unlike generic marketplaces, we focus exclusively on cleaning
              services. Every feature—from booking to feedback—is designed
              around hygiene, reliability, and customer safety.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values-section">
        <div className="about-values-header">
          <p className="about-eyebrow">What we stand for</p>
          <h2 className="about-values-title">
            Built on trust, rigor, and care
          </h2>
          <p className="about-values-desc">
            A modern cleaning network that blends technology, vetted talent, and
            relentless quality checks to keep your spaces consistently spotless.
          </p>
        </div>
        <div className="about-values-grid">
          <div className="about-value-card">
            <div className="about-value-icon">🛡️</div>
            <h3 className="about-value-title">Safety first</h3>
            <p className="about-value-text">
              Background checks, verified IDs, and strict adherence to hygiene
              protocols on every visit.
            </p>
          </div>
          <div className="about-value-card">
            <div className="about-value-icon">📋</div>
            <h3 className="about-value-title">Playbook driven</h3>
            <p className="about-value-text">
              Room-by-room SOPs, digital checklists, and photo proof so nothing
              gets missed.
            </p>
          </div>
          <div className="about-value-card">
            <div className="about-value-icon">⚡</div>
            <h3 className="about-value-title">Fast support</h3>
            <p className="about-value-text">
              Live support on chat and phone with proactive updates from
              dispatch to doorstep.
            </p>
          </div>
          <div className="about-value-card">
            <div className="about-value-icon">🌿</div>
            <h3 className="about-value-title">Eco mindful</h3>
            <p className="about-value-text">
              Low-tox supplies wherever possible and mindful water usage without
              compromising shine.
            </p>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="about-timeline-section">
        <div className="about-timeline-header">
          <p className="about-eyebrow">Our journey</p>
          <h2 className="about-timeline-title">
            From a small crew to a city-wide network
          </h2>
          <p className="about-timeline-desc">
            We keep improving our operating system for cleanliness—expanding
            services, training, and tech.
          </p>
        </div>
        <div className="about-timeline-grid">
          <div className="about-timeline-card">
            <div className="about-timeline-dot"></div>
            <p className="about-timeline-year">2019</p>
            <h3 className="about-timeline-heading">Launched in Coimbatore</h3>
            <p className="about-timeline-text">
              Started with a handful of vetted cleaners, focused on 1-2 BHK
              homes.
            </p>
          </div>
          <div className="about-timeline-card">
            <div className="about-timeline-dot"></div>
            <p className="about-timeline-year">2021</p>
            <h3 className="about-timeline-heading">Playbooks & QA</h3>
            <p className="about-timeline-text">
              Introduced digital checklists, spot audits, and customer feedback
              loops.
            </p>
          </div>
          <div className="about-timeline-card">
            <div className="about-timeline-dot"></div>
            <p className="about-timeline-year">2023</p>
            <h3 className="about-timeline-heading">Specialized services</h3>
            <p className="about-timeline-text">
              Added kitchen deep-clean, move-in/move-out, and commercial
              packages.
            </p>
          </div>
          <div className="about-timeline-card">
            <div className="about-timeline-dot"></div>
            <p className="about-timeline-year">2024</p>
            <h3 className="about-timeline-heading">Live support</h3>
            <p className="about-timeline-text">
              Launched live tracking, schedule tweaks, and rapid-reclean
              promise.
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
              All cleaners undergo identity verification, background checks, and
              training on our standardized cleaning checklist.
            </p>
          </div>

          <div className="about-how-step">
            <div className="about-how-number">02</div>
            <h3 className="about-how-heading">Transparent Pricing</h3>
            <p className="about-how-text">
              See exact pricing upfront before booking. No hidden charges, no
              surprises—just honest, fair rates.
            </p>
          </div>

          <div className="about-how-step">
            <div className="about-how-number">03</div>
            <h3 className="about-how-heading">Quality Monitoring</h3>
            <p className="about-how-text">
              Every job is reviewed and rated. We continuously monitor feedback
              to maintain high standards.
            </p>
          </div>

          <div className="about-how-step">
            <div className="about-how-number">04</div>
            <h3 className="about-how-heading">Customer Support</h3>
            <p className="about-how-text">
              Real-time updates via SMS and WhatsApp. Our support team is always
              available to help.
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
          <h2 className="about-cta-title">
            Ready to experience the difference?
          </h2>
          <p className="about-cta-text">
            Join thousands of satisfied customers in Coimbatore. Book your first
            cleaning service today.
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
