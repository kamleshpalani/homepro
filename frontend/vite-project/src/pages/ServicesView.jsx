import "./Services.css";

const SERVICES = [
  {
    id: 1,
    name: "1BHK Home Deep Cleaning",
    area: "Flats / Apartments",
    idealFor: "Tenants moving in / out, yearly deep clean",
    duration: "4–5 hours",
    price: "₹2,499 onwards",
  },
  {
    id: 2,
    name: "2BHK Home Deep Cleaning",
    area: "Flats / Apartments",
    idealFor: "Families, festival cleaning, repaint prep",
    duration: "5–6 hours",
    price: "₹3,499 onwards",
  },
  {
    id: 3,
    name: "Villa / Individual House Cleaning",
    area: "Independent Houses",
    idealFor: "Ground + 1 floor homes, full property clean",
    duration: "6–8 hours",
    price: "₹4,999 onwards",
  },
  {
    id: 4,
    name: "Kitchen & Chimney Deep Clean",
    area: "Any Home",
    idealFor: "Heavy oil / grease in kitchen & tiles",
    duration: "3–4 hours",
    price: "₹1,799 onwards",
  },
  {
    id: 5,
    name: "Bathroom Deep Cleaning",
    area: "Any Home",
    idealFor: "Hard water stains, tiles & fittings cleanup",
    duration: "1–2 hours per bathroom",
    price: "₹599 per bathroom",
  },
  {
    id: 6,
    name: "Office / Shop Cleaning",
    area: "Commercial Spaces",
    idealFor: "Small offices, showrooms & shops",
    duration: "Custom based on size",
    price: "Custom quote",
  },
  {
    id: 7,
    name: "Glass & Window Cleaning",
    area: "Any Home / Office",
    idealFor: "Balconies, large windows, display glass",
    duration: "2–4 hours",
    price: "₹899 onwards",
  },
  {
    id: 8,
    name: "Ceiling Fan & Cobweb Cleaning",
    area: "Any Home",
    idealFor: "Removing cobwebs, cleaning ceiling fans",
    duration: "1–3 hours",
    price: "₹699 onwards",
  },
  {
    id: 9,
    name: "Floor Polishing / Scrubbing",
    area: "Apartments & Villas",
    idealFor: "Marble / tile floor restoration & shine",
    duration: "4–6 hours",
    price: "₹3,499 onwards",
  },
  {
    id: 10,
    name: "Car Interior Cleaning",
    area: "Parking / Garage",
    idealFor: "Full interior vacuum, seats & mat cleaning",
    duration: "2–3 hours",
    price: "₹1,499 onwards",
  },
  {
    id: 11,
    name: "Garden / Outdoor Cleaning",
    area: "Independent Houses & Villas",
    idealFor: "Portico, sit-out, and small garden areas",
    duration: "3–5 hours",
    price: "₹1,999 onwards",
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
