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

// Popular areas in Coimbatore (highlighted in UI)
const POPULAR_AREAS = [
  "RS Puram",
  "Saibaba Colony",
  "Gandhipuram",
  "Peelamedu",
  "Singanallur",
  "Saravanampatti",
  "Race Course",
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

  // Calculate filled fields percentage
  const calculateProgress = () => {
    const allFields = Object.entries(form);
    const filledFields = allFields.filter(([, value]) => {
      if (typeof value === "boolean") return true; // Checkboxes count as filled
      if (typeof value === "string") return value.trim() !== "";
      if (typeof value === "number") return true; // Numbers always count
      return value !== null && value !== undefined;
    });
    return Math.round((filledFields.length / allFields.length) * 100);
  };

  const progressPercentage = calculateProgress();

  return (
    <div className="book-page-new">
      {/* Animated Background */}
      <div className="book-bg">
        <div className="book-bg-shape-1"></div>
        <div className="book-bg-shape-2"></div>
        <div className="book-bg-shape-3"></div>
      </div>

      {/* Hero Section */}
      <section className="book-hero">
        <div className="book-hero-content">
          <div className="book-hero-badge">
            <div className="book-hero-badge-dot"></div>
            📅 Book Now
          </div>
          <h1 className="book-hero-title">
            Book your <span className="book-gradient">cleaning service</span>
          </h1>
          <p className="book-hero-desc">
            Fill in the details below and we'll match you with a verified
            cleaner in your area.
          </p>

          {/* Hero Stats */}
          <div className="book-hero-stats">
            <div className="book-stat">
              <div className="book-stat-value">500+</div>
              <div className="book-stat-label">Happy Customers</div>
            </div>
            <div className="book-stat-divider"></div>
            <div className="book-stat">
              <div className="book-stat-value">4.8★</div>
              <div className="book-stat-label">Average Rating</div>
            </div>
            <div className="book-stat-divider"></div>
            <div className="book-stat">
              <div className="book-stat-value">24hr</div>
              <div className="book-stat-label">Quick Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="book-form-section">
        {/* Progress Bar */}
        <div className="book-progress-section">
          <div className="book-progress-container">
            <div className="book-progress-label">
              <span className="book-progress-text">Progress</span>
              <span className="book-progress-percentage">
                {progressPercentage}%
              </span>
            </div>
            <div className="book-progress-bar">
              <div
                className="book-progress-fill"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

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
                {currentStep > step.num ? (
                  <div className="book-step-icon-wrapper">
                    <svg
                      className="book-step-checkmark"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                ) : (
                  <div className="book-step-icon">{step.icon}</div>
                )}
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
                    <label className="book-label">
                      Preferred Contact Method
                    </label>
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

                  <div className="book-field">
                    <label className="book-label">Quiet Hours</label>
                    <select
                      name="quietHours"
                      value={form.quietHours}
                      onChange={onChange}
                      className="book-input"
                    >
                      <option value="">None</option>
                      <option value="before-9am">Avoid before 9 AM</option>
                      <option value="after-8pm">Avoid after 8 PM</option>
                    </select>
                  </div>

                  <div className="book-field">
                    <label className="book-label">Onsite Contact Name</label>
                    <input
                      type="text"
                      name="onsiteContactName"
                      value={form.onsiteContactName}
                      onChange={onChange}
                      className="book-input"
                      placeholder="If different from booker"
                    />
                  </div>

                  <div className="book-field">
                    <label className="book-label">Onsite Contact Phone</label>
                    <input
                      type="tel"
                      name="onsiteContactPhone"
                      value={form.onsiteContactPhone}
                      onChange={onChange}
                      className="book-input"
                      placeholder="Alternate number on the day"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Service Details */}
            {currentStep === 2 && (
              <div className="book-form-step">
                <h2 className="book-form-step-title">Service Details</h2>
                <p className="book-form-step-desc">
                  Choose the service you need and specify your requirements
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
                      <label className="book-label">
                        Describe Your Service *
                      </label>
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

                  {/* Enhanced Fields for Coimbatore */}
                  <div className="book-field">
                    <label className="book-label">Number of Bedrooms</label>
                    <select
                      name="numBedrooms"
                      value={form.numBedrooms || ""}
                      onChange={onChange}
                      className="book-input"
                    >
                      <option value="">Select</option>
                      <option value="1">1 Bedroom</option>
                      <option value="2">2 Bedrooms</option>
                      <option value="3">3 Bedrooms</option>
                      <option value="4">4 Bedrooms</option>
                      <option value="5+">5+ Bedrooms</option>
                    </select>
                  </div>

                  <div className="book-field">
                    <label className="book-label">Number of Bathrooms</label>
                    <select
                      name="numBathrooms"
                      value={form.numBathrooms || ""}
                      onChange={onChange}
                      className="book-input"
                    >
                      <option value="">Select</option>
                      <option value="1">1 Bathroom</option>
                      <option value="2">2 Bathrooms</option>
                      <option value="3">3 Bathrooms</option>
                      <option value="4+">4+ Bathrooms</option>
                    </select>
                  </div>

                  <div className="book-field">
                    <label className="book-label">Service Frequency *</label>
                    <select
                      name="serviceFrequency"
                      value={form.serviceFrequency || "one-time"}
                      onChange={onChange}
                      className="book-input"
                      required
                    >
                      <option value="one-time">One-time Service</option>
                      <option value="weekly">Weekly (Every week)</option>
                      <option value="biweekly">
                        Bi-weekly (Every 2 weeks)
                      </option>
                      <option value="monthly">Monthly</option>
                    </select>
                    <p className="book-field-hint">
                      Regular bookings get 15% discount!
                    </p>
                  </div>

                  <div className="book-field">
                    <label className="book-label">Cleaning Materials *</label>
                    <select
                      name="cleaningMaterials"
                      value={form.cleaningMaterials || "cleaner-provides"}
                      onChange={onChange}
                      className="book-input"
                      required
                    >
                      <option value="cleaner-provides">
                        Cleaner brings materials (+₹100)
                      </option>
                      <option value="customer-provides">
                        I'll provide materials
                      </option>
                      <option value="both">Mix (discuss with cleaner)</option>
                    </select>
                  </div>

                  <div className="book-field book-field-full">
                    <label className="book-label">
                      Special Areas to Clean (Coimbatore homes)
                    </label>
                    <div className="book-checkbox-group">
                      <label className="book-checkbox-label">
                        <input
                          type="checkbox"
                          name="cleanBalcony"
                          checked={form.cleanBalcony || false}
                          onChange={(e) =>
                            onChange({
                              target: {
                                name: e.target.name,
                                value: e.target.checked,
                              },
                            })
                          }
                        />
                        <span>Balcony / Sit-out</span>
                      </label>
                      <label className="book-checkbox-label">
                        <input
                          type="checkbox"
                          name="cleanTerrace"
                          checked={form.cleanTerrace || false}
                          onChange={(e) =>
                            onChange({
                              target: {
                                name: e.target.name,
                                value: e.target.checked,
                              },
                            })
                          }
                        />
                        <span>Terrace / Rooftop</span>
                      </label>
                      <label className="book-checkbox-label">
                        <input
                          type="checkbox"
                          name="cleanStaircase"
                          checked={form.cleanStaircase || false}
                          onChange={(e) =>
                            onChange({
                              target: {
                                name: e.target.name,
                                value: e.target.checked,
                              },
                            })
                          }
                        />
                        <span>Staircase / Common areas</span>
                      </label>
                      <label className="book-checkbox-label">
                        <input
                          type="checkbox"
                          name="cleanParking"
                          checked={form.cleanParking || false}
                          onChange={(e) =>
                            onChange({
                              target: {
                                name: e.target.name,
                                value: e.target.checked,
                              },
                            })
                          }
                        />
                        <span>Parking area / Garage</span>
                      </label>
                    </div>
                  </div>

                  <div className="book-field">
                    <label className="book-label">Area in Coimbatore *</label>
                    <select
                      name="area"
                      value={form.area}
                      onChange={onChange}
                      className="book-input book-input-with-badge"
                      required
                    >
                      <option value="">Select your area</option>
                      <optgroup label="🌟 Popular Areas">
                        {POPULAR_AREAS.map((a) => (
                          <option key={a} value={a}>
                            {a} ⭐
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="All Areas">
                        {AREAS.filter((a) => !POPULAR_AREAS.includes(a)).map(
                          (a) => (
                            <option key={a} value={a}>
                              {a}
                            </option>
                          )
                        )}
                      </optgroup>
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
                        placeholder="Enter your locality in Coimbatore"
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
                        {hourPricing?.[1]?.label ||
                          "1 hour – Quick Refresh (₹650 → ₹450)"}
                      </option>
                      <option value={2}>
                        {hourPricing?.[2]?.label ||
                          "2 hours – Standard Clean (₹1,200 → ₹849)"}
                      </option>
                      <option value={3}>
                        {hourPricing?.[3]?.label ||
                          "3 hours – Deep Clean (₹1,600 → ₹1,199)"}
                      </option>
                      <option value={4}>
                        {hourPricing?.[4]?.label ||
                          "4 hours – Extended Deep Clean (₹2,000 → ₹1,499)"}
                      </option>
                      <option value={5}>
                        5 hours – Full Home Clean (₹2,400 → ₹1,799)
                      </option>
                      <option value={6}>
                        6+ hours – Complete Deep Clean (₹2,800 → ₹2,099)
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
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>

                  <div className="book-field">
                    <label className="book-label">Preferred Time Slot *</label>
                    <select
                      name="timeSlot"
                      value={form.timeSlot}
                      onChange={onChange}
                      className="book-input"
                      required
                    >
                      <option value="">Select time slot</option>
                      <option value="6-8am">
                        6 – 8 AM (Early bird special)
                      </option>
                      <option value="8-10am">8 – 10 AM</option>
                      <option value="10am-12pm">10 AM – 12 PM</option>
                      <option value="12-2pm">12 – 2 PM</option>
                      <option value="2-4pm">2 – 4 PM</option>
                      <option value="4-6pm">4 – 6 PM</option>
                      <option value="6-8pm">6 – 8 PM</option>
                    </select>
                  </div>

                  <div className="book-field">
                    <label className="book-label">Flexibility</label>
                    <select
                      name="flexibilityWindow"
                      value={form.flexibilityWindow}
                      onChange={onChange}
                      className="book-input"
                    >
                      <option value="">Exact slot only</option>
                      <option value="plus-minus-1hr">Flexible ±1 hour</option>
                      <option value="alternate-slot-ok">
                        Alternate nearby slot is okay
                      </option>
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

                  <div className="book-field book-field-full">
                    <label className="book-label">Access Instructions</label>
                    <textarea
                      name="accessInstructions"
                      rows={3}
                      value={form.accessInstructions}
                      onChange={onChange}
                      className="book-input book-textarea"
                      placeholder="Gate code, security name/number, parking notes"
                    />
                  </div>

                  <div className="book-field book-field-full">
                    <label className="book-label">Onsite Contact Notes</label>
                    <textarea
                      name="onsiteContactNotes"
                      rows={2}
                      value={form.onsiteContactNotes}
                      onChange={onChange}
                      className="book-input book-textarea"
                      placeholder="Any details to help reach the onsite contact"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Property & Cleaner Preferences */}
            {currentStep === 4 && (
              <div className="book-form-step">
                <h2 className="book-form-step-title">
                  Property & Cleaner Preferences
                </h2>
                <p className="book-form-step-desc">
                  Help us match you with the perfect cleaner for your Coimbatore
                  home
                </p>

                <div className="book-form-grid">
                  <div className="book-field">
                    <label className="book-label">Property Type *</label>
                    <select
                      name="propertyType"
                      value={form.propertyType}
                      onChange={onChange}
                      className="book-input"
                      required
                    >
                      <option value="">Select type</option>
                      <option value="apartment">1BHK Apartment</option>
                      <option value="apartment-2bhk">2BHK Apartment</option>
                      <option value="apartment-3bhk">3BHK Apartment</option>
                      <option value="apartment-4bhk">4BHK+ Apartment</option>
                      <option value="independent-house">
                        Independent house / villa
                      </option>
                      <option value="gated-community-villa">
                        Gated community villa
                      </option>
                      <option value="duplex">Duplex / Penthouse</option>
                      <option value="row-house">Row house / townhouse</option>
                      <option value="office">Office</option>
                      <option value="shop">Shop / showroom</option>
                      <option value="warehouse">Warehouse / godown</option>
                      <option value="pg-hostel">PG / Hostel</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {form.propertyType === "other" && (
                    <div className="book-field">
                      <label className="book-label">
                        Specify Property Type *
                      </label>
                      <input
                        type="text"
                        name="propertyTypeOther"
                        value={form.propertyTypeOther}
                        onChange={onChange}
                        className="book-input"
                        placeholder="e.g. clinic, small warehouse, studio"
                        required
                      />
                    </div>
                  )}

                  <div className="book-field">
                    <label className="book-label">Number of Floors</label>
                    <select
                      name="floorCount"
                      value={form.floorCount || ""}
                      onChange={onChange}
                      className="book-input"
                    >
                      <option value="">Select</option>
                      <option value="1">Ground floor / 1 floor</option>
                      <option value="2">2 floors</option>
                      <option value="3">3 floors</option>
                      <option value="4+">4+ floors</option>
                    </select>
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
                      placeholder="e.g. 800, 1200, 2000"
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
                      <option value="no">No pets</option>
                      <option value="yes-dogs">Yes, Dogs</option>
                      <option value="yes-cats">Yes, Cats</option>
                      <option value="yes-both">Yes, Dogs & Cats</option>
                      <option value="yes-other">Yes, Other pets</option>
                    </select>
                  </div>

                  <div className="book-field">
                    <label className="book-label">Property Access</label>
                    <select
                      name="propertyAccess"
                      value={form.propertyAccess || "customer-present"}
                      onChange={onChange}
                      className="book-input"
                    >
                      <option value="customer-present">I'll be present</option>
                      <option value="spare-key">Spare key available</option>
                      <option value="security-available">
                        Through security
                      </option>
                      <option value="family-present">
                        Family member present
                      </option>
                    </select>
                  </div>

                  <div className="book-field">
                    <label className="book-label">Elevator Available?</label>
                    <select
                      name="elevatorAvailable"
                      value={form.elevatorAvailable}
                      onChange={onChange}
                      className="book-input"
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>

                  <div className="book-field">
                    <label className="book-label">Parking Availability</label>
                    <select
                      name="parkingAvailability"
                      value={form.parkingAvailability}
                      onChange={onChange}
                      className="book-input"
                    >
                      <option value="">Select</option>
                      <option value="onsite">On-site parking</option>
                      <option value="street">Street parking</option>
                      <option value="paid">Paid parking nearby</option>
                      <option value="none">No parking</option>
                    </select>
                  </div>

                  {/* Cleaner Preferences */}
                  <div className="book-field book-field-full">
                    <h3 className="book-subsection-title">
                      🧹 Cleaner Preferences
                    </h3>
                  </div>

                  <div className="book-field">
                    <label className="book-label">
                      Cleaner Gender Preference
                    </label>
                    <select
                      name="cleanerGenderPreference"
                      value={form.cleanerGenderPreference || "no-preference"}
                      onChange={onChange}
                      className="book-input"
                    >
                      <option value="no-preference">No preference</option>
                      <option value="female">Female cleaner</option>
                      <option value="male">Male cleaner</option>
                    </select>
                  </div>

                  <div className="book-field">
                    <label className="book-label">Experience Level</label>
                    <select
                      name="cleanerExperiencePreference"
                      value={form.cleanerExperiencePreference || "any"}
                      onChange={onChange}
                      className="book-input"
                    >
                      <option value="any">Any experience level</option>
                      <option value="experienced">
                        Experienced (3+ years)
                      </option>
                      <option value="very-experienced">
                        Highly experienced (5+ years)
                      </option>
                    </select>
                  </div>

                  <div className="book-field book-field-full">
                    <label className="book-label">Language Preference</label>
                    <div className="book-checkbox-group">
                      <label className="book-checkbox-label">
                        <input
                          type="checkbox"
                          name="languageTamil"
                          checked={form.languageTamil || false}
                          onChange={(e) =>
                            onChange({
                              target: {
                                name: e.target.name,
                                value: e.target.checked,
                              },
                            })
                          }
                        />
                        <span>Tamil</span>
                      </label>
                      <label className="book-checkbox-label">
                        <input
                          type="checkbox"
                          name="languageEnglish"
                          checked={form.languageEnglish || false}
                          onChange={(e) =>
                            onChange({
                              target: {
                                name: e.target.name,
                                value: e.target.checked,
                              },
                            })
                          }
                        />
                        <span>English</span>
                      </label>
                      <label className="book-checkbox-label">
                        <input
                          type="checkbox"
                          name="languageHindi"
                          checked={form.languageHindi || false}
                          onChange={(e) =>
                            onChange({
                              target: {
                                name: e.target.name,
                                value: e.target.checked,
                              },
                            })
                          }
                        />
                        <span>Hindi</span>
                      </label>
                      <label className="book-checkbox-label">
                        <input
                          type="checkbox"
                          name="languageMalayalam"
                          checked={form.languageMalayalam || false}
                          onChange={(e) =>
                            onChange({
                              target: {
                                name: e.target.name,
                                value: e.target.checked,
                              },
                            })
                          }
                        />
                        <span>Malayalam</span>
                      </label>
                    </div>
                  </div>

                  <div className="book-field">
                    <label className="book-label">Budget Range</label>
                    <select
                      name="budgetRange"
                      value={form.budgetRange}
                      onChange={onChange}
                      className="book-input"
                    >
                      <option value="">Flexible</option>
                      <option value="economy">Economy</option>
                      <option value="standard">Standard</option>
                      <option value="premium">Premium</option>
                    </select>
                  </div>

                  <div className="book-field">
                    <label className="book-label">
                      Power / Water Constraints
                    </label>
                    <textarea
                      name="powerWaterConstraints"
                      rows={2}
                      value={form.powerWaterConstraints}
                      onChange={onChange}
                      className="book-input book-textarea"
                      placeholder="Low pressure after 5 PM, water tanker timing, etc."
                    />
                  </div>

                  <div className="book-field">
                    <label className="book-label">Do-Not-Clean Areas</label>
                    <textarea
                      name="doNotCleanAreas"
                      rows={2}
                      value={form.doNotCleanAreas}
                      onChange={onChange}
                      className="book-input book-textarea"
                      placeholder="Rooms or items to avoid"
                    />
                  </div>

                  <div className="book-field book-field-full">
                    <label className="book-checkbox-label book-checkbox-inline">
                      <input
                        type="checkbox"
                        name="postServiceProof"
                        checked={form.postServiceProof || false}
                        onChange={(e) =>
                          onChange({
                            target: {
                              name: e.target.name,
                              value: e.target.checked,
                            },
                          })
                        }
                      />
                      <span>Require post-service photo proof</span>
                    </label>
                  </div>

                  <div className="book-field book-field-full">
                    <label className="book-label">
                      Special Instructions / Requirements
                    </label>
                    <textarea
                      name="notes"
                      rows={4}
                      value={form.notes}
                      onChange={onChange}
                      className="book-input book-textarea"
                      placeholder="Any specific requirements for your Coimbatore property? E.g., 'Need cleaner to bring vacuum', 'Avoid using strong chemicals', 'Parking available inside', etc."
                    />
                  </div>

                  <div className="book-field book-field-full">
                    <div className="book-info-box">
                      <strong>📍 Serving Coimbatore:</strong> Our verified
                      cleaners are available across all areas in Coimbatore. We
                      ensure background-verified, trained professionals for your
                      home.
                    </div>
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
