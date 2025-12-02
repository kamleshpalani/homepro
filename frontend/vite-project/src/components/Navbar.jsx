import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header
      style={{
        maxWidth: "960px",
        margin: "0 auto 24px auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Link
        to="/"
        style={{
          fontWeight: 700,
          fontSize: "20px",
          textDecoration: "none",
          color: "#111827",
        }}
      >
        HomeCare Pro
      </Link>

      <nav
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
          fontSize: "14px",
        }}
      >
        <Link
          to="/services"
          style={{ textDecoration: "none", color: "#111827" }}
        >
          Services
        </Link>
        <Link to="/about" style={{ textDecoration: "none", color: "#111827" }}>
          About
        </Link>
        <Link
          to="/contact"
          style={{ textDecoration: "none", color: "#111827" }}
        >
          Contact
        </Link>
        <Link
          to="/admin/bookings"
          style={{ textDecoration: "none", color: "#6b7280", fontSize: "12px" }}
        >
          Admin
        </Link>
        <Link
          to="/book"
          style={{
            padding: "6px 12px",
            borderRadius: "999px",
            backgroundColor: "#0f766e",
            color: "white",
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          Book Now
        </Link>

        <div
          style={{
            padding: "6px 12px",
            borderRadius: "999px",
            backgroundColor: "#e0f2fe",
            fontSize: "13px",
          }}
        >
          City: <strong>Coimbatore</strong>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
