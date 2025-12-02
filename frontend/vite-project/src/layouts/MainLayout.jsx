// src/layouts/MainLayout.jsx

import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

function MainLayout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        padding: "24px 16px",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        background: "linear-gradient(135deg, #f5f5f5, #e0f4ff)",
      }}
    >
      <Navbar />

      <main style={{ maxWidth: "960px", margin: "0 auto" }}>{children}</main>

      <Footer />
    </div>
  );
}

export default MainLayout;
