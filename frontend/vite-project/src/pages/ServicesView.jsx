import { Link } from "react-router-dom";
import { useState } from "react";
import "./Services.css";

const SERVICES = [
  {
    id: 1,
    icon: "⚡",
    name: "Quick Refresh",
    tagline: "Fast tidy-up for daily maintenance",
    duration: "1 hour",
    originalPrice: "₹650",
    price: "₹450",
    features: [
      "Light dusting of living areas",
      "Kitchen counter wipe-down",
      "1 bathroom cleaning",
      "Floor sweeping & mopping",
    ],
    popular: false,
  },
  {
    id: 2,
    icon: "🏠",
    name: "Standard Clean",
    tagline: "Perfect for 1-2 BHK apartments",
    duration: "2 hours",
    originalPrice: "₹1,200",
    price: "₹849",
    features: [
      "Complete 1-2 BHK cleaning",
      "Kitchen & appliances",
      "Bathroom deep scrub",
      "Dusting & floor mopping",
    ],
    popular: true,
  },
  {
    id: 3,
    icon: "✨",
    name: "Deep Clean",
    tagline: "Thorough cleaning for larger homes",
    duration: "3 hours",
    originalPrice: "₹1,600",
    price: "₹1,199",
    features: [
      "2-3 BHK complete cleaning",
      "Kitchen & 2 bathrooms",
      "Balcony cleaning included",
      "Detailed dusting & mopping",
    ],
    popular: false,
  },
  {
    id: 4,
    icon: "🍳",
    name: "Kitchen Deep Clean",
    tagline: "Remove grease, grime & oil stains",
    duration: "3-4 hours",
    originalPrice: null,
    price: "₹1,800",
    features: [
      "Chimney & exhaust fan cleaning",
      "Cabinet exterior cleaning",
      "Tile & grout deep scrub",
      "Appliance exterior polish",
    ],
    popular: false,
  },
  {
    id: 5,
    icon: "🚿",
    name: "Bathroom Deep Clean",
    tagline: "Tackle hard water stains & mold",
    duration: "1-2 hours",
    originalPrice: null,
    price: "₹800",
    features: [
      "Toilet & fixtures deep scrub",
      "Tile & grout cleaning",
      "Mirror & glass polishing",
      "Drain cleaning",
    ],
    popular: false,
  },
  {
    id: 6,
    icon: "🏢",
    name: "Office Cleaning",
    tagline: "Keep your workspace spotless",
    duration: "Custom",
    originalPrice: null,
    price: "From ₹600/hr",
    features: [
      "Desk & workstation cleaning",
      "Floor mopping & vacuuming",
      "Pantry & washroom cleaning",
      "Window & glass cleaning",
    ],
    popular: false,
  },
  {
    id: 7,
    icon: "🪟",
    name: "Window & Glass",
    tagline: "Crystal clear windows & balconies",
    duration: "2-3 hours",
    originalPrice: null,
    price: "₹1,200",
    features: [
      "All windows inside & outside",
      "Balcony glass panels",
      "Mirror & glass door cleaning",
      "Frame & sill wiping",
    ],
    popular: false,
  },
  {
    id: 8,
    icon: "🌀",
    name: "Move-in/Move-out",
    tagline: "Complete home sanitization",
    duration: "4-6 hours",
    originalPrice: null,
    price: "From ₹2,499",
    features: [
      "Empty home deep cleaning",
      "All rooms, kitchen, bathrooms",
      "Balcony & utility areas",
      "Cabinet & cupboard cleaning",
    ],
    popular: false,
  },
];

export default function ServicesView() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Services", icon: "🏠" },
    { id: "residential", name: "Residential", icon: "🏡" },
    { id: "specialized", name: "Specialized", icon: "✨" },
    { id: "commercial", name: "Commercial", icon: "🏢" },
  ];

  const getFilteredServices = () => {
    if (selectedCategory === "all") return SERVICES;
    if (selectedCategory === "residential") return SERVICES.slice(0, 3);
    if (selectedCategory === "specialized") return SERVICES.slice(3, 7);
    if (selectedCategory === "commercial") return [SERVICES[5]];
    return SERVICES;
  };

  return (
    <div className="services-page-new">
      {/* Animated Background */}
      <div className="services-bg-shapes">
        <div className="services-shape services-shape-1"></div>
        <div className="services-shape services-shape-2"></div>
      </div>

      {/* Hero Section */}
      <section className="services-hero">
        <div className="services-hero-content">
          <div className="services-hero-badge">
            <span className="services-badge-icon">✨</span>
            <span>Professional Cleaning Services</span>
          </div>
          <h1 className="services-hero-title">
            Transform your space with our
            <br />
            <span className="services-gradient">expert cleaning services</span>
          </h1>
          <p className="services-hero-desc">
            Professional home and office cleaning in Coimbatore. Choose from our
            range of flexible packages or customize your own cleaning plan.
          </p>
          <div className="services-hero-stats">
            <div className="services-stat">
              <div className="services-stat-number">8+</div>
              <div className="services-stat-label">Service types</div>
            </div>
            <div className="services-stat-divider"></div>
            <div className="services-stat">
              <div className="services-stat-number">₹450</div>
              <div className="services-stat-label">Starting price</div>
            </div>
            <div className="services-stat-divider"></div>
            <div className="services-stat">
              <div className="services-stat-number">2,500+</div>
              <div className="services-stat-label">Happy customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Experience Section */}
      <section className="services-experience-section">
        <div className="services-experience-content">
          <div className="services-experience-copy">
            <p className="services-eyebrow">Premium experience</p>
            <h2 className="services-experience-title">
              White-glove cleaning designed for busy homes and offices
            </h2>
            <p className="services-experience-desc">
              We combine vetted professionals, hospital-grade supplies, and live
              support to deliver a consistently delightful clean. Choose a plan,
              set your schedule, and we handle the rest.
            </p>
            <div className="services-experience-tags">
              <span className="services-experience-tag">Same-day slots</span>
              <span className="services-experience-tag">Supplies included</span>
              <span className="services-experience-tag">Real-time updates</span>
            </div>
          </div>

          <div className="services-experience-cards">
            <div className="services-experience-card">
              <div className="services-experience-icon">🧽</div>
              <h3 className="services-experience-heading">
                Deep-clean playbook
              </h3>
              <p className="services-experience-text">
                Structured checklists tailored to each room so nothing gets
                missed, from fans to floor edges.
              </p>
            </div>
            <div className="services-experience-card">
              <div className="services-experience-icon">🛡️</div>
              <h3 className="services-experience-heading">Trusted & insured</h3>
              <p className="services-experience-text">
                Background-checked cleaners, verified IDs, and damage protection
                for complete peace of mind.
              </p>
            </div>
            <div className="services-experience-card">
              <div className="services-experience-icon">⚡</div>
              <h3 className="services-experience-heading">Fast coordination</h3>
              <p className="services-experience-text">
                Lightning-fast scheduling and support on chat or call when you
                need to adjust your booking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="services-filter-section">
        <div className="services-filter-container">
          <h2 className="services-filter-title">Browse by category</h2>
          <div className="services-filter-tabs">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`services-filter-tab ${
                  selectedCategory === category.id ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="services-filter-icon">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid-section">
        <div className="services-grid-new">
          {getFilteredServices().map((service, index) => (
            <div
              key={service.id}
              className="service-card-new"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {service.popular && (
                <div className="service-card-badge">
                  <span>⭐</span> Most Popular
                </div>
              )}

              <div className="service-card-icon-wrapper">
                <div className="service-card-icon">{service.icon}</div>
              </div>

              <h3 className="service-card-title">{service.name}</h3>
              <p className="service-card-tagline">{service.tagline}</p>

              <div className="service-card-pricing">
                {service.originalPrice && (
                  <span className="service-card-price-old">
                    {service.originalPrice}
                  </span>
                )}
                <span className="service-card-price">{service.price}</span>
                <span className="service-card-duration">
                  {service.duration}
                </span>
              </div>

              <ul className="service-card-features">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="service-card-feature">
                    <span className="service-card-check">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link to="/book" className="service-card-btn">
                <span>Book this service</span>
                <span className="service-card-btn-arrow">→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="services-process-section">
        <h2 className="services-process-title">How our service works</h2>
        <p className="services-process-subtitle">
          Simple, transparent, and professional
        </p>
        <div className="services-process-timeline">
          <div className="services-process-step">
            <div className="services-process-number">1</div>
            <div className="services-process-content">
              <h3 className="services-process-heading">Choose Your Service</h3>
              <p className="services-process-text">
                Select from our range of cleaning packages that fit your needs
                and budget
              </p>
            </div>
          </div>
          <div className="services-process-connector"></div>
          <div className="services-process-step">
            <div className="services-process-number">2</div>
            <div className="services-process-content">
              <h3 className="services-process-heading">Schedule & Confirm</h3>
              <p className="services-process-text">
                Pick your preferred date and time, then confirm your booking
                instantly
              </p>
            </div>
          </div>
          <div className="services-process-connector"></div>
          <div className="services-process-step">
            <div className="services-process-number">3</div>
            <div className="services-process-content">
              <h3 className="services-process-heading">
                Professional Cleaning
              </h3>
              <p className="services-process-text">
                Our verified cleaners arrive on time with all necessary
                equipment
              </p>
            </div>
          </div>
          <div className="services-process-connector"></div>
          <div className="services-process-step">
            <div className="services-process-number">4</div>
            <div className="services-process-content">
              <h3 className="services-process-heading">
                Enjoy Your Clean Space
              </h3>
              <p className="services-process-text">
                Relax in your spotless home with 100% satisfaction guaranteed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="services-why-section">
        <h2 className="services-why-title">Why choose our services?</h2>
        <div className="services-why-grid">
          <div className="services-why-card">
            <div className="services-why-icon">⏱️</div>
            <h3 className="services-why-heading">Flexible Scheduling</h3>
            <p className="services-why-text">
              Book at your convenience with same-day and next-day availability
            </p>
          </div>
          <div className="services-why-card">
            <div className="services-why-icon">🔒</div>
            <h3 className="services-why-heading">Verified Cleaners</h3>
            <p className="services-why-text">
              All cleaners are background-checked and trained professionals
            </p>
          </div>
          <div className="services-why-card">
            <div className="services-why-icon">💰</div>
            <h3 className="services-why-heading">Transparent Pricing</h3>
            <p className="services-why-text">
              No hidden charges - see exact pricing before you book
            </p>
          </div>
          <div className="services-why-card">
            <div className="services-why-icon">⭐</div>
            <h3 className="services-why-heading">Quality Guaranteed</h3>
            <p className="services-why-text">
              100% satisfaction guarantee or we'll re-clean for free
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta-section">
        <div className="services-cta-content">
          <h2 className="services-cta-title">Ready to book your cleaning?</h2>
          <p className="services-cta-text">
            Get your home sparkling clean with our professional cleaners. Book
            now and enjoy special introductory pricing.
          </p>
          <Link to="/book" className="services-cta-btn">
            <span>Book a cleaning now</span>
            <span className="services-cta-arrow">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
