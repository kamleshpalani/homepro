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
      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero-left">
          <div className="home-hero-badge">
            <span className="home-hero-badge-dot" />
            <span className="home-hero-badge-text">
              Cleaning services in Coimbatore
            </span>
          </div>

          <h1 className="home-hero-title">
            5-star home cleaning at <span>fair local prices</span>
          </h1>

          <p className="home-hero-text">
            Instantly book trusted cleaners for your flat, villa, or office in
            Coimbatore. Deep cleaning, kitchen & bathroom focus, and move-in /
            move-out packages all from one simple platform.
          </p>

          <div className="home-hero-highlights">
            <div className="home-hero-highlight-pill">
              <span className="home-hero-highlight-dot" /> Top-rated local
              cleaners
            </div>
            <div className="home-hero-highlight-pill">
              <span className="home-hero-highlight-dot" /> Transparent, upfront
              pricing
            </div>
            <div className="home-hero-highlight-pill">
              <span className="home-hero-highlight-dot" /> Easy online booking
            </div>
          </div>

          <div className="home-hero-cta-row">
            <button className="home-hero-primary">Book a cleaning</button>
            <button className="home-hero-secondary">Apply as a cleaner</button>
          </div>

          <div className="home-hero-meta">
            <div className="home-hero-rating">
              <span className="home-hero-stars">★★★★★</span>
              <span>4.8/5 average rating</span>
            </div>
            <span>Trusted by families across Coimbatore</span>
          </div>
        </div>

        <div className="home-hero-right">
          <div className="home-hero-sidecard">
            <div className="home-hero-card-title">Quick quote preview</div>
            <p className="home-hero-card-subtitle">
              Intro hourly packages for your first clean in Coimbatore.
            </p>

            <div className="home-quick-rows">
              <div className="home-quick-row">
                <div className="home-quick-row-main">
                  <span className="home-quick-name">Quick Refresh</span>
                  <span className="home-quick-hours">
                    1 hour · Light tidy up
                  </span>
                </div>
                <div className="home-quick-price-tag">
                  <span className="home-quick-original">₹650</span>
                  <span className="home-quick-offer">₹450</span>
                </div>
              </div>

              <div className="home-quick-row">
                <div className="home-quick-row-main">
                  <span className="home-quick-name">Standard Clean</span>
                  <span className="home-quick-hours">
                    2 hours · Full 1BHK or focused deep clean
                  </span>
                </div>
                <div className="home-quick-price-tag">
                  <span className="home-quick-original">₹1,200</span>
                  <span className="home-quick-offer">₹849</span>
                </div>
              </div>

              <div className="home-quick-row">
                <div className="home-quick-row-main">
                  <span className="home-quick-name">Deep Clean</span>
                  <span className="home-quick-hours">
                    3 hours · 2BHK / kitchen + 2 bathrooms
                  </span>
                </div>
                <div className="home-quick-price-tag">
                  <span className="home-quick-original">₹1,600</span>
                  <span className="home-quick-offer">₹1,199</span>
                </div>
              </div>

              <div className="home-quick-row">
                <div className="home-quick-row-main">
                  <span className="home-quick-name">Extended Deep Clean</span>
                  <span className="home-quick-hours">
                    4 hours · Larger homes / move-in move-out
                  </span>
                </div>
                <div className="home-quick-price-tag">
                  <span className="home-quick-original">₹2,000</span>
                  <span className="home-quick-offer">₹1,499</span>
                </div>
              </div>
            </div>

            <div className="home-hero-card-footer">
              <span>
                <span className="home-hero-highlight-dot" /> No advance payment
                needed
              </span>
              <span>Reschedule easily if plans change</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="home-section">
        <h2 className="home-section-title">
          Book a top-rated cleaner in 3 easy steps
        </h2>
        <p className="home-section-subtitle">How HomeCare Pro works</p>

        <div className="home-steps-grid">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <div key={step.title} className="home-step-card">
              <div className="home-step-number">{index + 1}</div>
              <h3 className="home-step-title">{step.title}</h3>
              <p className="home-step-text">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular services */}
      <section className="home-section">
        <h2 className="home-section-title">
          Popular cleaning packages in Coimbatore
        </h2>
        <p className="home-section-subtitle">
          Choose a package that suits your home. You can always add extra
          services in the booking form.
        </p>

        <div className="home-services-grid">
          {POPULAR_SERVICES.map((service) => (
            <div key={service.name} className="home-service-card">
              {service.name.includes("Standard") && (
                <div className="home-service-pill">Most Popular</div>
              )}
              <h3 className="home-service-name">{service.name}</h3>
              <p className="home-service-highlight">{service.highlight}</p>
              <div className="home-service-meta">
                <span className="home-service-duration">
                  {service.duration}
                </span>
                <span className="home-service-price-tag">
                  <span className="home-service-price-original">
                    {service.originalPrice}
                  </span>
                  <span className="home-service-price-offer">
                    {service.offerPrice}
                  </span>
                </span>
              </div>
              <button className="home-service-button">Book this package</button>
            </div>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="home-section home-why">
        <h2 className="home-section-title">
          Why Coimbatore families choose HomeCare Pro
        </h2>

        <div className="home-why-grid">
          {WHY_CHOOSE_POINTS.map((item) => (
            <div key={item.title} className="home-why-card">
              <h3 className="home-why-title">{item.title}</h3>
              <p className="home-why-text">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Areas we serve */}
      <section className="home-section">
        <h2 className="home-section-title">Areas we serve in Coimbatore</h2>
        <p className="home-section-subtitle">
          We are gradually expanding coverage. If your area is not listed, you
          can still submit a booking request.
        </p>

        <div className="home-areas-list">
          {AREAS.map((area) => (
            <div key={area} className="home-area-pill">
              {area}
            </div>
          ))}
        </div>
      </section>

      {/* Cleaner CTA */}
      <section className="home-section home-cleaner-cta">
        <div className="home-cleaner-cta-inner">
          <div>
            <h2 className="home-section-title">
              Earn by cleaning homes in Coimbatore
            </h2>
            <p className="home-section-subtitle">
              Set your availability, get regular bookings, and receive payouts
              on time. Ideal for part-time and full-time cleaners.
            </p>
          </div>
          <button className="home-hero-primary-btn">Apply as a cleaner</button>
        </div>
      </section>
    </div>
  );
}
