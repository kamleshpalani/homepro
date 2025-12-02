// src/components/Footer.jsx

function Footer() {
  return (
    <footer
      style={{
        maxWidth: "960px",
        margin: "32px auto 0 auto",
        fontSize: "12px",
        color: "#6b7280",
        textAlign: "center",
      }}
    >
      © {new Date().getFullYear()} HomeCare Pro. Launching first in Coimbatore.
    </footer>
  );
}

export default Footer;
