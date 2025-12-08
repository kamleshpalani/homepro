import "./pages/Home.css";

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
  return (
    <div className="home-page">
      {/* Redesigned Hero - Full Width Impact */}
      <section className="home-hero-new">
        <div className="home-hero-content">
          <div className="home-hero-tag">
            <span className="home-hero-tag-icon">✨</span>
            <span>Trusted by 500+ Coimbatore families</span>
          </div>

          <h1 className="home-hero-headline">
            Your home deserves
            <br />
            <span className="home-hero-gradient">professional care</span>
          </h1>

          <p className="home-hero-desc">
            Book verified cleaners in minutes. Transparent pricing, flexible
            scheduling, and 100% satisfaction guaranteed across Coimbatore.
          </p>

          <div className="home-hero-actions">
            <button className="home-btn-primary">
              <span>Book your first clean</span>
              <span className="home-btn-arrow">→</span>
            </button>
            <button className="home-btn-secondary">
              <span className="home-btn-play">▶</span>
              <span>See how it works</span>
            </button>
          </div>

          <div className="home-hero-stats">
            <div className="home-stat">
              <div className="home-stat-number">4.9★</div>
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
          <div className="home-hero-card home-hero-card-1">
            <div className="home-card-header">
              <span className="home-card-icon">🏠</span>
              <span className="home-card-badge">Most Popular</span>
            </div>
            <h3 className="home-card-title">Standard Clean</h3>
            <p className="home-card-desc">Perfect for 1-2 BHK apartments</p>
            <div className="home-card-pricing">
              <span className="home-card-price-old">₹1,200</span>
              <span className="home-card-price-new">₹849</span>
              <span className="home-card-duration">2 hours</span>
            </div>
          </div>

          <div className="home-hero-card home-hero-card-2">
            <div className="home-card-header">
              <span className="home-card-icon">✨</span>
            </div>
            <h3 className="home-card-title">Deep Clean</h3>
            <p className="home-card-desc">Detailed cleaning for 2-3 BHK</p>
            <div className="home-card-pricing">
              <span className="home-card-price-old">₹1,600</span>
              <span className="home-card-price-new">₹1,199</span>
              <span className="home-card-duration">3 hours</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - Horizontal Scroll */}
      <section className="home-services-new">
        <div className="home-services-header">
          <div>
            <h2 className="home-section-heading">Choose your package</h2>
            <p className="home-section-subtext">
              Flexible hourly rates for every home size
            </p>
          </div>
        </div>

        <div className="home-services-scroll">
          {POPULAR_SERVICES.map((service, idx) => (
            <div key={service.name} className="home-service-new-card">
              {idx === 1 && <div className="home-service-badge">Popular</div>}
              <div className="home-service-icon">
                {idx === 0 && "⚡"}
                {idx === 1 && "🏠"}
                {idx === 2 && "✨"}
                {idx === 3 && "🌟"}
              </div>
              <h3 className="home-service-new-title">{service.name}</h3>
              <p className="home-service-new-desc">{service.highlight}</p>
              <div className="home-service-new-price">
                <span className="home-service-strike">
                  {service.originalPrice}
                </span>
                <span className="home-service-final">{service.offerPrice}</span>
              </div>
              <button className="home-service-new-btn">Select package</button>
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
          <button className="home-cta-btn">Apply as a cleaner</button>
        </div>
      </section>
    </div>
  );
}
