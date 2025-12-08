import { useState } from "react";
import "./CleanersAdmin.css";

export default function CleanersView({ cleaners, loading, error }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterExperience, setFilterExperience] = useState("all");

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
      (filterExperience === "3-5" && cleaner.experienceYears >= 3 && cleaner.experienceYears <= 5) ||
      (filterExperience === "5+" && cleaner.experienceYears > 5);

    return matchesSearch && matchesStatus && matchesExperience;
  });

  // Calculate stats
  const stats = {
    total: cleaners.length,
    active: cleaners.filter((c) => c.isActive).length,
    inactive: cleaners.filter((c) => !c.isActive).length,
    avgExperience: cleaners.length > 0
      ? (cleaners.reduce((sum, c) => sum + (c.experienceYears || 0), 0) / cleaners.length).toFixed(1)
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
            Manage your cleaning staff, track experience, and monitor availability
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
            <p>Cleaner applications will appear here once staff members apply.</p>
          </div>
        )}

        {!loading && !error && cleaners.length > 0 && filteredCleaners.length === 0 && (
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
                        cleaner.isActive ? "cleaner-status-active" : "cleaner-status-inactive"
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
                      <div className="cleaner-info-value">{cleaner.phone || "-"}</div>
                    </div>
                  </div>
                  <div className="cleaner-info-row">
                    <span className="cleaner-info-icon">📍</span>
                    <div className="cleaner-info-content">
                      <div className="cleaner-info-label">Area</div>
                      <div className="cleaner-info-value">{cleaner.area || "-"}</div>
                    </div>
                  </div>
                  <div className="cleaner-info-row">
                    <span className="cleaner-info-icon">⭐</span>
                    <div className="cleaner-info-content">
                      <div className="cleaner-info-label">Experience</div>
                      <div className="cleaner-info-value">
                        {cleaner.experienceYears ? `${cleaner.experienceYears} years` : "Not specified"}
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
                    <div className="cleaner-notes">
                      {cleaner.notes}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="cleaner-card-footer">
                  <span className="cleaner-footer-text">
                    Registered: {cleaner.createdAt ? new Date(cleaner.createdAt).toLocaleDateString() : "-"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
