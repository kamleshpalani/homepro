// src/App.jsx
import MainLayout from "./layouts/MainLayout.jsx";

function App() {
  return (
    <MainLayout>
      {/* Hero section */}
      <section
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "24px 20px",
          boxShadow: "0 12px 30px rgba(15, 23, 42, 0.12)",
        }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "4px 10px",
            borderRadius: "999px",
            backgroundColor: "#dcfce7",
            fontSize: "12px",
            fontWeight: 500,
            marginBottom: "8px",
          }}
        >
          Launching in Coimbatore
        </span>

        <h1
          style={{
            margin: "0 0 8px 0",
            fontSize: "26px",
            lineHeight: 1.3,
          }}
        >
          Kovai HomeCare Pro – DEV TEST{" "}
          <span style={{ color: "#0f766e" }}>Coimbatore</span>.
        </h1>

        <p
          style={{
            margin: "0 0 16px 0",
            fontSize: "14px",
            color: "#4b5563",
            maxWidth: "520px",
          }}
        >
          From RS Puram to Singanallur – book verified freelance cleaners for
          your home, flat, or office. Transparent pricing, flexible slots, and
          support from a single platform.
        </p>

        {/* Simple buttons */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            style={{
              padding: "10px 18px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 600,
              backgroundColor: "#0f766e",
              color: "white",
            }}
          >
            View Services
          </button>

          <button
            style={{
              padding: "10px 18px",
              borderRadius: "999px",
              border: "1px solid #d1d5db",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
              backgroundColor: "white",
              color: "#374151",
            }}
          >
            Check Areas We Cover
          </button>
        </div>
      </section>

      {/* Areas section */}
      <section style={{ marginTop: "24px" }}>
        <h2
          style={{
            fontSize: "18px",
            marginBottom: "10px",
          }}
        >
          Areas we serve in Coimbatore
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
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
            <div
              key={area}
              style={{
                padding: "6px 12px",
                borderRadius: "999px",
                backgroundColor: "white",
                boxShadow: "0 2px 6px rgba(15, 23, 42, 0.06)",
                fontSize: "13px",
              }}
            >
              {area}
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}

export default App;
