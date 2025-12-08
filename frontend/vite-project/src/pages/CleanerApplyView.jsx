import "./CleanerApply.css";

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

export default function CleanerApplyView({
  form,
  message,
  error,
  submitting,
  onChange,
  onSubmit,
}) {
  return (
    <div className="cleaner-apply-page-new">
      {/* Hero Section */}
      <section className="cleaner-apply-hero">
        <div className="cleaner-apply-hero-content">
          <div className="cleaner-apply-hero-badge">💼 Join Our Team</div>
          <h1 className="cleaner-apply-hero-title">
            Become a <span className="cleaner-apply-gradient">verified cleaner</span>
          </h1>
          <p className="cleaner-apply-hero-desc">
            Join our network of professional cleaners in Coimbatore. Flexible work hours, fair pay, and consistent opportunities.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="cleaner-apply-benefits">
        <div className="cleaner-apply-benefits-grid">
          <div className="cleaner-apply-benefit-card">
            <div className="cleaner-apply-benefit-icon">💰</div>
            <h3 className="cleaner-apply-benefit-title">Competitive Pay</h3>
            <p className="cleaner-apply-benefit-text">Earn fair wages with timely payments</p>
          </div>
          <div className="cleaner-apply-benefit-card">
            <div className="cleaner-apply-benefit-icon">⏰</div>
            <h3 className="cleaner-apply-benefit-title">Flexible Hours</h3>
            <p className="cleaner-apply-benefit-text">Choose your own working schedule</p>
          </div>
          <div className="cleaner-apply-benefit-card">
            <div className="cleaner-apply-benefit-icon">🎯</div>
            <h3 className="cleaner-apply-benefit-title">Regular Work</h3>
            <p className="cleaner-apply-benefit-text">Get consistent cleaning assignments</p>
          </div>
          <div className="cleaner-apply-benefit-card">
            <div className="cleaner-apply-benefit-icon">🤝</div>
            <h3 className="cleaner-apply-benefit-title">Full Support</h3>
            <p className="cleaner-apply-benefit-text">Our team is here to help you succeed</p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="cleaner-apply-form-section">
        <div className="cleaner-apply-form-container">
          <div className="cleaner-apply-form-header">
            <h2 className="cleaner-apply-form-title">Application Form</h2>
            <p className="cleaner-apply-form-desc">
              Fill out the details below. We'll verify your information and get back to you soon.
            </p>
          </div>

          {message && <div className="cleaner-apply-message-success">{message}</div>}
          {error && <div className="cleaner-apply-message-error">{error}</div>}

          <form className="cleaner-apply-form-new" onSubmit={onSubmit}>
            {/* Personal Information */}
            <div className="cleaner-apply-section-title">Personal Information</div>

            <div className="cleaner-apply-form-row">
              <div className="cleaner-apply-field">
                <label className="cleaner-apply-label">First name *</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={onChange}
                  required
                  className="cleaner-apply-input"
                  placeholder="Enter first name"
                />
              </div>

              <div className="cleaner-apply-field">
                <label className="cleaner-apply-label">Last name *</label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={onChange}
                  required
                  className="cleaner-apply-input"
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="cleaner-apply-form-row">
              <div className="cleaner-apply-field">
                <label className="cleaner-apply-label">Mobile Number *</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  required
                  className="cleaner-apply-input"
                  placeholder="e.g. 9876543210"
                />
              </div>

              <div className="cleaner-apply-field">
                <label className="cleaner-apply-label">Email address *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  className="cleaner-apply-input"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div className="cleaner-apply-section-title">Location Details</div>

            <div className="cleaner-apply-form-row">
              <div className="cleaner-apply-field">
                <label className="cleaner-apply-label">Area *</label>
                <select
                  name="area"
                  value={form.area}
                  onChange={onChange}
                  required
                  className="cleaner-apply-input"
                >
                  <option value="">Select your area</option>
                  {AREAS.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              <div className="cleaner-apply-field">
                <label className="cleaner-apply-label">City *</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={onChange}
                  className="cleaner-apply-input"
                  placeholder="e.g. Coimbatore"
                  required
                />
              </div>
            </div>

            {form.area === "Others / Not listed" && (
              <div className="cleaner-apply-field">
                <label className="cleaner-apply-label">Enter your exact area *</label>
                <input
                  name="areaOther"
                  value={form.areaOther}
                  onChange={onChange}
                  required
                  className="cleaner-apply-input"
                  placeholder="Type your locality or nearest landmark"
                />
              </div>
            )}

            <div className="cleaner-apply-field">
              <label className="cleaner-apply-label">Address line 1 *</label>
              <input
                name="address1"
                value={form.address1}
                onChange={onChange}
                required
                className="cleaner-apply-input"
                placeholder="Flat / house number and street name"
              />
            </div>

            <div className="cleaner-apply-form-row">
              <div className="cleaner-apply-field">
                <label className="cleaner-apply-label">State</label>
                <input
                  name="state"
                  value={form.state}
                  onChange={onChange}
                  className="cleaner-apply-input"
                  placeholder="e.g. Tamil Nadu"
                />
              </div>

              <div className="cleaner-apply-field">
                <label className="cleaner-apply-label">Pincode</label>
                <input
                  name="pincode"
                  value={form.pincode}
                  onChange={onChange}
                  className="cleaner-apply-input"
                  placeholder="e.g. 641002"
                />
              </div>
            </div>

            {/* Work Details */}
            <div className="cleaner-apply-section-title">Work Preferences</div>

            <div className="cleaner-apply-form-row">
              <div className="cleaner-apply-field">
                <label className="cleaner-apply-label">Years of experience</label>
                <input
                  name="experienceYears"
                  value={form.experienceYears}
                  onChange={onChange}
                  className="cleaner-apply-input"
                  placeholder="e.g. 2 years"
                />
              </div>

              <div className="cleaner-apply-field">
                <label className="cleaner-apply-label">Expected salary per hour *</label>
                <input
                  name="expectedSalaryPerJob"
                  value={form.expectedSalaryPerJob}
                  onChange={onChange}
                  className="cleaner-apply-input"
                  placeholder="e.g. ₹200 per hour"
                  required
                />
              </div>
            </div>

            <div className="cleaner-apply-form-row">
              <div className="cleaner-apply-field">
                <label className="cleaner-apply-label">Type of work *</label>
                <select
                  name="typeOfWork"
                  value={form.typeOfWork}
                  onChange={onChange}
                  className="cleaner-apply-input"
                  required
                >
                  <option value="">Select type</option>
                  <option value="full-time">Full time</option>
                  <option value="part-time">Part time</option>
                  <option value="freelance">Freelance</option>
                  <option value="any">Any</option>
                </select>
              </div>

              <div className="cleaner-apply-field">
                <label className="cleaner-apply-label">Preferred contact method</label>
                <select
                  name="preferredContactMethod"
                  value={form.preferredContactMethod}
                  onChange={onChange}
                  className="cleaner-apply-input"
                >
                  <option value="whatsapp">WhatsApp</option>
                  <option value="call">Phone call</option>
                  <option value="sms">SMS</option>
                  <option value="email">Email</option>
                </select>
              </div>
            </div>

            <div className="cleaner-apply-form-row">
              <div className="cleaner-apply-field">
                <label className="cleaner-apply-label">Services you can offer *</label>
                <select
                  name="servicesOffered"
                  value={form.servicesOffered}
                  onChange={onChange}
                  className="cleaner-apply-input"
                  required
                >
                  <option value="">Select service</option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="cleaner-apply-field">
                <label className="cleaner-apply-label">Languages known</label>
                <input
                  name="languagesKnown"
                  value={form.languagesKnown}
                  onChange={onChange}
                  className="cleaner-apply-input"
                  placeholder="e.g. Tamil, English, Hindi"
                />
              </div>
            </div>

            {/* ID Proof */}
            <div className="cleaner-apply-section-title">Identity Verification</div>

            <div className="cleaner-apply-form-row">
              <div className="cleaner-apply-field">
                <label className="cleaner-apply-label">ID proof type *</label>
                <select
                  name="idProofType"
                  value={form.idProofType}
                  onChange={onChange}
                  required
                  className="cleaner-apply-input"
                >
                  <option value="">Select ID type</option>
                  <option value="aadhaar">Aadhaar Card</option>
                  <option value="pan">PAN Card</option>
                  <option value="voter">Voter ID</option>
                  <option value="passport">Passport</option>
                  <option value="other">Other government ID</option>
                </select>
              </div>

              <div className="cleaner-apply-field">
                <label className="cleaner-apply-label">ID proof number *</label>
                <input
                  name="idProofNumber"
                  value={form.idProofNumber}
                  onChange={onChange}
                  required
                  className="cleaner-apply-input"
                  placeholder="Enter ID number"
                />
              </div>
            </div>

            <div className="cleaner-apply-field">
              <label className="cleaner-apply-label">Upload ID proof (photo or PDF) *</label>
              <input
                type="file"
                name="idProofFile"
                accept="image/*,application/pdf"
                onChange={onChange}
                required
                className="cleaner-apply-input cleaner-apply-file-input"
              />
            </div>

            {/* Additional Notes */}
            <div className="cleaner-apply-field">
              <label className="cleaner-apply-label">Additional details (optional)</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={onChange}
                rows={4}
                className="cleaner-apply-input cleaner-apply-textarea"
                placeholder="Tell us anything important we should know..."
              />
            </div>

            {/* Submit Button */}
            <div className="cleaner-apply-field">
              <button
                type="submit"
                className="cleaner-apply-submit-btn"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
