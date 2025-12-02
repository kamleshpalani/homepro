import MainLayout from "../layouts/MainLayout.jsx";

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
];

const CATEGORIES = [
  "All",
  "Home Deep Cleaning",
  "Kitchen & Bathroom",
  "Office & Shops",
  "Move-in / Move-out",
];

function Services() {
  return (
    <MainLayout>
      {/* Page title */}
      <section style={{ marginBottom: "20px" }}>
        <h1
          style={{
            fontSize: "24px",
            marginBottom: "6px",
          }}
        >
          Cleaning services in Coimbatore
        </h1>
        <p
          style={{
            fontSize: "14px",
            color: "#4b5563",
            maxWidth: "620px",
          }}
        >
          Book trusted freelance cleaners for your flat, villa, or office. All
          services are currently available in Coimbatore. Pricing shown is
          approximate and may vary slightly based on area and condition.
        </p>
      </section>

      {/* Category pills (visual only for now) */}
      <section style={{ marginBottom: "18px" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          {CATEGORIES.map((cat, index) => (
            <button
              key={cat}
              style={{
                padding: "6px 12px",
                borderRadius: "999px",
                border: index === 0 ? "none" : "1px solid #d1d5db",
                backgroundColor: index === 0 ? "#0f766e" : "white",
                color: index === 0 ? "white" : "#111827",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Services grid */}
      <section>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "16px",
          }}
        >
          {SERVICES.map((service) => (
            <article
              key={service.id}
              style={{
                backgroundColor: "white",
                borderRadius: "14px",
                padding: "16px",
                boxShadow: "0 8px 20px rgba(15, 23, 42, 0.08)",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <h2
                style={{
                  fontSize: "16px",
                  margin: 0,
                }}
              >
                {service.name}
              </h2>

              <p
                style={{
                  margin: 0,
                  fontSize: "13px",
                  color: "#4b5563",
                }}
              >
                <strong>Suitable for:</strong> {service.idealFor}
              </p>

              <p
                style={{
                  margin: 0,
                  fontSize: "13px",
                  color: "#6b7280",
                }}
              >
                <strong>Location type:</strong> {service.area}
              </p>

              <p
                style={{
                  margin: 0,
                  fontSize: "13px",
                  color: "#6b7280",
                }}
              >
                <strong>Approx. duration:</strong> {service.duration}
              </p>

              <div
                style={{
                  marginTop: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: "14px",
                    color: "#065f46",
                  }}
                >
                  {service.price}
                </span>

                <button
                  style={{
                    padding: "6px 12px",
                    borderRadius: "999px",
                    border: "none",
                    backgroundColor: "#0f766e",
                    color: "white",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  View details
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}

export default Services;
