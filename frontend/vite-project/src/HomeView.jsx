import "./pages/Home.css";
import { useNavigate } from "react-router-dom";

const POPULAR_SERVICES = [
  {
    name: "Quick Refresh (1 hour)",
    duration: "~1 hour",
    originalPrice: "₹650",
    offerPrice: "₹450",
    highlight:
      "Ideal for a light refresh of hall, kitchen surfaces, and 1 bathroom.",
  },
  {
    name: "Standard Clean (2 hours)",
    duration: "~2 hours",
    originalPrice: "₹1,200",
    offerPrice: "₹849",
    highlight: "Suitable for a full 1BHK or focused deep clean of key areas.",
  },
  {
    name: "Deep Clean (3 hours)",
    duration: "~3 hours",
    originalPrice: "₹1,600",
    offerPrice: "₹1,199",
    highlight: "Great for 2BHK homes or kitchen + 2 bathrooms.",
  },
  {
    name: "Extended Deep Clean (4 hours)",
    duration: "~4 hours",
    originalPrice: "₹2,000",
    offerPrice: "₹1,499",
    highlight: "Recommended for larger homes or move-in / move-out.",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    area: "RS Puram",
    rating: 5,
    text: "Amazing service! The cleaner was professional and thorough. My 2BHK has never looked this good.",
    date: "2 days ago",
  },
  {
    name: "Rajesh Kumar",
    area: "Saibaba Colony",
    rating: 5,
    text: "Very reliable and affordable. I've been using HomePro for 3 months now. Highly recommend!",
    date: "1 week ago",
  },
  {
    name: "Anjali Menon",
    area: "Peelamedu",
    rating: 5,
    text: "Perfect for working professionals. Easy booking and the cleaners always arrive on time.",
    date: "3 days ago",
  },
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
  "Race Course",
  "Ramanathapuram",
  "PN Palayam",
  "Ganapathy",
];

const HOW_IT_WORKS_STEPS = [
  {
    title: "Tell us what you need",
    text: "Share your flat size, rooms, and the services you want cleaned.",
  },
  {
    title: "We match you with a pro",
    text: "We connect you with trusted local cleaners available for your slot.",
  },
  {
    title: "Relax while we clean",
    text: "Your cleaner arrives on time with a checklist and gets to work.",
  },
];

const WHY_CHOOSE_POINTS = [
  {
    title: "Coimbatore-focused",
    text: "Handpicked cleaners who know local apartments, villas, and layouts.",
  },
  {
    title: "Transparent pricing",
    text: "No hidden charges c3 you see estimated time & price upfront.",
  },
  {
    title: "Support for cleaners",
    text: "We help freelance cleaners get regular, well-paying work.",
  },
  {
    title: "Simple online booking",
    text: "Fill a quick form, confirm the slot, and youc2re done.",
  },
];

export default function HomeView() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Enhanced Animated Background with Gradient Mesh */}
      <div className="home-bg-shapes">
        <div className="home-shape home-shape-1"></div>
        <div className="home-shape home-shape-2"></div>
        <div className="home-shape home-shape-3"></div>
        <div className="home-mesh-gradient"></div>
      </div>

      {/* Ultra-Modern Hero Section */}
      <section className="home-hero-new">
        <div className="home-hero-content">
          <div className="home-hero-tag">
            <span className="home-hero-tag-icon">✨</span>
            <span>Trusted by 500+ Coimbatore families</span>
            <span className="home-hero-tag-pulse"></span>
          </div>

          <h1 className="home-hero-headline">
            Your home deserves
            <br />
            <span className="home-hero-gradient">professional care</span>
            <svg
              className="home-hero-underline"
              viewBox="0 0 400 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 0 6 Q 100 0, 200 6 T 400 6"
                stroke="url(#gradient)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
            </svg>
          </h1>

          <p className="home-hero-desc">
            Book verified cleaners in minutes. Transparent pricing, flexible
            scheduling, and 100% satisfaction guaranteed across Coimbatore.
          </p>

          <div className="home-hero-actions">
            <button
              className="home-btn-primary"
              onClick={() => navigate("/book")}
            >
              <span className="home-btn-shine"></span>
              <span className="home-btn-text">Book your first clean</span>
              <span className="home-btn-arrow">→</span>
            </button>
            <button className="home-btn-secondary">
              <span className="home-btn-play">▶</span>
              <span>See how it works</span>
            </button>
          </div>

          <div className="home-hero-stats">
            <div className="home-stat">
              <div className="home-stat-number">
                <span className="home-stat-star">⭐</span> 4.9
              </div>
              <div className="home-stat-label">Average rating</div>
            </div>
            <div className="home-stat-divider"></div>
            <div className="home-stat">
              <div className="home-stat-number">2,500+</div>
              <div className="home-stat-label">Homes cleaned</div>
            </div>
            <div className="home-stat-divider"></div>
            <div className="home-stat">
              <div className="home-stat-number">50+</div>
              <div className="home-stat-label">Verified cleaners</div>
            </div>
          </div>
        </div>

        <div className="home-hero-visual">
          <div className="home-hero-glow"></div>
          <div className="home-hero-card home-hero-card-1">
            <div className="home-card-shine"></div>
            <div className="home-card-header">
              <span className="home-card-icon">🏠</span>
              <span className="home-card-badge">
                <span className="home-badge-dot"></span>
                Most Popular
              </span>
            </div>
            <h3 className="home-card-title">Standard Clean</h3>
            <p className="home-card-desc">Perfect for 1-2 BHK apartments</p>
            <div className="home-card-pricing">
              <div className="home-card-price-group">
                <span className="home-card-price-old">₹1,200</span>
                <span className="home-card-price-new">₹849</span>
              </div>
              <span className="home-card-duration">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                2 hours
              </span>
            </div>
          </div>

          <div className="home-hero-card home-hero-card-2">
            <div className="home-card-shine"></div>
            <div className="home-card-header">
              <span className="home-card-icon">✨</span>
            </div>
            <h3 className="home-card-title">Deep Clean</h3>
            <p className="home-card-desc">Detailed cleaning for 2-3 BHK</p>
            <div className="home-card-pricing">
              <div className="home-card-price-group">
                <span className="home-card-price-old">₹1,600</span>
                <span className="home-card-price-new">₹1,199</span>
              </div>
              <span className="home-card-duration">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                3 hours
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Services Grid */}
      <section className="home-services-new">
        <div className="home-services-header">
          <div className="home-section-title-wrapper">
            <span className="home-section-label">Our Packages</span>
            <h2 className="home-section-heading">Choose your package</h2>
            <p className="home-section-subtext">
              Flexible hourly rates for every home size with transparent pricing
            </p>
          </div>
        </div>

        <div className="home-services-scroll">
          {POPULAR_SERVICES.map((service, idx) => (
            <div
              key={service.name}
              className={`home-service-new-card ${
                idx === 1 ? "home-service-featured" : ""
              }`}
            >
              {idx === 1 && (
                <div className="home-service-badge">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  Most Popular
                </div>
              )}
              <div className="home-service-icon-wrapper">
                <div className="home-service-icon">
                  {idx === 0 && "⚡"}
                  {idx === 1 && "🏠"}
                  {idx === 2 && "✨"}
                  {idx === 3 && "🌟"}
                </div>
              </div>
              <h3 className="home-service-new-title">{service.name}</h3>
              <p className="home-service-new-desc">{service.highlight}</p>
              <div className="home-service-new-price">
                <div className="home-service-price-row">
                  <span className="home-service-strike">
                    {service.originalPrice}
                  </span>
                  <span className="home-service-discount">
                    Save{" "}
                    {Math.round(
                      ((parseInt(service.originalPrice.slice(1)) -
                        parseInt(service.offerPrice.slice(1))) /
                        parseInt(service.originalPrice.slice(1))) *
                        100
                    )}
                    %
                  </span>
                </div>
                <span className="home-service-final">{service.offerPrice}</span>
              </div>
              <button
                className="home-service-new-btn"
                onClick={() => navigate("/book")}
              >
                <span>Select package</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Premium Testimonials Section */}
      <section className="home-testimonials-new">
        <div className="home-testimonials-header">
          <span className="home-section-label">Testimonials</span>
          <h2 className="home-section-heading-center">
            What our customers say
          </h2>
          <p className="home-section-subtext-center">
            Real feedback from real customers across Coimbatore
          </p>
        </div>

        <div className="home-testimonials-grid">
          {TESTIMONIALS.map((testimonial, idx) => (
            <div
              key={testimonial.name}
              className="home-testimonial-card"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="home-testimonial-quote-icon">"</div>
              <div className="home-testimonial-stars">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg
                    key={i}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="home-testimonial-text">"{testimonial.text}"</p>
              <div className="home-testimonial-footer">
                <div className="home-testimonial-avatar">
                  <span>{testimonial.name.charAt(0)}</span>
                  <div className="home-testimonial-avatar-ring"></div>
                </div>
                <div className="home-testimonial-info">
                  <h4 className="home-testimonial-name">{testimonial.name}</h4>
                  <p className="home-testimonial-area">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {testimonial.area}
                  </p>
                </div>
                <span className="home-testimonial-date">
                  {testimonial.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works - Timeline Style */}
      <section className="home-how-new">
        <h2 className="home-section-heading-center">How it works</h2>
        <p className="home-section-subtext-center">
          Get your home cleaned in 3 simple steps
        </p>

        <div className="home-how-timeline">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <div key={step.title} className="home-how-step">
              <div className="home-how-number">
                <span>{index + 1}</span>
              </div>
              <div className="home-how-content">
                <h3 className="home-how-title">{step.title}</h3>
                <p className="home-how-text">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose - Feature Grid */}
      <section className="home-why-new">
        <h2 className="home-section-heading-center">Why choose us</h2>
        <p className="home-section-subtext-center">
          Trusted by Coimbatore families for quality and reliability
        </p>

        <div className="home-why-new-grid">
          {WHY_CHOOSE_POINTS.map((item, idx) => (
            <div key={item.title} className="home-why-new-card">
              <div className="home-why-icon">
                {idx === 0 && "📍"}
                {idx === 1 && "💰"}
                {idx === 2 && "🤝"}
                {idx === 3 && "📱"}
              </div>
              <h3 className="home-why-new-title">{item.title}</h3>
              <p className="home-why-new-text">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Areas + CTA Combined Section */}
      <section className="home-areas-cta-new">
        <div className="home-areas-box">
          <h3 className="home-areas-heading">Serving across Coimbatore</h3>
          <div className="home-areas-tags">
            {AREAS.map((area) => (
              <span key={area} className="home-area-tag">
                {area}
              </span>
            ))}
          </div>
          <p className="home-areas-note">
            Don't see your area? <a href="#">Contact us</a> and we'll help!
          </p>
        </div>

        <div className="home-cta-box">
          <div className="home-cta-icon">💼</div>
          <h3 className="home-cta-heading">Join our team</h3>
          <p className="home-cta-text">
            Earn flexible income by joining our network of professional cleaners
            in Coimbatore
          </p>
          <button
            className="home-cta-btn"
            onClick={() => navigate("/cleaners/apply")}
          >
            Apply as a cleaner
          </button>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="home-trust-section">
        <div className="home-trust-grid">
          <div className="home-trust-item">
            <div className="home-trust-icon">🔒</div>
            <h4 className="home-trust-title">100% Secure</h4>
            <p className="home-trust-text">Background-verified cleaners</p>
          </div>
          <div className="home-trust-item">
            <div className="home-trust-icon">💯</div>
            <h4 className="home-trust-title">Satisfaction Guaranteed</h4>
            <p className="home-trust-text">Re-clean if not satisfied</p>
          </div>
          <div className="home-trust-item">
            <div className="home-trust-icon">⚡</div>
            <h4 className="home-trust-title">Same-Day Booking</h4>
            <p className="home-trust-text">Available 7 days a week</p>
          </div>
          <div className="home-trust-item">
            <div className="home-trust-icon">💰</div>
            <h4 className="home-trust-title">Best Price Guarantee</h4>
            <p className="home-trust-text">No hidden charges</p>
          </div>
        </div>
      </section>
    </div>
  );
}
