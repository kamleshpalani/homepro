import "./Services.css";

const SERVICES = [
  {
    id: 1,
    name: "Quick Refresh (1 hour)",
    area: "Any Home / Office",
    idealFor: "Light touch-up of living room, 1 bathroom, and kitchen surfaces",
    duration: "~1 hour",
    price: "₹650  →  ₹450",
  },
  {
    id: 2,
    name: "Standard Clean (2 hours)",
    area: "1BHK / Small Homes",
    idealFor: "Regular cleaning for 1BHK or focused deep clean of key areas",
    duration: "~2 hours",
    price: "₹1,200  →  ₹849",
  },
  {
    id: 3,
    name: "Deep Clean (3 hours)",
    area: "Independent Houses",
    idealFor: "2BHK homes or full kitchen + 2 bathrooms",
    duration: "~3 hours",
    price: "₹1,600  →  ₹1,199",
  },
  {
    id: 4,
    name: "Kitchen & Chimney Deep Clean",
    area: "Any Home",
    idealFor: "Heavy oil / grease in kitchen & tiles",
    duration: "3–4 hours",
    price: "₹600 per cleaner hour",
  },
  {
    id: 5,
    name: "Bathroom Deep Cleaning",
    area: "Any Home",
    idealFor: "Hard water stains, tiles & fittings cleanup",
    duration: "1–2 hours per bathroom",
    price: "₹600 per cleaner hour",
  },
  {
    id: 6,
    name: "Office / Shop Cleaning",
    area: "Commercial Spaces",
    idealFor: "Small offices, showrooms & shops",
    duration: "Custom based on size",
    price: "₹600 per cleaner hour (estimate)",
  },
  {
    id: 7,
    name: "Glass & Window Cleaning",
    area: "Any Home / Office",
    idealFor: "Balconies, large windows, display glass",
    duration: "2–4 hours",
    price: "₹600 per cleaner hour",
  },
  {
    id: 8,
    name: "Ceiling Fan & Cobweb Cleaning",
    area: "Any Home",
    idealFor: "Removing cobwebs, cleaning ceiling fans",
    duration: "1–3 hours",
    price: "₹600 per cleaner hour",
  },
  {
    id: 9,
    name: "Floor Polishing / Scrubbing",
    area: "Apartments & Villas",
    idealFor: "Marble / tile floor restoration & shine",
    duration: "4–6 hours",
    price: "₹600 per cleaner hour",
  },
  {
    id: 10,
    name: "Car Interior Cleaning",
    area: "Parking / Garage",
    idealFor: "Full interior vacuum, seats & mat cleaning",
    duration: "2–3 hours",
    price: "₹600 per cleaner hour",
  },
  {
    id: 11,
    name: "Garden / Outdoor Cleaning",
    area: "Independent Houses & Villas",
    idealFor: "Portico, sit-out, and small garden areas",
    duration: "3–5 hours",
    price: "₹600 per cleaner hour",
  },
];

const CATEGORIES = [
  "All",
  "Home Deep Cleaning",
  "Kitchen & Bathroom",
  "Office & Shops",
  "Move-in / Move-out",
];

export default function ServicesView() {
  return (
    <>
      {/* Page title */}
      <section className="services-page-title-section">
        <h1 className="services-page-title">Cleaning services in Coimbatore</h1>
        <p className="services-page-subtitle">
          Book trusted freelance cleaners for your flat, villa, or office. All
          services are currently available in Coimbatore. Pricing shown is
          approximate and may vary slightly based on area and condition.
        </p>
      </section>

      {/* Category pills (visual only for now) */}
      <section className="services-categories">
        <div className="services-categories-list">
          {CATEGORIES.map((cat, index) => (
            <button
              key={cat}
              className={`services-category-pill ${
                index === 0
                  ? "services-category-pill--primary"
                  : "services-category-pill--secondary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Services grid */}
      <section>
        <div className="services-grid">
          {SERVICES.map((service) => (
            <article key={service.id} className="services-card">
              <h2 className="services-card-title">{service.name}</h2>

              <p className="services-card-text">
                <strong>Suitable for:</strong> {service.idealFor}
              </p>

              <p className="services-card-text-muted">
                <strong>Location type:</strong> {service.area}
              </p>

              <p className="services-card-text-muted">
                <strong>Approx. duration:</strong> {service.duration}
              </p>

              <div className="services-card-footer">
                <span className="services-card-price">{service.price}</span>

                <button className="services-card-button">View details</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
