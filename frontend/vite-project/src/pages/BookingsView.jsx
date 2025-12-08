import { useState } from "react";
import "./AdminTable.css";

export default function BookingsView({ bookings, loading, error }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterService, setFilterService] = useState("all");

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
            <p>Booking requests will appear here once customers start booking services.</p>
          </div>
        )}

        {!loading && !error && bookings.length > 0 && filteredBookings.length === 0 && (
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
                            <div className="admin-customer-name">{b.name || "N/A"}</div>
                            <div className="admin-customer-email">{b.email || "-"}</div>
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
                          <div className="admin-service-name">{b.service || "-"}</div>
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
                        <span className={`admin-status-badge ${getStatusClass(b.status)}`}>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
