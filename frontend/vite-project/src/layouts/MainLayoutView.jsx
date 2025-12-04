// src/layouts/MainLayoutView.jsx
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import "./MainLayout.css";

function MainLayoutView({ children }) {
  return (
    <div className="main-layout-root">
      {/* Top Bar with Navbar */}
      <div className="main-layout-topbar">
        <Navbar />
      </div>

      {/* Main Page Content */}
      <main className="main-layout-main">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default MainLayoutView;
