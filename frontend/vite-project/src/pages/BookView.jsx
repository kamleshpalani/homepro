import { useState } from "react";
import "./Book.css";

const SERVICES = [
  "1BHK Home Deep Cleaning",
  "2BHK Home Deep Cleaning",
  "3BHK Home Deep Cleaning",
  "Villa / Individual House Cleaning",
  "Kitchen & Chimney Deep Clean",
  "Bathroom Deep Cleaning",
  "Office / Shop Cleaning",
  "Sofa / Upholstery Cleaning",
  "Mattress Deep Cleaning",
  "Carpet / Rug Cleaning",
  "Fridge & Microwave Cleaning",
  "Move-in / Move-out Deep Cleaning",
  "Post-renovation Cleaning",
  "Regular Weekly / Bi-weekly Cleaning",
  "Only Bathroom Cleaning",
  "Only Kitchen Cleaning",
  "Glass & Window Cleaning",
  "Ceiling Fan & Cobweb Cleaning",
  "Floor Polishing / Scrubbing",
  "Car Interior Cleaning",
  "Garden / Outdoor Cleaning",
  "Others / Not listed",
];

const AREAS = [
  "RS Puram",
  "Saibaba Colony",
  "Gandhipuram",
  "Peelamedu",
  "Singanallur",
  "Saravanampatti",
  "Vadavalli",
  "Town Hall",
  "Ramanathapuram",
  "Race Course",
  "Ukkadam",
  "Koundampalayam",
  "Thudiyalur",
  "Ganapathy",
  "Sitra",
  "Kalapatti",
  "Ondipudur",
  "Podanur",
  "Madukkarai",
  "Kovaipudur",
  "Perur",
  "Kuniyamuthur",
  "Nava India",
  "Hope College",
  "Lakshmi Mills",
  "Rathinapuri",
  "Telungupalayam",
  "Periyanaickenpalayam",
  "Neelambur",
  "Eachanari",
  "Kurichi",
  "Sulur",
  "Chinniampalayam",
  "Cheran Ma Nagar",
  "Keeranatham",
  "Pappampatti",
  "Thondamuthur",
  "Veerakeralam",
  "Perks School Road",
  "Avinashi Road",
  "Trichy Road",
  "Mettupalayam Road",
  "Pollachi Road",
  "Sundarapuram",
  "P N Palayam",
  "Sivananda Colony",
  "Nanjundapuram",
  "Velandipalayam",
  "Ondipudur Pirivu",
  "Others / Not listed",
];

export default function BookView({
  form,
  message,
  onChange,
  onSubmit,
  hourPricing,
}) {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { num: 1, title: "Contact Info", icon: "👤" },
    { num: 2, title: "Service Details", icon: "🧹" },
    { num: 3, title: "Address", icon: "📍" },
    { num: 4, title: "Property Info", icon: "🏠" },
  ];

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="book-page-new">
      {/* Hero Section */}
      <section className="book-hero">
        <div className="book-hero-content">
          <div className="book-hero-badge">📅 Book Now</div>
          <h1 className="book-hero-title">
            Book your <span className="book-gradient">cleaning service</span>
          </h1>
          <p className="book-hero-desc">
            Fill in the details below and we'll match you with a verified cleaner in your area.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="book-form-section">
        <div className="book-form-container">
          {/* Progress Steps */}
          <div className="book-steps">
            {steps.map((step) => (
              <div
                key={step.num}
                className={`book-step ${
                  currentStep === step.num ? "book-step-active" : ""
                } ${currentStep > step.num ? "book-step-completed" : ""}`}
              >
                <div className="book-step-icon">{step.icon}</div>
                <div className="book-step-text">
                  <div className="book-step-number">Step {step.num}</div>
                  <div className="book-step-title">{step.title}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Success Message */}
          {message && <div className="book-message-success">{message}</div>}

          {/* Form */}
          <form className="book-form-new" onSubmit={onSubmit}>
            {/* Step 1: Contact Information */}
            {currentStep === 1 && (
              <div className="book-form-step">
                <h2 className="book-form-step-title">Contact Information</h2>
                <p className="book-form-step-desc">
                  Let us know how to reach you
                </p>

                <div className="book-form-grid">
                  <div className="book-field">
                    <label className="book-label">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={onChange}
                      className="book-input"
                      placeholder="Enter first name"
                      required
                    />
                  </div>

                  <div className="book-field">
                    <label className="book-label">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={onChange}
                      className="book-input"
                      placeholder="Enter last name"
                      required
                    />
                  </div>

                  <div className="book-field">
                    <label className="book-label">Mobile Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={onChange}
                      className="book-input"
                      placeholder="10-digit mobile number"
                      required
                    />
                  </div>

                  <div className="book-field">
                    <label className="book-label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      className="book-input"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="book-field">
                    <label className="book-label">Preferred Contact Method</label>
                    <select
                      name="preferredContactMethod"
                      value={form.preferredContactMethod}
                      onChange={onChange}
                      className="book-input"
                    >
                      <option value="whatsapp">WhatsApp</option>
                      <option value="call">Phone call</option>
                      <option value="sms">SMS</option>
                      <option value="email">Email</option>
                    </select>
                  </div>

                  <div className="book-field">
                    <label className="book-label">Best Time to Contact</label>
                    <select
                      name="preferredContactTime"
                      value={form.preferredContactTime}
                      onChange={onChange}
                      className="book-input"
                    >
                      <option value="">Any time</option>
                      <option value="8-10am">8 – 10 AM</option>
                      <option value="10am-12pm">10 AM – 12 PM</option>
                      <option value="12-2pm">12 – 2 PM</option>
                      <option value="2-4pm">2 – 4 PM</option>
                      <option value="4-6pm">4 – 6 PM</option>
                      <option value="6-8pm">6 – 8 PM</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Service Details */}
            {currentStep === 2 && (
              <div className="book-form-step">
                <h2 className="book-form-step-title">Service Details</h2>
                <p className="book-form-step-desc">
                  Choose the service you need
                </p>

                <div className="book-form-grid">
                  <div className="book-field book-field-full">
                    <label className="book-label">Service Required *</label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={onChange}
                      className="book-input"
                      required
                    >
                      <option value="">Select a service</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  {form.service === "Others / Not listed" && (
                    <div className="book-field book-field-full">
                      <label className="book-label">Describe Your Service *</label>
                      <input
                        type="text"
                        name="serviceOther"
                        value={form.serviceOther}
                        onChange={onChange}
                        className="book-input"
                        placeholder="e.g. only balcony cleaning, move-out cleaning"
                        required
                      />
                    </div>
                  )}

                  <div className="book-field">
                    <label className="book-label">Area in Coimbatore *</label>
                    <select
                      name="area"
                      value={form.area}
                      onChange={onChange}
                      className="book-input"
                      required
                    >
                      <option value="">Select your area</option>
                      {AREAS.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>

                  {form.area === "Others / Not listed" && (
                    <div className="book-field">
                      <label className="book-label">Specify Area *</label>
                      <input
                        type="text"
                        name="areaOther"
                        value={form.areaOther}
                        onChange={onChange}
                        className="book-input"
                        placeholder="Enter your locality"
                        required
                      />
                    </div>
                  )}

                  <div className="book-field">
                    <label className="book-label">Estimated Hours *</label>
                    <select
                      name="hours"
                      value={form.hours}
                      onChange={onChange}
                      className="book-input"
                      required
                    >
                      <option value={1}>
                        {hourPricing?.[1]?.label || "1 hour – Quick Refresh (₹650 → ₹450)"}
                      </option>
                      <option value={2}>
                        {hourPricing?.[2]?.label || "2 hours – Standard Clean (₹1,200 → ₹849)"}
                      </option>
                      <option value={3}>
                        {hourPricing?.[3]?.label || "3 hours – Deep Clean (₹1,600 → ₹1,199)"}
                      </option>
                      <option value={4}>
                        {hourPricing?.[4]?.label || "4 hours – Extended Deep Clean (₹2,000 → ₹1,499)"}
                      </option>
                    </select>
                    <div className="book-price-display">
                      Estimated Price: <strong>₹{form.estimatedPrice}</strong>
                    </div>
                  </div>

                  <div className="book-field">
                    <label className="book-label">Preferred Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={onChange}
                      className="book-input"
                      required
                    />
                  </div>

                  <div className="book-field">
                    <label className="book-label">Preferred Time Slot</label>
                    <select
                      name="timeSlot"
                      value={form.timeSlot}
                      onChange={onChange}
                      className="book-input"
                    >
                      <option value="">Any time</option>
                      <option value="8-10am">8 – 10 AM</option>
                      <option value="10am-12pm">10 AM – 12 PM</option>
                      <option value="12-2pm">12 – 2 PM</option>
                      <option value="2-4pm">2 – 4 PM</option>
                      <option value="4-6pm">4 – 6 PM</option>
                      <option value="6-8pm">6 – 8 PM</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Address */}
            {currentStep === 3 && (
              <div className="book-form-step">
                <h2 className="book-form-step-title">Service Address</h2>
                <p className="book-form-step-desc">
                  Where should we send the cleaner?
                </p>

                <div className="book-form-grid">
                  <div className="book-field book-field-full">
                    <label className="book-label">Address Line 1 *</label>
                    <input
                      type="text"
                      name="address1"
                      value={form.address1}
                      onChange={onChange}
                      className="book-input"
                      placeholder="Flat/house number and street name"
                      required
                    />
                  </div>

                  <div className="book-field book-field-full">
                    <label className="book-label">Address Line 2</label>
                    <input
                      type="text"
                      name="address2"
                      value={form.address2}
                      onChange={onChange}
                      className="book-input"
                      placeholder="Landmark or additional details (optional)"
                    />
                  </div>

                  <div className="book-field">
                    <label className="book-label">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      readOnly
                      className="book-input book-input-readonly"
                    />
                  </div>

                  <div className="book-field">
                    <label className="book-label">State *</label>
                    <select
                      name="state"
                      value={form.state}
                      onChange={onChange}
                      className="book-input"
                      required
                    >
                      <option value="">Select state</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                    </select>
                  </div>

                  <div className="book-field">
                    <label className="book-label">Country *</label>
                    <input
                      type="text"
                      name="country"
                      value={form.country}
                      onChange={onChange}
                      className="book-input"
                      required
                    />
                  </div>

                  <div className="book-field">
                    <label className="book-label">Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={form.pincode}
                      onChange={onChange}
                      className="book-input"
                      placeholder="e.g. 641001"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Property Information */}
            {currentStep === 4 && (
              <div className="book-form-step">
                <h2 className="book-form-step-title">Property Details</h2>
                <p className="book-form-step-desc">
                  Help us understand your space better
                </p>

                <div className="book-form-grid">
                  <div className="book-field">
                    <label className="book-label">Property Type</label>
                    <select
                      name="propertyType"
                      value={form.propertyType}
                      onChange={onChange}
                      className="book-input"
                    >
                      <option value="">Select type</option>
                      <option value="apartment">1BHK Apartment</option>
                      <option value="apartment-2bhk">2BHK Apartment</option>
                      <option value="apartment-3bhk">3BHK Apartment</option>
                      <option value="independent-house">Independent house / villa</option>
                      <option value="gated-community-villa">Gated community villa</option>
                      <option value="row-house">Row house / townhouse</option>
                      <option value="office">Office</option>
                      <option value="shop">Shop / showroom</option>
                      <option value="warehouse">Warehouse / godown</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {form.propertyType === "other" && (
                    <div className="book-field">
                      <label className="book-label">Specify Property Type *</label>
                      <input
                        type="text"
                        name="propertyTypeOther"
                        value={form.propertyTypeOther}
                        onChange={onChange}
                        className="book-input"
                        placeholder="e.g. PG, clinic, small warehouse"
                        required
                      />
                    </div>
                  )}

                  <div className="book-field">
                    <label className="book-label">Number of Floors</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      name="floorCount"
                      value={form.floorCount}
                      onChange={onChange}
                      className="book-input"
                      placeholder="e.g. 1, 2"
                    />
                  </div>

                  <div className="book-field">
                    <label className="book-label">Approx. Area (sq ft)</label>
                    <input
                      type="number"
                      min="100"
                      step="50"
                      name="approxAreaSqft"
                      value={form.approxAreaSqft}
                      onChange={onChange}
                      className="book-input"
                      placeholder="e.g. 800"
                    />
                  </div>

                  <div className="book-field">
                    <label className="book-label">Pets at Home?</label>
                    <select
                      name="petsAtHome"
                      value={form.petsAtHome}
                      onChange={onChange}
                      className="book-input"
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>

                  <div className="book-field book-field-full">
                    <label className="book-label">Additional Notes (Optional)</label>
                    <textarea
                      name="notes"
                      rows={4}
                      value={form.notes}
                      onChange={onChange}
                      className="book-input book-textarea"
                      placeholder="Any special instructions or requirements..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="book-form-nav">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="book-btn book-btn-secondary"
                >
                  ← Previous
                </button>
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="book-btn book-btn-primary"
                >
                  Next →
                </button>
              ) : (
                <button type="submit" className="book-btn book-btn-submit">
                  Submit Booking
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
