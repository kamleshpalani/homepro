import { useState } from "react";
import "./AdminTable.css";

export default function BookingsView({ bookings, loading, error }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterService, setFilterService] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  // Filter bookings
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phone?.includes(searchTerm) ||
      booking.area?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (booking.status || "New").toLowerCase() === filterStatus.toLowerCase();

    const matchesService =
      filterService === "all" ||
      booking.service?.toLowerCase().includes(filterService.toLowerCase());

    return matchesSearch && matchesStatus && matchesService;
  });

  // Calculate stats
  const stats = {
    total: bookings.length,
    new: bookings.filter((b) => !b.status || b.status === "New").length,
    confirmed: bookings.filter((b) => b.status === "Confirmed").length,
    completed: bookings.filter((b) => b.status === "Completed").length,
    cancelled: bookings.filter((b) => b.status === "Cancelled").length,
  };

  // Get status badge class
  const getStatusClass = (status) => {
    const statusLower = (status || "New").toLowerCase();
    switch (statusLower) {
      case "confirmed":
        return "admin-status-confirmed";
      case "completed":
        return "admin-status-completed";
      case "cancelled":
        return "admin-status-cancelled";
      default:
        return "admin-status-new";
    }
  };

  return (
    <div className="admin-bookings-page">
      {/* Header */}
      <div className="admin-bookings-header">
        <div className="admin-header-content">
          <div className="admin-header-badge">📋 Bookings Management</div>
          <h1 className="admin-bookings-title">
            All <span className="admin-title-gradient">Booking Requests</span>
          </h1>
          <p className="admin-bookings-subtitle">
            Manage and track all customer booking requests in one place
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card admin-stat-total">
          <div className="admin-stat-icon">📊</div>
          <div className="admin-stat-content">
            <div className="admin-stat-value">{stats.total}</div>
            <div className="admin-stat-label">Total Bookings</div>
          </div>
        </div>
        <div className="admin-stat-card admin-stat-new">
          <div className="admin-stat-icon">🆕</div>
          <div className="admin-stat-content">
            <div className="admin-stat-value">{stats.new}</div>
            <div className="admin-stat-label">New Requests</div>
          </div>
        </div>
        <div className="admin-stat-card admin-stat-confirmed">
          <div className="admin-stat-icon">✅</div>
          <div className="admin-stat-content">
            <div className="admin-stat-value">{stats.confirmed}</div>
            <div className="admin-stat-label">Confirmed</div>
          </div>
        </div>
        <div className="admin-stat-card admin-stat-completed">
          <div className="admin-stat-icon">🎉</div>
          <div className="admin-stat-content">
            <div className="admin-stat-value">{stats.completed}</div>
            <div className="admin-stat-label">Completed</div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="admin-filters-section">
        <div className="admin-search-box">
          <span className="admin-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name, phone, or area..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-search-input"
          />
        </div>

        <div className="admin-filter-group">
          <div className="admin-filter-item">
            <label className="admin-filter-label">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="admin-filter-select"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="admin-filter-item">
            <label className="admin-filter-label">Service</label>
            <select
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
              className="admin-filter-select"
            >
              <option value="all">All Services</option>
              <option value="deep">Deep Cleaning</option>
              <option value="regular">Regular Cleaning</option>
              <option value="move">Move In/Out</option>
              <option value="bathroom">Bathroom Cleaning</option>
              <option value="kitchen">Kitchen Cleaning</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="admin-content-section">
        {loading && (
          <div className="admin-loading-state">
            <div className="admin-spinner"></div>
            <p>Loading bookings...</p>
          </div>
        )}

        {error && (
          <div className="admin-error-state">
            <span className="admin-error-icon">⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && bookings.length === 0 && (
          <div className="admin-empty-state">
            <div className="admin-empty-icon">📭</div>
            <h3>No Bookings Yet</h3>
            <p>
              Booking requests will appear here once customers start booking
              services.
            </p>
          </div>
        )}

        {!loading &&
          !error &&
          bookings.length > 0 &&
          filteredBookings.length === 0 && (
            <div className="admin-empty-state">
              <div className="admin-empty-icon">🔍</div>
              <h3>No Results Found</h3>
              <p>Try adjusting your search or filter criteria.</p>
            </div>
          )}

        {!loading && !error && filteredBookings.length > 0 && (
          <div className="admin-table-container">
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th className="admin-th">#</th>
                    <th className="admin-th">Customer</th>
                    <th className="admin-th">Contact</th>
                    <th className="admin-th">Service Details</th>
                    <th className="admin-th">Schedule</th>
                    <th className="admin-th">Status</th>
                    <th className="admin-th">Price</th>
                    <th className="admin-th">Assigned To</th>
                    <th className="admin-th">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((b, index) => (
                    <tr key={b._id || index} className="admin-table-row">
                      <td className="admin-td admin-td-index">{index + 1}</td>
                      <td className="admin-td">
                        <div className="admin-customer-cell">
                          <div className="admin-customer-avatar">
                            {b.name?.charAt(0)?.toUpperCase() || "?"}
                          </div>
                          <div className="admin-customer-info">
                            <div className="admin-customer-name">
                              {b.name || "N/A"}
                            </div>
                            <div className="admin-customer-email">
                              {b.email || "-"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="admin-td">
                        <div className="admin-contact-cell">
                          <div className="admin-contact-item">
                            <span className="admin-contact-icon">📞</span>
                            {b.phone || "-"}
                          </div>
                          <div className="admin-contact-item">
                            <span className="admin-contact-icon">📍</span>
                            {b.area || "-"}
                          </div>
                        </div>
                      </td>
                      <td className="admin-td">
                        <div className="admin-service-cell">
                          <div className="admin-service-name">
                            {b.service || "-"}
                          </div>
                          <div className="admin-service-meta">
                            {b.hours ? `${b.hours} hours` : "-"}
                          </div>
                        </div>
                      </td>
                      <td className="admin-td">
                        <div className="admin-schedule-cell">
                          <div className="admin-schedule-date">
                            📅 {b.date || "-"}
                          </div>
                          <div className="admin-schedule-time">
                            🕐 {b.timeSlot || "-"}
                          </div>
                        </div>
                      </td>
                      <td className="admin-td">
                        <span
                          className={`admin-status-badge ${getStatusClass(
                            b.status
                          )}`}
                        >
                          {b.status || "New"}
                        </span>
                      </td>
                      <td className="admin-td">
                        <div className="admin-price-cell">
                          {typeof b.estimatedPrice === "number"
                            ? `₹${b.estimatedPrice}`
                            : b.estimatedPrice
                            ? `₹${b.estimatedPrice}`
                            : "-"}
                        </div>
                      </td>
                      <td className="admin-td">
                        <div className="admin-assigned-cell">
                          {b.assignedCleaner && b.assignedCleaner.trim() ? (
                            <>
                              <span className="admin-assigned-icon">👤</span>
                              {b.assignedCleaner}
                            </>
                          ) : (
                            <span className="admin-unassigned">Unassigned</span>
                          )}
                        </div>
                      </td>
                      <td className="admin-td">
                        <button
                          onClick={() => handleViewDetails(b)}
                          className="admin-view-details-btn"
                        >
                          👁️ View All
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showModal && selectedBooking && (
        <div className="admin-modal-overlay" onClick={handleCloseModal}>
          <div
            className="admin-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <h2 className="admin-modal-title">📋 Booking Details</h2>
              <button onClick={handleCloseModal} className="admin-modal-close">
                ✕
              </button>
            </div>

            <div className="admin-modal-body">
              {/* Customer Information */}
              <div className="admin-detail-section">
                <h3 className="admin-detail-section-title">
                  👤 Customer Information
                </h3>
                <div className="admin-detail-grid">
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">First Name:</span>
                    <span className="admin-detail-value">
                      {selectedBooking.firstName || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Last Name:</span>
                    <span className="admin-detail-value">
                      {selectedBooking.lastName || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Phone:</span>
                    <span className="admin-detail-value">
                      {selectedBooking.phone || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Email:</span>
                    <span className="admin-detail-value">
                      {selectedBooking.email || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">
                      Preferred Contact:
                    </span>
                    <span className="admin-detail-value">
                      {selectedBooking.preferredContactMethod || "WhatsApp"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Contact Time:</span>
                    <span className="admin-detail-value">
                      {selectedBooking.preferredContactTime || "-"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div className="admin-detail-section">
                <h3 className="admin-detail-section-title">
                  🧹 Service Details
                </h3>
                <div className="admin-detail-grid">
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Service:</span>
                    <span className="admin-detail-value">
                      {selectedBooking.service || "-"}
                    </span>
                  </div>
                  {selectedBooking.serviceOther && (
                    <div className="admin-detail-item">
                      <span className="admin-detail-label">
                        Service (Other):
                      </span>
                      <span className="admin-detail-value">
                        {selectedBooking.serviceOther}
                      </span>
                    </div>
                  )}
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Hours:</span>
                    <span className="admin-detail-value">
                      {selectedBooking.hours || "-"} hours
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">
                      Service Frequency:
                    </span>
                    <span className="admin-detail-value">
                      {selectedBooking.serviceFrequency || "One-time"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">
                      Cleaning Materials:
                    </span>
                    <span className="admin-detail-value">
                      {selectedBooking.cleaningMaterials || "Cleaner Provides"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Bedrooms:</span>
                    <span className="admin-detail-value">
                      {selectedBooking.numBedrooms || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Bathrooms:</span>
                    <span className="admin-detail-value">
                      {selectedBooking.numBathrooms || "-"}
                    </span>
                  </div>
                </div>

                {/* Special Areas */}
                <div className="admin-detail-subsection">
                  <h4 className="admin-detail-subtitle">
                    Special Areas to Clean:
                  </h4>
                  <div className="admin-detail-tags">
                    {selectedBooking.cleanBalcony && (
                      <span className="admin-detail-tag">✓ Balcony</span>
                    )}
                    {selectedBooking.cleanTerrace && (
                      <span className="admin-detail-tag">✓ Terrace</span>
                    )}
                    {selectedBooking.cleanStaircase && (
                      <span className="admin-detail-tag">✓ Staircase</span>
                    )}
                    {selectedBooking.cleanParking && (
                      <span className="admin-detail-tag">✓ Parking</span>
                    )}
                    {!selectedBooking.cleanBalcony &&
                      !selectedBooking.cleanTerrace &&
                      !selectedBooking.cleanStaircase &&
                      !selectedBooking.cleanParking && (
                        <span className="admin-detail-value-muted">
                          No special areas selected
                        </span>
                      )}
                  </div>
                </div>
              </div>

              {/* Location & Address */}
              <div className="admin-detail-section">
                <h3 className="admin-detail-section-title">
                  📍 Location & Address
                </h3>
                <div className="admin-detail-grid">
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Area:</span>
                    <span className="admin-detail-value">
                      {selectedBooking.area || "-"}
                    </span>
                  </div>
                  {selectedBooking.areaOther && (
                    <div className="admin-detail-item">
                      <span className="admin-detail-label">Area (Other):</span>
                      <span className="admin-detail-value">
                        {selectedBooking.areaOther}
                      </span>
                    </div>
                  )}
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Address Line 1:</span>
                    <span className="admin-detail-value">
                      {selectedBooking.address1 || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Address Line 2:</span>
                    <span className="admin-detail-value">
                      {selectedBooking.address2 || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">City:</span>
                    <span className="admin-detail-value">
                      {selectedBooking.city || "Coimbatore"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">State:</span>
                    <span className="admin-detail-value">
                      {selectedBooking.state || "Tamil Nadu"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Country:</span>
                    <span className="admin-detail-value">
                      {selectedBooking.country || "India"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Pincode:</span>
                    <span className="admin-detail-value">
                      {selectedBooking.pincode || "-"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Schedule & Pricing */}
              <div className="admin-detail-section">
                <h3 className="admin-detail-section-title">
                  📅 Schedule & Pricing
                </h3>
                <div className="admin-detail-grid">
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Date:</span>
                    <span className="admin-detail-value">
                      {selectedBooking.date || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Time Slot:</span>
                    <span className="admin-detail-value">
                      {selectedBooking.timeSlot || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Estimated Price:</span>
                    <span className="admin-detail-value admin-detail-value-price">
                      ₹{selectedBooking.estimatedPrice || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Status:</span>
                    <span
                      className={`admin-status-badge ${getStatusClass(
                        selectedBooking.status
                      )}`}
                    >
                      {selectedBooking.status || "New"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="admin-detail-section">
                <h3 className="admin-detail-section-title">
                  🏠 Property Details
                </h3>
                <div className="admin-detail-grid">
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Property Type:</span>
                    <span className="admin-detail-value">
                      {selectedBooking.propertyType || "-"}
                    </span>
                  </div>
                  {selectedBooking.propertyTypeOther && (
                    <div className="admin-detail-item">
                      <span className="admin-detail-label">
                        Property Type (Other):
                      </span>
                      <span className="admin-detail-value">
                        {selectedBooking.propertyTypeOther}
                      </span>
                    </div>
                  )}
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Floor Count:</span>
                    <span className="admin-detail-value">
                      {selectedBooking.floorCount || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">
                      Approx Area (sqft):
                    </span>
                    <span className="admin-detail-value">
                      {selectedBooking.approxAreaSqft || "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Pets at Home:</span>
                    <span className="admin-detail-value">
                      {selectedBooking.petsAtHome || "No"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Property Access:</span>
                    <span className="admin-detail-value">
                      {selectedBooking.propertyAccess || "Customer Present"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cleaner Preferences */}
              <div className="admin-detail-section">
                <h3 className="admin-detail-section-title">
                  ⭐ Cleaner Preferences
                </h3>
                <div className="admin-detail-grid">
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">
                      Gender Preference:
                    </span>
                    <span className="admin-detail-value">
                      {selectedBooking.cleanerGenderPreference ||
                        "No Preference"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">
                      Experience Preference:
                    </span>
                    <span className="admin-detail-value">
                      {selectedBooking.cleanerExperiencePreference || "Any"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">
                      Assigned Cleaner:
                    </span>
                    <span className="admin-detail-value">
                      {selectedBooking.assignedCleaner || "Unassigned"}
                    </span>
                  </div>
                </div>

                <div className="admin-detail-subsection">
                  <h4 className="admin-detail-subtitle">
                    Language Requirements:
                  </h4>
                  <div className="admin-detail-tags">
                    {selectedBooking.languageTamil && (
                      <span className="admin-detail-tag">✓ Tamil</span>
                    )}
                    {selectedBooking.languageEnglish && (
                      <span className="admin-detail-tag">✓ English</span>
                    )}
                    {selectedBooking.languageHindi && (
                      <span className="admin-detail-tag">✓ Hindi</span>
                    )}
                    {selectedBooking.languageMalayalam && (
                      <span className="admin-detail-tag">✓ Malayalam</span>
                    )}
                    {!selectedBooking.languageTamil &&
                      !selectedBooking.languageEnglish &&
                      !selectedBooking.languageHindi &&
                      !selectedBooking.languageMalayalam && (
                        <span className="admin-detail-value-muted">
                          No language preference specified
                        </span>
                      )}
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              {selectedBooking.notes && (
                <div className="admin-detail-section">
                  <h3 className="admin-detail-section-title">
                    📝 Additional Notes
                  </h3>
                  <div className="admin-detail-notes">
                    {selectedBooking.notes}
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className="admin-detail-section">
                <h3 className="admin-detail-section-title">ℹ️ Metadata</h3>
                <div className="admin-detail-grid">
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Booking ID:</span>
                    <span className="admin-detail-value admin-detail-value-mono">
                      {selectedBooking._id}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Created At:</span>
                    <span className="admin-detail-value">
                      {selectedBooking.createdAt
                        ? new Date(selectedBooking.createdAt).toLocaleString()
                        : "-"}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Last Updated:</span>
                    <span className="admin-detail-value">
                      {selectedBooking.updatedAt
                        ? new Date(selectedBooking.updatedAt).toLocaleString()
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
