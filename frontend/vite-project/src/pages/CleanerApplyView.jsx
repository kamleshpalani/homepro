import React from "react";
import { Link } from "react-router-dom";
import "./CleanerAuth.css";

const SERVICES = [
  "1BHK",
  "2BHK",
  "3BHK",
  "Villa",
  "Kitchen",
  "Bathroom",
  "Office",
  "Sofa",
  "Mattress",
  "Carpet",
  "Fridge",
  "Move-in/out",
  "Post-renovation",
  "Regular weekly",
  "Only bathroom",
  "Only kitchen",
  "Glass/Window",
  "Ceiling fan",
  "Floor polishing",
  "Car interior",
  "Garden",
  "Others",
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
  "Others",
];

const CleanerApplyView = ({
  form,
  message,
  error,
  submitting,
  currentStep,
  onChange,
  onSubmit,
  onNext,
  onPrev,
}) => {
  const steps = [
    { num: 1, title: "Personal Info", icon: "👤" },
    { num: 2, title: "Location", icon: "📍" },
    { num: 3, title: "Professional", icon: "💼" },
    { num: 4, title: "Skills", icon: "⭐" },
    { num: 5, title: "Availability", icon: "📅" },
    { num: 6, title: "Banking", icon: "🏦" },
    { num: 7, title: "Emergency", icon: "🚨" },
    { num: 8, title: "Identity", icon: "🆔" },
  ];

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    onChange({ target: { name, value: checked } });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      onChange({ target: { name, value: files[0] } });
    }
  };

  // Calculate filled fields percentage
  const calculateProgress = () => {
    const allFields = Object.entries(form);
    const filledFields = allFields.filter(([key, value]) => {
      if (typeof value === "boolean") return true; // Checkboxes count as filled
      if (typeof value === "string") return value.trim() !== "";
      return value !== null && value !== undefined;
    });
    return Math.round((filledFields.length / allFields.length) * 100);
  };

  const progressPercentage = calculateProgress();

  return (
    <div className="cleaner-apply-page-new">
      {/* Animated Background */}
      <div className="cleaner-apply-bg">
        <div className="cleaner-apply-bg-shape-1"></div>
        <div className="cleaner-apply-bg-shape-2"></div>
        <div className="cleaner-apply-bg-shape-3"></div>
      </div>

      {/* Hero Section */}
      <section className="cleaner-apply-hero">
        <div className="cleaner-apply-hero-content">
          <div className="cleaner-apply-hero-badge">
            <div className="cleaner-apply-hero-badge-dot"></div>
            💼 Join Our Team
          </div>
          <h1 className="cleaner-apply-hero-title">
            Become a{" "}
            <span className="cleaner-apply-gradient">Professional Cleaner</span>
          </h1>
          <p className="cleaner-apply-hero-desc">
            Join our growing network of trusted cleaners and build a flexible
            career in Coimbatore
          </p>

          {/* Hero Stats */}
          <div className="cleaner-apply-hero-stats">
            <div className="cleaner-apply-stat">
              <div className="cleaner-apply-stat-value">500+</div>
              <div className="cleaner-apply-stat-label">Active Cleaners</div>
            </div>
            <div className="cleaner-apply-stat-divider"></div>
            <div className="cleaner-apply-stat">
              <div className="cleaner-apply-stat-value">₹25k+</div>
              <div className="cleaner-apply-stat-label">
                Avg. Monthly Income
              </div>
            </div>
            <div className="cleaner-apply-stat-divider"></div>
            <div className="cleaner-apply-stat">
              <div className="cleaner-apply-stat-value">4.8★</div>
              <div className="cleaner-apply-stat-label">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="cleaner-apply-form-section">
        {/* Progress Bar */}
        <div className="cleaner-apply-progress-section">
          <div className="cleaner-apply-progress-container">
            <div className="cleaner-apply-progress-label">
              <span className="cleaner-apply-progress-text">Progress</span>
              <span className="cleaner-apply-progress-percentage">
                {progressPercentage}%
              </span>
            </div>
            <div className="cleaner-apply-progress-bar">
              <div
                className="cleaner-apply-progress-fill"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="cleaner-apply-form-container">
          {/* Progress Steps */}
          <div className="cleaner-apply-steps">
            {steps.map((step) => (
              <div
                key={step.num}
                className={`cleaner-apply-step ${
                  currentStep === step.num ? "cleaner-apply-step-active" : ""
                } ${
                  currentStep > step.num ? "cleaner-apply-step-completed" : ""
                }`}
              >
                {currentStep > step.num ? (
                  <div className="cleaner-apply-step-icon-wrapper">
                    <svg
                      className="cleaner-apply-step-checkmark"
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
                  <div className="cleaner-apply-step-icon">{step.icon}</div>
                )}
                <div className="cleaner-apply-step-text">
                  <div className="cleaner-apply-step-number">
                    Step {step.num}
                  </div>
                  <div className="cleaner-apply-step-title">{step.title}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Success/Error Messages */}
          {message && (
            <div className="cleaner-apply-message-success">{message}</div>
          )}
          {error && <div className="cleaner-apply-message-error">{error}</div>}

          {/* Form */}
          <form onSubmit={onSubmit} className="cleaner-apply-form-new">
            {currentStep === 1 && (
              <div className="cleaner-apply-form-step">
                <h2 className="cleaner-apply-form-step-title">
                  Personal Information
                </h2>
                <p className="cleaner-apply-form-step-desc">
                  Tell us about yourself. Fields marked with * are required.
                </p>

                <div className="cleaner-apply-form-grid">
                  <div className="cleaner-apply-field">
                    <label className="cleaner-apply-label">
                      First Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={onChange}
                      className="cleaner-apply-input"
                      required
                    />
                  </div>

                  <div className="cleaner-apply-field">
                    <label className="cleaner-apply-label">
                      Last Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={onChange}
                      className="cleaner-apply-input"
                      required
                    />
                  </div>

                  <div className="cleaner-apply-field">
                    <label className="cleaner-apply-label">
                      Phone Number <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={onChange}
                      className="cleaner-apply-input"
                      required
                    />
                  </div>

                  <div className="cleaner-apply-field">
                    <label className="cleaner-apply-label">
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      className="cleaner-apply-input"
                      required
                    />
                  </div>

                  <div className="cleaner-apply-field">
                    <label className="cleaner-apply-label">Gender</label>
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={onChange}
                      className="cleaner-apply-input"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="cleaner-apply-field">
                    <label className="cleaner-apply-label">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={form.dateOfBirth}
                      onChange={onChange}
                      className="cleaner-apply-input"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="cleaner-apply-form-step">
                <h2 className="cleaner-apply-form-step-title">
                  Location Details
                </h2>
                <p className="cleaner-apply-form-step-desc">
                  Where are you located? This helps us match you with nearby
                  customers.
                </p>

                <div className="cleaner-apply-form-grid">
                  <div className="cleaner-apply-field">
                    <label className="cleaner-apply-label">
                      Area <span className="required">*</span>
                    </label>
                    <select
                      name="area"
                      value={form.area}
                      onChange={onChange}
                      className="cleaner-apply-input"
                      required
                    >
                      <option value="">Select Area</option>
                      {AREAS.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>

                  {form.area === "Others" && (
                    <div className="cleaner-apply-field">
                      <label className="cleaner-apply-label">
                        Specify Area <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="areaOther"
                        value={form.areaOther}
                        onChange={onChange}
                        className="cleaner-apply-input"
                        required
                      />
                    </div>
                  )}

                  <div className="cleaner-apply-field">
                    <label className="cleaner-apply-label">
                      City <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={onChange}
                      className="cleaner-apply-input"
                      required
                    />
                  </div>

                  <div className="cleaner-apply-field cleaner-apply-field-full">
                    <label className="cleaner-apply-label">
                      Address <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="address1"
                      value={form.address1}
                      onChange={onChange}
                      className="cleaner-apply-input"
                      required
                    />
                  </div>

                  <div className="cleaner-apply-field">
                    <label className="cleaner-apply-label">State</label>
                    <input
                      type="text"
                      name="state"
                      value={form.state}
                      onChange={onChange}
                      className="cleaner-apply-input"
                    />
                  </div>

                  <div className="cleaner-apply-field">
                    <label className="cleaner-apply-label">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={form.pincode}
                      onChange={onChange}
                      className="cleaner-apply-input"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="cleaner-apply-form-step">
                <h2 className="cleaner-apply-form-step-title">
                  Professional Details
                </h2>
                <p className="cleaner-apply-form-step-desc">
                  Tell us about your professional experience and preferences.
                </p>

                <div className="cleaner-apply-form-grid">
                  <div className="cleaner-apply-field">
                    <label className="cleaner-apply-label">
                      Years of Experience <span className="required">*</span>
                    </label>
                    <input
                      type="number"
                      name="experienceYears"
                      value={form.experienceYears}
                      onChange={onChange}
                      className="cleaner-apply-input"
                      min="0"
                      required
                    />
                  </div>

                  <div className="cleaner-apply-field">
                    <label className="cleaner-apply-label">
                      Education Level
                    </label>
                    <select
                      name="educationLevel"
                      value={form.educationLevel}
                      onChange={onChange}
                      className="cleaner-apply-input"
                    >
                      <option value="">Select Education Level</option>
                      <option value="below-10th">Below 10th</option>
                      <option value="10th">10th Pass</option>
                      <option value="12th">12th Pass</option>
                      <option value="graduate">Graduate</option>
                      <option value="postgraduate">Post Graduate</option>
                    </select>
                  </div>

                  <div className="cleaner-apply-field">
                    <label className="cleaner-apply-label">
                      Expected Salary Per Job{" "}
                      <span className="required">*</span>
                    </label>
                    <input
                      type="number"
                      name="expectedSalaryPerJob"
                      value={form.expectedSalaryPerJob}
                      onChange={onChange}
                      className="cleaner-apply-input"
                      min="0"
                      required
                    />
                  </div>

                  <div className="cleaner-apply-field">
                    <label className="cleaner-apply-label">
                      Type of Work <span className="required">*</span>
                    </label>
                    <select
                      name="typeOfWork"
                      value={form.typeOfWork}
                      onChange={onChange}
                      className="cleaner-apply-input"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="full-time">Full Time</option>
                      <option value="part-time">Part Time</option>
                      <option value="contract">Contract</option>
                      <option value="freelance">Freelance</option>
                    </select>
                  </div>

                  <div className="cleaner-apply-field">
                    <label className="cleaner-apply-label">
                      Preferred Contact Method
                    </label>
                    <select
                      name="preferredContactMethod"
                      value={form.preferredContactMethod}
                      onChange={onChange}
                      className="cleaner-apply-input"
                    >
                      <option value="">Select Method</option>
                      <option value="phone">Phone</option>
                      <option value="email">Email</option>
                      <option value="whatsapp">WhatsApp</option>
                    </select>
                  </div>

                  <div className="cleaner-apply-field">
                    <label className="cleaner-apply-label">Own Vehicle</label>
                    <select
                      name="ownVehicle"
                      value={form.ownVehicle}
                      onChange={onChange}
                      className="cleaner-apply-input"
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>

                  <div className="cleaner-apply-field">
                    <label className="cleaner-apply-label">
                      Services Offered <span className="required">*</span>
                    </label>
                    <select
                      name="servicesOffered"
                      value={form.servicesOffered}
                      onChange={onChange}
                      className="cleaner-apply-input"
                      required
                    >
                      <option value="">Select Service</option>
                      {SERVICES.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="cleaner-apply-field">
                    <label className="cleaner-apply-label">
                      Languages Known <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="languagesKnown"
                      value={form.languagesKnown}
                      onChange={onChange}
                      className="cleaner-apply-input"
                      placeholder="e.g., Tamil, English, Hindi"
                      required
                    />
                  </div>

                  <div className="cleaner-apply-field cleaner-apply-field-full">
                    <label className="cleaner-apply-label">
                      Previous Employment
                    </label>
                    <textarea
                      name="previousEmployment"
                      value={form.previousEmployment}
                      onChange={onChange}
                      className="cleaner-apply-textarea"
                      rows="3"
                      placeholder="Describe your previous employment history"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="cleaner-apply-form-step">
                <h2 className="cleaner-apply-form-step-title">
                  Skills & Equipment
                </h2>
                <p className="cleaner-apply-form-step-desc">
                  What are your cleaning skills and what equipment do you have?
                </p>

                <div className="cleaner-apply-form-grid">
                  <div className="cleaner-apply-field cleaner-apply-field-full">
                    <label className="cleaner-apply-label">
                      Cleaning Skills
                    </label>
                    <div className="cleaner-apply-checkbox-group">
                      <label className="cleaner-apply-checkbox-label">
                        <input
                          type="checkbox"
                          name="skillDeepCleaning"
                          checked={form.skillDeepCleaning}
                          onChange={handleCheckboxChange}
                        />
                        Deep Cleaning
                      </label>
                      <label className="cleaner-apply-checkbox-label">
                        <input
                          type="checkbox"
                          name="skillCarpetCleaning"
                          checked={form.skillCarpetCleaning}
                          onChange={handleCheckboxChange}
                        />
                        Carpet Cleaning
                      </label>
                      <label className="cleaner-apply-checkbox-label">
                        <input
                          type="checkbox"
                          name="skillWindowCleaning"
                          checked={form.skillWindowCleaning}
                          onChange={handleCheckboxChange}
                        />
                        Window Cleaning
                      </label>
                      <label className="cleaner-apply-checkbox-label">
                        <input
                          type="checkbox"
                          name="skillKitchenCleaning"
                          checked={form.skillKitchenCleaning}
                          onChange={handleCheckboxChange}
                        />
                        Kitchen Cleaning
                      </label>
                      <label className="cleaner-apply-checkbox-label">
                        <input
                          type="checkbox"
                          name="skillBathroomCleaning"
                          checked={form.skillBathroomCleaning}
                          onChange={handleCheckboxChange}
                        />
                        Bathroom Cleaning
                      </label>
                      <label className="cleaner-apply-checkbox-label">
                        <input
                          type="checkbox"
                          name="skillFloorPolishing"
                          checked={form.skillFloorPolishing}
                          onChange={handleCheckboxChange}
                        />
                        Floor Polishing
                      </label>
                    </div>
                  </div>

                  <div className="cleaner-apply-field cleaner-apply-field-full">
                    <label className="cleaner-apply-label">
                      Equipment Available
                    </label>
                    <div className="cleaner-apply-checkbox-group">
                      <label className="cleaner-apply-checkbox-label">
                        <input
                          type="checkbox"
                          name="equipmentVacuum"
                          checked={form.equipmentVacuum}
                          onChange={handleCheckboxChange}
                        />
                        Vacuum Cleaner
                      </label>
                      <label className="cleaner-apply-checkbox-label">
                        <input
                          type="checkbox"
                          name="equipmentMop"
                          checked={form.equipmentMop}
                          onChange={handleCheckboxChange}
                        />
                        Mop & Bucket
                      </label>
                      <label className="cleaner-apply-checkbox-label">
                        <input
                          type="checkbox"
                          name="equipmentCleaningSupplies"
                          checked={form.equipmentCleaningSupplies}
                          onChange={handleCheckboxChange}
                        />
                        Cleaning Supplies
                      </label>
                      <label className="cleaner-apply-checkbox-label">
                        <input
                          type="checkbox"
                          name="equipmentSteamCleaner"
                          checked={form.equipmentSteamCleaner}
                          onChange={handleCheckboxChange}
                        />
                        Steam Cleaner
                      </label>
                      <label className="cleaner-apply-checkbox-label">
                        <input
                          type="checkbox"
                          name="equipmentPressureWasher"
                          checked={form.equipmentPressureWasher}
                          onChange={handleCheckboxChange}
                        />
                        Pressure Washer
                      </label>
                    </div>
                  </div>

                  <div className="cleaner-apply-field cleaner-apply-field-full">
                    <label className="cleaner-apply-label">
                      Certifications
                    </label>
                    <input
                      type="text"
                      name="certifications"
                      value={form.certifications}
                      onChange={onChange}
                      className="cleaner-apply-input"
                      placeholder="List any relevant certifications"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="cleaner-apply-form-step">
                <h2 className="cleaner-apply-form-step-title">Availability</h2>
                <p className="cleaner-apply-form-step-desc">
                  When are you available to work?
                </p>

                <div className="cleaner-apply-form-grid">
                  <div className="cleaner-apply-field">
                    <label className="cleaner-apply-label">
                      Available From <span className="required">*</span>
                    </label>
                    <input
                      type="date"
                      name="availableFrom"
                      value={form.availableFrom}
                      onChange={onChange}
                      className="cleaner-apply-input"
                      required
                    />
                  </div>

                  <div className="cleaner-apply-field">
                    <label className="cleaner-apply-label">
                      Preferred Shift <span className="required">*</span>
                    </label>
                    <select
                      name="preferredShift"
                      value={form.preferredShift}
                      onChange={onChange}
                      className="cleaner-apply-input"
                      required
                    >
                      <option value="">Select Shift</option>
                      <option value="morning">Morning</option>
                      <option value="afternoon">Afternoon</option>
                      <option value="evening">Evening</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>

                  <div className="cleaner-apply-field cleaner-apply-field-full">
                    <label className="cleaner-apply-label">
                      Available Days
                    </label>
                    <div className="cleaner-apply-checkbox-group">
                      <label className="cleaner-apply-checkbox-label">
                        <input
                          type="checkbox"
                          name="availableMonday"
                          checked={form.availableMonday}
                          onChange={handleCheckboxChange}
                        />
                        Monday
                      </label>
                      <label className="cleaner-apply-checkbox-label">
                        <input
                          type="checkbox"
                          name="availableTuesday"
                          checked={form.availableTuesday}
                          onChange={handleCheckboxChange}
                        />
                        Tuesday
                      </label>
                      <label className="cleaner-apply-checkbox-label">
                        <input
                          type="checkbox"
                          name="availableWednesday"
                          checked={form.availableWednesday}
                          onChange={handleCheckboxChange}
                        />
                        Wednesday
                      </label>
                      <label className="cleaner-apply-checkbox-label">
                        <input
                          type="checkbox"
                          name="availableThursday"
                          checked={form.availableThursday}
                          onChange={handleCheckboxChange}
                        />
                        Thursday
                      </label>
                      <label className="cleaner-apply-checkbox-label">
                        <input
                          type="checkbox"
                          name="availableFriday"
                          checked={form.availableFriday}
                          onChange={handleCheckboxChange}
                        />
                        Friday
                      </label>
                      <label className="cleaner-apply-checkbox-label">
                        <input
                          type="checkbox"
                          name="availableSaturday"
                          checked={form.availableSaturday}
                          onChange={handleCheckboxChange}
                        />
                        Saturday
                      </label>
                      <label className="cleaner-apply-checkbox-label">
                        <input
                          type="checkbox"
                          name="availableSunday"
                          checked={form.availableSunday}
                          onChange={handleCheckboxChange}
                        />
                        Sunday
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 6 && (
              <div className="cleaner-apply-form-step">
                <h2 className="cleaner-apply-form-step-title">
                  Banking & References
                </h2>
                <p className="cleaner-apply-form-step-desc">
                  Provide your banking details for payment and references
                  (optional).
                </p>

                <div className="cleaner-apply-form-grid">
                  <div className="cleaner-apply-field">
                    <label className="cleaner-apply-label">Bank Name</label>
                    <input
                      type="text"
                      name="bankName"
                      value={form.bankName}
                      onChange={onChange}
                      className="cleaner-apply-input"
                    />
                  </div>

                  <div className="cleaner-apply-field">
                    <label className="cleaner-apply-label">
                      Account Number
                    </label>
                    <input
                      type="text"
                      name="bankAccountNumber"
                      value={form.bankAccountNumber}
                      onChange={onChange}
                      className="cleaner-apply-input"
                    />
                  </div>

                  <div className="cleaner-apply-field">
                    <label className="cleaner-apply-label">IFSC Code</label>
                    <input
                      type="text"
                      name="bankIFSC"
                      value={form.bankIFSC}
                      onChange={onChange}
                      className="cleaner-apply-input"
                    />
                  </div>

                  <div className="cleaner-apply-field">
                    <label className="cleaner-apply-label">
                      Account Holder Name
                    </label>
                    <input
                      type="text"
                      name="bankAccountHolderName"
                      value={form.bankAccountHolderName}
                      onChange={onChange}
                      className="cleaner-apply-input"
                    />
                  </div>

                  <div className="cleaner-apply-field cleaner-apply-field-full">
                    <label className="cleaner-apply-label">Reference 1</label>
                    <input
                      type="text"
                      name="reference1"
                      value={form.reference1}
                      onChange={onChange}
                      className="cleaner-apply-input"
                      placeholder="Name and contact number"
                    />
                  </div>

                  <div className="cleaner-apply-field cleaner-apply-field-full">
                    <label className="cleaner-apply-label">Reference 2</label>
                    <input
                      type="text"
                      name="reference2"
                      value={form.reference2}
                      onChange={onChange}
                      className="cleaner-apply-input"
                      placeholder="Name and contact number"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 7 && (
              <div className="cleaner-apply-form-step">
                <h2 className="cleaner-apply-form-step-title">
                  Emergency Contact
                </h2>
                <p className="cleaner-apply-form-step-desc">
                  Provide an emergency contact person in case of any urgent
                  situations.
                </p>

                <div className="cleaner-apply-form-grid">
                  <div className="cleaner-apply-field">
                    <label className="cleaner-apply-label">
                      Contact Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="emergencyContactName"
                      value={form.emergencyContactName}
                      onChange={onChange}
                      className="cleaner-apply-input"
                      required
                    />
                  </div>

                  <div className="cleaner-apply-field">
                    <label className="cleaner-apply-label">Relationship</label>
                    <input
                      type="text"
                      name="emergencyContactRelation"
                      value={form.emergencyContactRelation}
                      onChange={onChange}
                      className="cleaner-apply-input"
                      placeholder="e.g., Spouse, Parent, Sibling"
                    />
                  </div>

                  <div className="cleaner-apply-field">
                    <label className="cleaner-apply-label">
                      Contact Phone <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      name="emergencyContactPhone"
                      value={form.emergencyContactPhone}
                      onChange={onChange}
                      className="cleaner-apply-input"
                      required
                    />
                  </div>

                  <div className="cleaner-apply-field cleaner-apply-field-full">
                    <label className="cleaner-apply-label">
                      Contact Address
                    </label>
                    <textarea
                      name="emergencyContactAddress"
                      value={form.emergencyContactAddress}
                      onChange={onChange}
                      className="cleaner-apply-textarea"
                      rows="3"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 8 && (
              <div className="cleaner-apply-form-step">
                <h2 className="cleaner-apply-form-step-title">
                  Identity & Verification
                </h2>
                <p className="cleaner-apply-form-step-desc">
                  Upload your identity proof and provide additional verification
                  details.
                </p>

                <div className="cleaner-apply-form-grid">
                  <div className="cleaner-apply-field">
                    <label className="cleaner-apply-label">
                      ID Proof Type <span className="required">*</span>
                    </label>
                    <select
                      name="idProofType"
                      value={form.idProofType}
                      onChange={onChange}
                      className="cleaner-apply-input"
                      required
                    >
                      <option value="">Select ID Proof</option>
                      <option value="aadhaar">Aadhaar Card</option>
                      <option value="pan">PAN Card</option>
                      <option value="voter">Voter ID</option>
                      <option value="passport">Passport</option>
                      <option value="driving-license">Driving License</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="cleaner-apply-field">
                    <label className="cleaner-apply-label">
                      ID Proof Number <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="idProofNumber"
                      value={form.idProofNumber}
                      onChange={onChange}
                      className="cleaner-apply-input"
                      required
                    />
                  </div>

                  <div className="cleaner-apply-field cleaner-apply-field-full">
                    <label className="cleaner-apply-label">
                      ID Proof Document <span className="required">*</span>
                    </label>
                    <div className="cleaner-apply-file-upload">
                      <input
                        type="file"
                        name="idProofFile"
                        onChange={handleFileChange}
                        className="cleaner-apply-input"
                        accept="image/*,.pdf"
                        required
                      />
                      <small>
                        Upload scanned copy or photo (JPG, PNG, PDF)
                      </small>
                    </div>
                  </div>

                  <div className="cleaner-apply-field cleaner-apply-field-full">
                    <label className="cleaner-apply-label">Photo</label>
                    <div className="cleaner-apply-file-upload">
                      <input
                        type="file"
                        name="photoFile"
                        onChange={handleFileChange}
                        className="cleaner-apply-input"
                        accept="image/*"
                      />
                      <small>Upload your recent photograph (JPG, PNG)</small>
                    </div>
                  </div>

                  <div className="cleaner-apply-field">
                    <label className="cleaner-apply-label">
                      COVID Vaccination Status
                    </label>
                    <select
                      name="covidVaccinationStatus"
                      value={form.covidVaccinationStatus}
                      onChange={onChange}
                      className="cleaner-apply-input"
                    >
                      <option value="">Select Status</option>
                      <option value="fully-vaccinated">Fully Vaccinated</option>
                      <option value="booster">Booster Dose Taken</option>
                      <option value="partially">Partially Vaccinated</option>
                      <option value="not-vaccinated">Not Vaccinated</option>
                    </select>
                  </div>

                  <div className="cleaner-apply-field">
                    <label className="cleaner-apply-label">
                      Medical Conditions
                    </label>
                    <select
                      name="hasMedicalConditions"
                      value={form.hasMedicalConditions}
                      onChange={onChange}
                      className="cleaner-apply-input"
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>

                  {form.hasMedicalConditions === "yes" && (
                    <div className="cleaner-apply-field cleaner-apply-field-full">
                      <label className="cleaner-apply-label">
                        Medical Conditions Details
                      </label>
                      <textarea
                        name="medicalConditionsDetails"
                        value={form.medicalConditionsDetails}
                        onChange={onChange}
                        className="cleaner-apply-textarea"
                        rows="3"
                        placeholder="Please describe any medical conditions"
                      />
                    </div>
                  )}

                  <div className="cleaner-apply-field">
                    <label className="cleaner-apply-label">
                      Police Verification
                    </label>
                    <select
                      name="policeVerificationStatus"
                      value={form.policeVerificationStatus}
                      onChange={onChange}
                      className="cleaner-apply-input"
                    >
                      <option value="">Select Status</option>
                      <option value="have">Already Have</option>
                      <option value="willing">Willing to Obtain</option>
                      <option value="in-process">In Process</option>
                      <option value="not-have">Don&apos;t Have</option>
                    </select>
                  </div>

                  <div className="cleaner-apply-field cleaner-apply-field-full">
                    <div className="cleaner-apply-consent-box">
                      <label className="cleaner-apply-checkbox-label">
                        <input
                          type="checkbox"
                          name="consentBackgroundCheck"
                          checked={form.consentBackgroundCheck}
                          onChange={handleCheckboxChange}
                          required
                        />
                        <span>
                          I consent to background verification checks{" "}
                          <span className="required">*</span>
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="cleaner-apply-field cleaner-apply-field-full">
                    <label className="cleaner-apply-label">
                      Additional Notes
                    </label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={onChange}
                      className="cleaner-apply-textarea"
                      rows="4"
                      placeholder="Any additional information you'd like to share"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="cleaner-apply-form-actions">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={onPrev}
                  className="cleaner-apply-btn cleaner-apply-btn-secondary"
                  disabled={submitting}
                >
                  ← Previous
                </button>
              )}

              {currentStep < 8 && (
                <button
                  type="button"
                  onClick={onNext}
                  className="cleaner-apply-btn cleaner-apply-btn-primary"
                  disabled={submitting}
                >
                  Next →
                </button>
              )}

              {currentStep === 8 && (
                <button
                  type="submit"
                  className="cleaner-apply-btn cleaner-apply-btn-submit"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CleanerApplyView;
