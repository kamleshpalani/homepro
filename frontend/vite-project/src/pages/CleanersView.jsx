import { useState } from "react";
import "./CleanersAdmin.css";

export default function CleanersView({ cleaners, loading, error }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterExperience, setFilterExperience] = useState("all");
  const [selectedCleaner, setSelectedCleaner] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewDetails = (cleaner) => {
    setSelectedCleaner(cleaner);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCleaner(null);
  };

  // Filter cleaners
  const filteredCleaners = cleaners.filter((cleaner) => {
    const matchesSearch =
      cleaner.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cleaner.phone?.includes(searchTerm) ||
      cleaner.area?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cleaner.servicesOffered?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && cleaner.isActive) ||
      (filterStatus === "inactive" && !cleaner.isActive);

    const matchesExperience =
      filterExperience === "all" ||
      (filterExperience === "0-2" && cleaner.experienceYears <= 2) ||
      (filterExperience === "3-5" &&
        cleaner.experienceYears >= 3 &&
        cleaner.experienceYears <= 5) ||
      (filterExperience === "5+" && cleaner.experienceYears > 5);

    return matchesSearch && matchesStatus && matchesExperience;
  });

  // Calculate stats
  const stats = {
    total: cleaners.length,
    active: cleaners.filter((c) => c.isActive).length,
    inactive: cleaners.filter((c) => !c.isActive).length,
    avgExperience:
      cleaners.length > 0
        ? (
            cleaners.reduce((sum, c) => sum + (c.experienceYears || 0), 0) /
            cleaners.length
          ).toFixed(1)
        : 0,
  };

  return (
    <div className="cleaners-admin-page">
      {/* Header */}
      <div className="cleaners-admin-header">
        <div className="cleaners-header-content">
          <div className="cleaners-header-badge">👥 Team Management</div>
          <h1 className="cleaners-admin-title">
            Registered <span className="cleaners-title-gradient">Cleaners</span>
          </h1>
          <p className="cleaners-admin-subtitle">
            Manage your cleaning staff, track experience, and monitor
            availability
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="cleaners-stats-grid">
        <div className="cleaners-stat-card cleaners-stat-total">
          <div className="cleaners-stat-icon">👨‍💼</div>
          <div className="cleaners-stat-content">
            <div className="cleaners-stat-value">{stats.total}</div>
            <div className="cleaners-stat-label">Total Cleaners</div>
          </div>
        </div>
        <div className="cleaners-stat-card cleaners-stat-active">
          <div className="cleaners-stat-icon">✅</div>
          <div className="cleaners-stat-content">
            <div className="cleaners-stat-value">{stats.active}</div>
            <div className="cleaners-stat-label">Active</div>
          </div>
        </div>
        <div className="cleaners-stat-card cleaners-stat-inactive">
          <div className="cleaners-stat-icon">⏸️</div>
          <div className="cleaners-stat-content">
            <div className="cleaners-stat-value">{stats.inactive}</div>
            <div className="cleaners-stat-label">Inactive</div>
          </div>
        </div>
        <div className="cleaners-stat-card cleaners-stat-experience">
          <div className="cleaners-stat-icon">⭐</div>
          <div className="cleaners-stat-content">
            <div className="cleaners-stat-value">{stats.avgExperience}</div>
            <div className="cleaners-stat-label">Avg. Experience (yrs)</div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="cleaners-filters-section">
        <div className="cleaners-search-box">
          <span className="cleaners-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name, phone, area, or services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="cleaners-search-input"
          />
        </div>

        <div className="cleaners-filter-group">
          <div className="cleaners-filter-item">
            <label className="cleaners-filter-label">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="cleaners-filter-select"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="cleaners-filter-item">
            <label className="cleaners-filter-label">Experience</label>
            <select
              value={filterExperience}
              onChange={(e) => setFilterExperience(e.target.value)}
              className="cleaners-filter-select"
            >
              <option value="all">All Levels</option>
              <option value="0-2">0-2 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5+">5+ years</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="cleaners-content-section">
        {loading && (
          <div className="cleaners-loading-state">
            <div className="cleaners-spinner"></div>
            <p>Loading cleaners...</p>
          </div>
        )}

        {error && (
          <div className="cleaners-error-state">
            <span className="cleaners-error-icon">⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && cleaners.length === 0 && (
          <div className="cleaners-empty-state">
            <div className="cleaners-empty-icon">👷</div>
            <h3>No Cleaners Registered</h3>
            <p>
              Cleaner applications will appear here once staff members apply.
            </p>
          </div>
        )}

        {!loading &&
          !error &&
          cleaners.length > 0 &&
          filteredCleaners.length === 0 && (
            <div className="cleaners-empty-state">
              <div className="cleaners-empty-icon">🔍</div>
              <h3>No Results Found</h3>
              <p>Try adjusting your search or filter criteria.</p>
            </div>
          )}

        {!loading && !error && filteredCleaners.length > 0 && (
          <div className="cleaners-grid">
            {filteredCleaners.map((cleaner, index) => (
              <div key={cleaner._id || index} className="cleaner-card">
                {/* Header */}
                <div className="cleaner-card-header">
                  <div className="cleaner-avatar">
                    {cleaner.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <div className="cleaner-header-info">
                    <h3 className="cleaner-name">{cleaner.name || "N/A"}</h3>
                    <span
                      className={`cleaner-status-badge ${
                        cleaner.isActive
                          ? "cleaner-status-active"
                          : "cleaner-status-inactive"
                      }`}
                    >
                      {cleaner.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="cleaner-card-section">
                  <div className="cleaner-info-row">
                    <span className="cleaner-info-icon">📞</span>
                    <div className="cleaner-info-content">
                      <div className="cleaner-info-label">Phone</div>
                      <div className="cleaner-info-value">
                        {cleaner.phone || "-"}
                      </div>
                    </div>
                  </div>
                  <div className="cleaner-info-row">
                    <span className="cleaner-info-icon">📍</span>
                    <div className="cleaner-info-content">
                      <div className="cleaner-info-label">Area</div>
                      <div className="cleaner-info-value">
                        {cleaner.area || "-"}
                      </div>
                    </div>
                  </div>
                  <div className="cleaner-info-row">
                    <span className="cleaner-info-icon">⭐</span>
                    <div className="cleaner-info-content">
                      <div className="cleaner-info-label">Experience</div>
                      <div className="cleaner-info-value">
                        {cleaner.experienceYears
                          ? `${cleaner.experienceYears} years`
                          : "Not specified"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services */}
                {cleaner.servicesOffered && (
                  <div className="cleaner-card-section">
                    <div className="cleaner-section-title">
                      <span className="cleaner-section-icon">🧹</span>
                      Services Offered
                    </div>
                    <div className="cleaner-services">
                      {cleaner.servicesOffered}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {cleaner.notes && (
                  <div className="cleaner-card-section">
                    <div className="cleaner-section-title">
                      <span className="cleaner-section-icon">📝</span>
                      Notes
                    </div>
                    <div className="cleaner-notes">{cleaner.notes}</div>
                  </div>
                )}

                {/* Footer */}
                <div className="cleaner-card-footer">
                  <span className="cleaner-footer-text">
                    Registered:{" "}
                    {cleaner.createdAt
                      ? new Date(cleaner.createdAt).toLocaleDateString()
                      : "-"}
                  </span>
                  <button
                    onClick={() => handleViewDetails(cleaner)}
                    className="cleaner-view-details-btn"
                  >
                    🔍 View All Fields
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showModal && selectedCleaner && (
        <div className="admin-modal-overlay" onClick={handleCloseModal}>
          <div
            className="admin-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <h2 className="admin-modal-title">
                👤 Cleaner Profile - Complete Details
              </h2>
              <button onClick={handleCloseModal} className="admin-modal-close">
                ✕
              </button>
            </div>

            <div className="admin-modal-body">
              {/* Personal Information (Step 1) */}
              <div className="admin-detail-section">
                <h3 className="admin-detail-section-title">
                  👤 Personal Information
                </h3>
                <div className="admin-detail-grid">
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">First Name:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.firstName || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Last Name:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.lastName || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Full Name:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.name || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Email:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.email || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Phone:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.phone || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Gender:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.gender || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Date of Birth:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.dateOfBirth || "-"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Location Details (Step 2) */}
              <div className="admin-detail-section">
                <h3 className="admin-detail-section-title">
                  📍 Location Details
                </h3>
                <div className="admin-detail-grid">
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Area:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.area || "-"}
                    </span>
                  </div>
                  {selectedCleaner.areaOther && (
                    <div className="admin-detail-item">
                      <span className="admin-detail-label">Area (Other):</span>
                      <span className="admin-detail-value">
                        {selectedCleaner.areaOther}
                      </span>
                    </div>
                  )}
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">City:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.city || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Address:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.address1 || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">State:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.state || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Pincode:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.pincode || "-"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Professional Details (Step 3) */}
              <div className="admin-detail-section">
                <h3 className="admin-detail-section-title">
                  💼 Professional Details
                </h3>
                <div className="admin-detail-grid">
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Experience:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.experienceYears || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Education Level:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.educationLevel || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">
                      Expected Rate (per hour):
                    </span>
                    <span className="admin-detail-value admin-detail-value-price">
                      ₹{selectedCleaner.expectedSalaryPerJob || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Work Type:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.typeOfWork || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">
                      Preferred Contact Method:
                    </span>
                    <span className="admin-detail-value">
                      {selectedCleaner.preferredContactMethod || "WhatsApp"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Own Vehicle:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.ownVehicle || "No"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Primary Service:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.servicesOffered || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Languages Known:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.languagesKnown || "-"}
                    </span>
                  </div>
                  {selectedCleaner.previousEmployment && (
                    <div className="admin-detail-item admin-detail-item-full">
                      <span className="admin-detail-label">
                        Previous Employment:
                      </span>
                      <span className="admin-detail-value">
                        {selectedCleaner.previousEmployment}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Skills & Equipment (Step 4) */}
              <div className="admin-detail-section">
                <h3 className="admin-detail-section-title">
                  ⭐ Skills & Equipment
                </h3>

                <div className="admin-detail-subsection">
                  <h4 className="admin-detail-subtitle">Special Skills:</h4>
                  <div className="admin-detail-tags">
                    {selectedCleaner.skillDeepCleaning && (
                      <span className="admin-detail-tag">✓ Deep Cleaning</span>
                    )}
                    {selectedCleaner.skillCarpetCleaning && (
                      <span className="admin-detail-tag">
                        ✓ Carpet Cleaning
                      </span>
                    )}
                    {selectedCleaner.skillWindowCleaning && (
                      <span className="admin-detail-tag">
                        ✓ Window Cleaning
                      </span>
                    )}
                    {selectedCleaner.skillKitchenCleaning && (
                      <span className="admin-detail-tag">
                        ✓ Kitchen Deep Clean
                      </span>
                    )}
                    {selectedCleaner.skillBathroomCleaning && (
                      <span className="admin-detail-tag">
                        ✓ Bathroom Sanitization
                      </span>
                    )}
                    {selectedCleaner.skillFloorPolishing && (
                      <span className="admin-detail-tag">
                        ✓ Floor Polishing
                      </span>
                    )}
                    {!selectedCleaner.skillDeepCleaning &&
                      !selectedCleaner.skillCarpetCleaning &&
                      !selectedCleaner.skillWindowCleaning &&
                      !selectedCleaner.skillKitchenCleaning &&
                      !selectedCleaner.skillBathroomCleaning &&
                      !selectedCleaner.skillFloorPolishing && (
                        <span className="admin-detail-value-muted">
                          No skills specified
                        </span>
                      )}
                  </div>
                </div>

                <div className="admin-detail-subsection">
                  <h4 className="admin-detail-subtitle">Own Equipment:</h4>
                  <div className="admin-detail-tags">
                    {selectedCleaner.equipmentVacuum && (
                      <span className="admin-detail-tag">✓ Vacuum Cleaner</span>
                    )}
                    {selectedCleaner.equipmentMop && (
                      <span className="admin-detail-tag">✓ Mop & Bucket</span>
                    )}
                    {selectedCleaner.equipmentCleaningSupplies && (
                      <span className="admin-detail-tag">
                        ✓ Cleaning Supplies
                      </span>
                    )}
                    {selectedCleaner.equipmentSteamCleaner && (
                      <span className="admin-detail-tag">✓ Steam Cleaner</span>
                    )}
                    {selectedCleaner.equipmentPressureWasher && (
                      <span className="admin-detail-tag">
                        ✓ Pressure Washer
                      </span>
                    )}
                    {!selectedCleaner.equipmentVacuum &&
                      !selectedCleaner.equipmentMop &&
                      !selectedCleaner.equipmentCleaningSupplies &&
                      !selectedCleaner.equipmentSteamCleaner &&
                      !selectedCleaner.equipmentPressureWasher && (
                        <span className="admin-detail-value-muted">
                          No equipment owned
                        </span>
                      )}
                  </div>
                </div>

                {selectedCleaner.certifications && (
                  <div className="admin-detail-grid">
                    <div className="admin-detail-item admin-detail-item-full">
                      <span className="admin-detail-label">
                        Certifications:
                      </span>
                      <span className="admin-detail-value">
                        {selectedCleaner.certifications}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Availability (Step 5) */}
              <div className="admin-detail-section">
                <h3 className="admin-detail-section-title">📅 Availability</h3>
                <div className="admin-detail-grid">
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Available From:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.availableFrom || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Preferred Shift:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.preferredShift || "-"}
                    </span>
                  </div>
                </div>

                <div className="admin-detail-subsection">
                  <h4 className="admin-detail-subtitle">Available Days:</h4>
                  <div className="admin-detail-tags">
                    {selectedCleaner.availableMonday && (
                      <span className="admin-detail-tag">✓ Monday</span>
                    )}
                    {selectedCleaner.availableTuesday && (
                      <span className="admin-detail-tag">✓ Tuesday</span>
                    )}
                    {selectedCleaner.availableWednesday && (
                      <span className="admin-detail-tag">✓ Wednesday</span>
                    )}
                    {selectedCleaner.availableThursday && (
                      <span className="admin-detail-tag">✓ Thursday</span>
                    )}
                    {selectedCleaner.availableFriday && (
                      <span className="admin-detail-tag">✓ Friday</span>
                    )}
                    {selectedCleaner.availableSaturday && (
                      <span className="admin-detail-tag">✓ Saturday</span>
                    )}
                    {selectedCleaner.availableSunday && (
                      <span className="admin-detail-tag">✓ Sunday</span>
                    )}
                    {!selectedCleaner.availableMonday &&
                      !selectedCleaner.availableTuesday &&
                      !selectedCleaner.availableWednesday &&
                      !selectedCleaner.availableThursday &&
                      !selectedCleaner.availableFriday &&
                      !selectedCleaner.availableSaturday &&
                      !selectedCleaner.availableSunday && (
                        <span className="admin-detail-value-muted">
                          No days specified
                        </span>
                      )}
                  </div>
                </div>
              </div>

              {/* Banking & References (Step 6) */}
              <div className="admin-detail-section">
                <h3 className="admin-detail-section-title">
                  🏦 Banking & References
                </h3>
                <div className="admin-detail-grid">
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Bank Name:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.bankName || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Account Number:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.bankAccountNumber || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">IFSC Code:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.bankIFSC || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Account Holder:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.bankAccountHolderName || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Reference 1:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.reference1 || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Reference 2:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.reference2 || "-"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Emergency Contact (Step 7) */}
              <div className="admin-detail-section">
                <h3 className="admin-detail-section-title">
                  🚨 Emergency Contact
                </h3>
                <div className="admin-detail-grid">
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Contact Name:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.emergencyContactName || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Relationship:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.emergencyContactRelation || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Phone:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.emergencyContactPhone || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Address:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.emergencyContactAddress || "-"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Identity & Health (Step 8) */}
              <div className="admin-detail-section">
                <h3 className="admin-detail-section-title">
                  🆔 Identity & Health
                </h3>
                <div className="admin-detail-grid">
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">ID Proof Type:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.idProofType || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">ID Number:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.idProofNumber || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">ID Proof File:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.idProofFile || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Photo File:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.photoFile || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">
                      COVID Vaccination:
                    </span>
                    <span className="admin-detail-value">
                      {selectedCleaner.covidVaccinationStatus || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">
                      Medical Conditions:
                    </span>
                    <span className="admin-detail-value">
                      {selectedCleaner.hasMedicalConditions || "No"}
                    </span>
                  </div>
                  {selectedCleaner.medicalConditionsDetails && (
                    <div className="admin-detail-item admin-detail-item-full">
                      <span className="admin-detail-label">
                        Medical Details:
                      </span>
                      <span className="admin-detail-value">
                        {selectedCleaner.medicalConditionsDetails}
                      </span>
                    </div>
                  )}
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">
                      Police Verification:
                    </span>
                    <span className="admin-detail-value">
                      {selectedCleaner.policeVerificationStatus || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">
                      Background Check Consent:
                    </span>
                    <span className="admin-detail-value">
                      {selectedCleaner.consentBackgroundCheck
                        ? "✓ Yes"
                        : "✗ No"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              {selectedCleaner.notes && (
                <div className="admin-detail-section">
                  <h3 className="admin-detail-section-title">
                    📝 Additional Notes
                  </h3>
                  <div className="admin-detail-notes">
                    {selectedCleaner.notes}
                  </div>
                </div>
              )}

              {/* System Info */}
              <div className="admin-detail-section">
                <h3 className="admin-detail-section-title">
                  ℹ️ System Information
                </h3>
                <div className="admin-detail-grid">
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Status:</span>
                    <span
                      className={`admin-status-badge ${
                        selectedCleaner.isActive
                          ? "cleaner-status-active"
                          : "cleaner-status-inactive"
                      }`}
                    >
                      {selectedCleaner.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Source:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.source || "public_form"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Cleaner ID:</span>
                    <span className="admin-detail-value admin-detail-value-mono">
                      {selectedCleaner._id}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Created At:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.createdAt
                        ? new Date(selectedCleaner.createdAt).toLocaleString()
                        : "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Last Updated:</span>
                    <span className="admin-detail-value">
                      {selectedCleaner.updatedAt
                        ? new Date(selectedCleaner.updatedAt).toLocaleString()
                        : "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                onClick={handleCloseModal}
                className="admin-modal-btn admin-modal-btn-close"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
