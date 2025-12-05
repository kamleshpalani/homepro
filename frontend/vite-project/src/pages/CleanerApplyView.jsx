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
    <section className="cleaner-apply-section">
      <h1 className="cleaner-apply-title">Cleaner Registration</h1>
      <p className="cleaner-apply-subtitle">
        Apply as a freelance cleaner in Coimbatore. Our team will verify your
        details and contact you.
      </p>

      {message && <p className="cleaner-apply-message-success">{message}</p>}
      {error && <p className="cleaner-apply-message-error">{error}</p>}

      <form className="cleaner-apply-form" onSubmit={onSubmit}>
        {/* Name */}
        <div className="cleaner-apply-field-half">
          <label className="cleaner-apply-label">
            First name <span style={{ color: "red" }}>*</span>
          </label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={onChange}
            required
            className="cleaner-apply-input"
            placeholder="Enter first name"
          />
        </div>

        <div className="cleaner-apply-field-half">
          <label className="cleaner-apply-label">
            Last name <span style={{ color: "red" }}>*</span>
          </label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={onChange}
            required
            className="cleaner-apply-input"
            placeholder="Enter last name"
          />
        </div>

        {/* Contact */}
        <div className="cleaner-apply-field-half">
          <label className="cleaner-apply-label">
            Mobile Number <span style={{ color: "red" }}>*</span>
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={onChange}
            required
            className="cleaner-apply-input"
            placeholder="e.g. 9876543210"
          />
        </div>

        <div className="cleaner-apply-field-half">
          <label className="cleaner-apply-label">
            Email address <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            className="cleaner-apply-input"
            placeholder="We will send updates here"
            required
          />
        </div>

        <div className="cleaner-apply-field-quarter">
          <label className="cleaner-apply-label">
            Preferred method of contact
          </label>
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

        <div className="cleaner-apply-field-quarter">
          <label className="cleaner-apply-label">Prefer time for work</label>
          <select
            name="preferredContactTime"
            value={form.preferredContactTime}
            onChange={onChange}
            className="cleaner-apply-input"
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
        <div className="cleaner-apply-field-half">
          <label className="cleaner-apply-label">
            Area <span style={{ color: "red" }}>*</span>
          </label>
          <select
            name="area"
            value={form.area}
            onChange={onChange}
            required
            className="cleaner-apply-input"
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
          <div className="cleaner-apply-field-half">
            <label className="cleaner-apply-label">
              Enter your exact area / landmark *
            </label>
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

        {/* Address */}
        <div className="cleaner-apply-field-half">
          <label className="cleaner-apply-label">
            Address line 1 <span style={{ color: "red" }}>*</span>
          </label>
          <input
            name="address1"
            value={form.address1}
            onChange={onChange}
            required
            className="cleaner-apply-input"
            placeholder="Flat / house number and street name"
          />
        </div>

        <div className="cleaner-apply-field-half">
          <label className="cleaner-apply-label">Address line 2</label>
          <input
            name="address2"
            value={form.address2}
            onChange={onChange}
            className="cleaner-apply-input"
            placeholder="Area, landmark, or additional details (optional)"
          />
        </div>

        <div className="cleaner-apply-field-half">
          <label className="cleaner-apply-label">
            City <span style={{ color: "red" }}>*</span>
          </label>
          <input
            name="city"
            value={form.city}
            onChange={onChange}
            className="cleaner-apply-input"
            placeholder="e.g. Coimbatore"
            required
          />
        </div>

        <div className="cleaner-apply-field-half">
          <label className="cleaner-apply-label">State</label>
          <input
            name="state"
            value={form.state}
            onChange={onChange}
            className="cleaner-apply-input"
            placeholder="e.g. Tamil Nadu"
          />
        </div>

        <div className="cleaner-apply-field-half">
          <label className="cleaner-apply-label">Country</label>
          <input
            name="country"
            value={form.country}
            onChange={onChange}
            className="cleaner-apply-input"
            placeholder="e.g. India"
          />
        </div>

        <div className="cleaner-apply-field-quarter">
          <label className="cleaner-apply-label">Pincode</label>
          <input
            name="pincode"
            value={form.pincode}
            onChange={onChange}
            className="cleaner-apply-input"
            placeholder="e.g. 641002"
          />
        </div>

        {/* Experience & services */}
        <div className="cleaner-apply-field-quarter">
          <label className="cleaner-apply-label">
            Years of cleaning experience
          </label>
          <input
            name="experienceYears"
            value={form.experienceYears}
            onChange={onChange}
            className="cleaner-apply-input"
            placeholder="e.g. 2 years"
          />
        </div>

        <div className="cleaner-apply-field-quarter">
          <label className="cleaner-apply-label">
            Expected salary per hour <span style={{ color: "red" }}>*</span>
          </label>
          <input
            name="expectedSalaryPerJob"
            value={form.expectedSalaryPerJob}
            onChange={onChange}
            className="cleaner-apply-input"
            placeholder="e.g. ₹200 per hour"
            required
          />
        </div>

        <div className="cleaner-apply-field-half">
          <label className="cleaner-apply-label">Languages known</label>
          <input
            name="languagesKnown"
            value={form.languagesKnown}
            onChange={onChange}
            className="cleaner-apply-input"
            placeholder="e.g. Tamil, English, Hindi"
          />
        </div>

        <div className="cleaner-apply-field-half">
          <label className="cleaner-apply-label">
            Type of work <span style={{ color: "red" }}>*</span>
          </label>
          <select
            name="typeOfWork"
            value={form.typeOfWork}
            onChange={onChange}
            className="cleaner-apply-input"
            required
          >
            <option value="">Select type of work</option>
            <option value="full-time">Full time</option>
            <option value="part-time">Part time</option>
            <option value="freelance">Freelance</option>
            <option value="any">Any</option>
          </select>
        </div>

        <div className="cleaner-apply-field-half">
          <label className="cleaner-apply-label">
            Services you can offer <span style={{ color: "red" }}>*</span>
          </label>
          <select
            name="servicesOffered"
            value={form.servicesOffered}
            onChange={onChange}
            className="cleaner-apply-input"
            required
          >
            <option value="">Select one</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {form.servicesOffered === "Others / Not listed" && (
          <div className="cleaner-apply-field-half">
            <label className="cleaner-apply-label">
              Describe the services you can provide
            </label>
            <input
              name="serviceOther"
              value={form.serviceOther}
              onChange={onChange}
              className="cleaner-apply-input"
              placeholder="Eg: Window cleaning, car cleaning, etc."
            />
          </div>
        )}

        {/* ID proof */}
        <div className="cleaner-apply-field-half">
          <label className="cleaner-apply-label">
            ID proof type <span style={{ color: "red" }}>*</span>
          </label>
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

        <div className="cleaner-apply-field-half">
          <label className="cleaner-apply-label">
            ID proof number <span style={{ color: "red" }}>*</span>
          </label>
          <input
            name="idProofNumber"
            value={form.idProofNumber}
            onChange={onChange}
            required
            className="cleaner-apply-input"
            placeholder="Enter the ID number as on the card"
          />
        </div>

        <div className="cleaner-apply-field-half">
          <label className="cleaner-apply-label">
            Upload ID proof (photo or PDF){" "}
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="file"
            name="idProofFile"
            accept="image/*,application/pdf"
            onChange={onChange}
            required
            className="cleaner-apply-input"
          />
        </div>

        {/* Notes */}
        <div className="cleaner-apply-field-full">
          <label className="cleaner-apply-label">Additional details</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={onChange}
            rows={3}
            className="cleaner-apply-input"
            placeholder="Tell us anything important we should know (timings, restrictions, etc.)"
          />
        </div>

        {/* Submit */}
        <div className="cleaner-apply-field-full">
          <button
            type="submit"
            className="cleaner-apply-submit-button"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit application"}
          </button>
        </div>
      </form>
    </section>
  );
}
