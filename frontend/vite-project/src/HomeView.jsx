import "./pages/Home.css";

export default function HomeView() {
  return (
    <>
      {/* Hero section */}
      <section className="home-hero">
        <span className="home-hero-badge">Launching in Coimbatore</span>

        <h1 className="home-hero-title">
          Kovai HomeCare Pro – DEV TEST <span>Coimbatore</span>.
        </h1>

        <p className="home-hero-text">
          From RS Puram to Singanallur – book verified freelance cleaners for
          your home, flat, or office. Transparent pricing, flexible slots, and
          support from a single platform.
        </p>

        {/* Simple buttons */}
        <div className="home-hero-actions">
          <button className="home-hero-primary-btn">View Services</button>

          <button className="home-hero-secondary-btn">
            Check Areas We Cover
          </button>
        </div>
      </section>

      {/* Areas section */}
      <section className="home-areas">
        <h2 className="home-areas-title">Areas we serve in Coimbatore</h2>

        <div className="home-areas-list">
          {[
            "RS Puram",
            "Saibaba Colony",
            "Gandhipuram",
            "Peelamedu",
            "Singanallur",
            "Saravanampatti",
            "Vadavalli",
            "Town Hall",
          ].map((area) => (
            <div key={area} className="home-area-pill">
              {area}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
