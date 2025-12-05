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
  return (
    <section className="book-section">
      <h1 className="book-title">Book a cleaning in Coimbatore</h1>
      <p className="book-subtitle">
        Share your details and preferred service. We&apos;ll match you with a
        verified cleaner in your area.
      </p>

      <form onSubmit={onSubmit} className="book-form">
        {/* First name */}
        <div className="book-form-field-half">
          <label className="book-label">
            First Name <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={onChange}
            className="book-input"
          />
        </div>

        {/* Last name */}
        <div className="book-form-field-half-right">
          <label className="book-label">
            Last Name <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={onChange}
            className="book-input"
          />
        </div>

        {/* Phone */}
        <div className="book-form-field-half">
          <label className="book-label">
            Mobile Number <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={onChange}
            className="book-input"
          />
        </div>

        {/* Email */}
        <div className="book-form-field-half-right">
          <label className="book-label">
            Email address <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            className="book-input"
            placeholder="We'll send booking details here"
            required
          />
        </div>

        {/* Preferred contact method & time */}
        <div className="book-form-field-half">
          <label className="book-label">Preferred method of contact</label>
          <select
            name="preferredContactMethod"
            value={form.preferredContactMethod}
            onChange={onChange}
            className="book-select"
          >
            <option value="whatsapp">WhatsApp</option>
            <option value="call">Phone call</option>
            <option value="sms">SMS</option>
            <option value="email">Email</option>
          </select>
        </div>

        <div className="book-form-field-half-right">
          <label className="book-label">Preferred time to contact</label>
          <select
            name="preferredContactTime"
            value={form.preferredContactTime}
            onChange={onChange}
            className="book-select"
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

        {/* Area */}
        <div className="book-form-field-half">
          <label className="book-label">
            Area / Locality in Coimbatore{" "}
            <span style={{ color: "red" }}>*</span>
          </label>
          <select
            name="area"
            value={form.area}
            onChange={onChange}
            className="book-select"
          >
            <option value="">Select area</option>
            {AREAS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        {form.area === "Others / Not listed" && (
          <div className="book-form-field-half">
            <label className="book-label">
              Enter your exact area / landmark{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="areaOther"
              value={form.areaOther}
              onChange={onChange}
              className="book-input"
              placeholder="Type your locality or nearest landmark"
            />
          </div>
        )}

        {/* Service */}
        <div className="book-form-field-half-right">
          <label className="book-label">
            Service required <span style={{ color: "red" }}>*</span>
          </label>
          <select
            name="service"
            value={form.service}
            onChange={onChange}
            className="book-select"
          >
            <option value="">Select service</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {form.service === "Others / Not listed" && (
          <div className="book-form-field-half-right">
            <label className="book-label">
              Describe the type of service required{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="serviceOther"
              value={form.serviceOther}
              onChange={onChange}
              className="book-input"
              placeholder="e.g. only balcony cleaning, move-out cleaning, etc."
            />
          </div>
        )}

        {/* Hours & estimated price */}
        <div className="book-form-field-half">
          <label className="book-label">
            Estimated cleaning hours <span style={{ color: "red" }}>*</span>
          </label>
          <select
            name="hours"
            value={form.hours}
            onChange={onChange}
            className="book-select"
            required
          >
            {/* Use labels from hourPricing if provided, otherwise fallback strings */}
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
          </select>

          <div className="book-price-hint">
            Estimated price: <strong>₹{form.estimatedPrice}</strong>{" "}
            (introductory offer)
          </div>
        </div>

        {/* Date */}
        <div className="book-form-field-half">
          <label className="book-label">
            Preferred Date <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={onChange}
            className="book-input"
          />
        </div>

        {/* Time slot */}
        <div className="book-form-field-half-right">
          <label className="book-label">Preferred Time Slot</label>
          <select
            name="timeSlot"
            value={form.timeSlot}
            onChange={onChange}
            className="book-select"
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

        {/* Address: line 1, line 2, city, state, country */}
        <div className="book-form-field-half">
          <label className="book-label">Address line 1 *</label>
          <input
            type="text"
            name="address1"
            value={form.address1}
            onChange={onChange}
            className="book-input"
            placeholder="Flat / house number and street name"
          />
        </div>

        <div className="book-form-field-half-right">
          <label className="book-label">Address line 2</label>
          <input
            type="text"
            name="address2"
            value={form.address2}
            onChange={onChange}
            className="book-input"
            placeholder="Area, landmark, or additional details (optional)"
          />
        </div>

        <div className="book-form-field-half">
          <label className="book-label">City *</label>
          <input
            type="text"
            name="city"
            value={form.city}
            readOnly
            className="book-input"
          />
        </div>

        <div className="book-form-field-half">
          <label className="book-label">State *</label>
          <select
            name="state"
            value={form.state}
            onChange={onChange}
            className="book-select"
          >
            <option value="">Select state</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
          </select>
        </div>

        <div className="book-form-field-half">
          <label className="book-label">Country *</label>
          <input
            type="text"
            name="country"
            value={form.country}
            onChange={onChange}
            className="book-input"
          />
        </div>

        <div className="book-form-field-half">
          <label className="book-label">Pincode *</label>
          <input
            type="text"
            name="pincode"
            value={form.pincode}
            onChange={onChange}
            className="book-input"
            placeholder="e.g. 641001"
          />
        </div>

        {/* Property details */}
        <div className="book-form-field-half">
          <label className="book-label">Property type</label>
          <select
            name="propertyType"
            value={form.propertyType}
            onChange={onChange}
            className="book-select"
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
          <div className="book-form-field-half">
            <label className="book-label">
              Tell us more about the property *
            </label>
            <input
              type="text"
              name="propertyTypeOther"
              value={form.propertyTypeOther}
              onChange={onChange}
              className="book-input"
              placeholder="e.g. PG, small warehouse, clinic, etc."
            />
          </div>
        )}

        <div className="book-form-field-half">
          <label className="book-label">No. of floors</label>
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

        <div className="book-form-field-half">
          <label className="book-label">Approx. area (sq ft)</label>
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

        <div className="book-form-field-half">
          <label className="book-label">Pets at home?</label>
          <select
            name="petsAtHome"
            value={form.petsAtHome}
            onChange={onChange}
            className="book-select"
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        {/* Notes – full width */}
        <div className="book-form-field-full">
          <label className="book-label">Additional details (optional)</label>
          <textarea
            name="notes"
            rows={3}
            value={form.notes}
            onChange={onChange}
            className="book-textarea"
          />
        </div>

        {/* Submit button – full width */}
        <div className="book-submit-wrapper">
          <button type="submit" className="book-submit-button">
            Submit Booking Request
          </button>
        </div>
      </form>

      {message && <p className="book-message">{message}</p>}
    </section>
  );
}
