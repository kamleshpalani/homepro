import MainLayout from "../layouts/MainLayout.jsx";
import "./About.css";

export default function AboutView() {
  return (
    <MainLayout>
      <section className="about-section">
        <h1 className="about-title">About HomeCare Pro</h1>
        <p className="about-text">
          HomeCare Pro connects customers with trusted freelance home cleaners
          in Coimbatore. We focus on quality, safety, and transparent pricing.
        </p>
      </section>
    </MainLayout>
  );
}
