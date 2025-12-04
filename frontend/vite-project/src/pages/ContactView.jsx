import MainLayout from "../layouts/MainLayout.jsx";
import "./Contact.css";

export default function ContactView() {
  return (
    <MainLayout>
      <section className="contact-section">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-text">Email: support@homecarepro.com</p>
        <p className="contact-text">WhatsApp: +91-90000-00000 (sample)</p>
      </section>
    </MainLayout>
  );
}
