// src/pages/AdminCleaners.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";

const TOKEN_KEY = "HOMECAREPRO_ADMIN_TOKEN";
const API_BASE = "http://localhost:4000";

const APPLICATION_STATUSES = ["Pending", "Approved", "Rejected", "Hold"];

// Helper to safely access fields with fallback (available for future use)
const _getFieldValue = (obj, field, fallback = "N/A") => {
  const value = obj?.[field];
  if (value === undefined || value === null || value === "") {
    return fallback;
  }
  return value;
};

// Helper to safely get array fields (available for future use)
const _getArrayField = (obj, field, fallback = []) => {
  const value = obj?.[field];
  if (Array.isArray(value)) return value;
  if (typeof value === "string" && value) {
    return value.split(",").map((s) => s.trim());
  }
  return fallback;
};

export default function AdminCleaners() {
  const [cleaners, setCleaners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingRows, setSavingRows] = useState({});

  // Filters
  const [filterArea, setFilterArea] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterActive, setFilterActive] = useState("");
  const [filterServices, setFilterServices] = useState("");
  const [searchText, setSearchText] = useState("");
  const [expandedRow, setExpandedRow] = useState(null); // For showing full details

  const navigate = useNavigate();

  // API helper
  const apiFetch = async (url, options = {}) => {
    const token = localStorage.getItem(TOKEN_KEY);
    console.log("🔑 Token found:", token ? "Yes" : "No");

    if (!token) {
      console.error("❌ No token - redirecting to login");
      navigate("/admin/login");
      throw new Error("No token");
    }

    const fullUrl = `${API_BASE}${url}`;
    console.log("📡 Making request to:", fullUrl);
    console.log("📋 With headers:", {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.substring(0, 20)}...`,
    });

    const response = await fetch(fullUrl, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    console.log("📥 Response status:", response.status, response.statusText);

    if (response.status === 401) {
      console.error("❌ Unauthorized - token invalid");
      localStorage.removeItem(TOKEN_KEY);
      navigate("/admin/login");
      throw new Error("Unauthorized");
    }

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.error("❌ Request failed:", errData);
      throw new Error(errData.message || "Request failed");
    }

    return response.json();
  };

  // Load cleaners with metrics
  const fetchCleaners = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      console.log("🔍 Fetching cleaners from /api/admin/cleaners...");
      const data = await apiFetch("/api/admin/cleaners");
      console.log("✅ Received cleaners data:", data);
      console.log(
        "📊 Number of cleaners:",
        Array.isArray(data) ? data.length : 0
      );
      setCleaners(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("❌ Error fetching cleaners:", err);
      setError(err.message || "Unable to load cleaners");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchCleaners();
  }, [navigate, fetchCleaners]);

  // Update cleaner status
  const updateStatus = async (cleanerId, status, notes = "") => {
    setSavingRows((prev) => ({ ...prev, [cleanerId]: true }));

    try {
      const updated = await apiFetch(
        `/api/admin/cleaners/${cleanerId}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({
            applicationStatus: status,
            reviewNotes: notes,
          }),
        }
      );

      setCleaners((prev) =>
        prev.map((c) => (c._id === cleanerId ? { ...c, ...updated } : c))
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert(`Failed to update status: ${err.message}`);
    } finally {
      setSavingRows((prev) => ({ ...prev, [cleanerId]: false }));
    }
  };

  // Toggle active status
  const toggleActive = async (cleanerId, currentStatus) => {
    setSavingRows((prev) => ({ ...prev, [cleanerId]: true }));

    try {
      const updated = await apiFetch(
        `/api/admin/cleaners/${cleanerId}/active`,
        {
          method: "PATCH",
          body: JSON.stringify({ isActive: !currentStatus }),
        }
      );

      setCleaners((prev) =>
        prev.map((c) => (c._id === cleanerId ? { ...c, ...updated } : c))
      );
    } catch (err) {
      console.error("Error toggling active:", err);
      alert(`Failed to toggle active: ${err.message}`);
    } finally {
      setSavingRows((prev) => ({ ...prev, [cleanerId]: false }));
    }
  };

  // Filter logic - safely handle missing fields
  const filteredCleaners = cleaners.filter((cleaner) => {
    if (
      filterArea &&
      !cleaner.area?.toLowerCase().includes(filterArea.toLowerCase())
    )
      return false;
    if (filterStatus && cleaner.applicationStatus !== filterStatus)
      return false;
    if (filterActive === "active" && !cleaner.isActive) return false;
    if (filterActive === "inactive" && cleaner.isActive) return false;

    if (filterServices) {
      const services = Array.isArray(cleaner.servicesOffered)
        ? cleaner.servicesOffered
        : (cleaner.servicesOffered || "").split(",");
      const hasService = services.some((s) =>
        s.toLowerCase().includes(filterServices.toLowerCase())
      );
      if (!hasService) return false;
    }

    if (searchText) {
      const search = searchText.toLowerCase();
      const name = (cleaner.name || "").toLowerCase();
      const phone = (cleaner.phone || "").toLowerCase();
      const email = (cleaner.email || "").toLowerCase();
      if (
        !name.includes(search) &&
        !phone.includes(search) &&
        !email.includes(search)
      )
        return false;
    }

    return true;
  });

  console.log("📋 Total cleaners:", cleaners.length);
  console.log("🔍 Filtered cleaners:", filteredCleaners.length);

  return (
    <MainLayout>
      <div style={{ padding: "20px" }}>
        <h1 style={{ marginBottom: "20px" }}>🧹 Cleaner Management</h1>

        {error && (
          <div
            style={{
              padding: "10px",
              marginBottom: "20px",
              backgroundColor: "#fee",
              border: "1px solid #fcc",
              borderRadius: "4px",
              color: "#c00",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* Filters */}
        <div
          style={{
            marginBottom: "20px",
            padding: "15px",
            backgroundColor: "#f9f9f9",
            borderRadius: "4px",
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            value={filterArea}
            onChange={(e) => setFilterArea(e.target.value)}
            placeholder="Filter by area"
            style={filterInputStyle}
          />

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={filterInputStyle}
          >
            <option value="">All Statuses</option>
            {APPLICATION_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            value={filterActive}
            onChange={(e) => setFilterActive(e.target.value)}
            style={filterInputStyle}
          >
            <option value="">All (Active/Inactive)</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>

          <input
            type="text"
            value={filterServices}
            onChange={(e) => setFilterServices(e.target.value)}
            placeholder="Filter by service"
            style={filterInputStyle}
          />

          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search name or phone"
            style={{ ...filterInputStyle, flex: "1", minWidth: "200px" }}
          />

          {(filterArea ||
            filterStatus ||
            filterActive ||
            filterServices ||
            searchText) && (
            <button
              onClick={() => {
                setFilterArea("");
                setFilterStatus("");
                setFilterActive("");
                setFilterServices("");
                setSearchText("");
              }}
              style={clearButtonStyle}
            >
              Clear Filters
            </button>
          )}
        </div>

        {loading ? (
          <p>Loading cleaners...</p>
        ) : filteredCleaners.length === 0 ? (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              backgroundColor: "#f9f9f9",
              borderRadius: "4px",
              color: "#666",
            }}
          >
            {cleaners.length === 0
              ? "📭 No cleaner applications yet"
              : "🔍 No cleaners match your filters"}
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead>
                <tr style={theadStyle}>
                  <th style={thStyle}>Details</th>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Phone</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Area</th>
                  <th style={thStyle}>Experience</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Active</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCleaners.map((cleaner) => {
                  const isSaving = savingRows[cleaner._id];
                  const services = Array.isArray(cleaner.servicesOffered)
                    ? cleaner.servicesOffered.join(", ")
                    : cleaner.servicesOffered || "N/A";
                  const isExpanded = expandedRow === cleaner._id;

                  return (
                    <React.Fragment key={cleaner._id}>
                      <tr
                        style={{
                          borderBottom: "1px solid #eee",
                          opacity: isSaving ? 0.6 : 1,
                          backgroundColor: isExpanded
                            ? "#f0f8ff"
                            : "transparent",
                        }}
                      >
                        {/* Expand/Collapse Button */}
                        <td style={tdStyle}>
                          <button
                            onClick={() =>
                              setExpandedRow(isExpanded ? null : cleaner._id)
                            }
                            style={{
                              padding: "4px 8px",
                              fontSize: "12px",
                              cursor: "pointer",
                              border: "1px solid #ccc",
                              borderRadius: "3px",
                              backgroundColor: isExpanded ? "#007bff" : "#fff",
                              color: isExpanded ? "#fff" : "#333",
                            }}
                          >
                            {isExpanded ? "▼" : "►"}
                          </button>
                        </td>
                        <td style={tdStyle}>
                          {cleaner.name ||
                            `${cleaner.firstName || ""} ${
                              cleaner.lastName || ""
                            }`}
                        </td>
                        <td style={tdStyle}>{cleaner.phone || "N/A"}</td>
                        <td style={tdStyle}>{cleaner.email || "N/A"}</td>
                        <td style={tdStyle}>{cleaner.area || "N/A"}</td>
                        <td style={tdStyle}>
                          {cleaner.experienceYears || "N/A"}
                        </td>

                        {/* Status Dropdown */}
                        <td style={tdStyle}>
                          <select
                            value={cleaner.applicationStatus || "Pending"}
                            onChange={(e) =>
                              updateStatus(cleaner._id, e.target.value)
                            }
                            disabled={isSaving}
                            style={{
                              ...statusSelectStyle,
                              backgroundColor: getStatusColor(
                                cleaner.applicationStatus
                              ),
                              color: "#fff",
                              fontWeight: "600",
                            }}
                          >
                            {APPLICATION_STATUSES.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </td>

                        {/* Active Toggle */}
                        <td style={tdStyle}>
                          <button
                            onClick={() =>
                              toggleActive(cleaner._id, cleaner.isActive)
                            }
                            disabled={isSaving}
                            style={{
                              ...toggleButtonStyle,
                              backgroundColor: cleaner.isActive
                                ? "#28a745"
                                : "#dc3545",
                            }}
                          >
                            {cleaner.isActive ? "✓" : "✗"}
                          </button>
                        </td>

                        {/* Actions */}
                        <td style={tdStyle}>
                          {cleaner.applicationStatus === "Pending" && (
                            <div
                              style={{
                                display: "flex",
                                gap: "5px",
                              }}
                            >
                              <button
                                onClick={() =>
                                  updateStatus(cleaner._id, "Approved")
                                }
                                disabled={isSaving}
                                style={{
                                  ...actionButtonStyle,
                                  backgroundColor: "#28a745",
                                  fontSize: "11px",
                                  padding: "4px 8px",
                                }}
                              >
                                ✓
                              </button>
                              <button
                                onClick={() =>
                                  updateStatus(cleaner._id, "Rejected")
                                }
                                disabled={isSaving}
                                style={{
                                  ...actionButtonStyle,
                                  backgroundColor: "#dc3545",
                                  fontSize: "11px",
                                  padding: "4px 8px",
                                }}
                              >
                                ✗
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>

                      {/* Expanded Details Row */}
                      {isExpanded && (
                        <tr key={`${cleaner._id}-details`}>
                          <td
                            colSpan="9"
                            style={{
                              padding: "20px",
                              backgroundColor: "#f9f9f9",
                            }}
                          >
                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr 1fr",
                                gap: "20px",
                              }}
                            >
                              {/* Personal Info */}
                              <div>
                                <h4 style={{ marginTop: 0, color: "#007bff" }}>
                                  Personal Information
                                </h4>
                                <div style={detailRowStyle}>
                                  <strong>First Name:</strong>{" "}
                                  {cleaner.firstName || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Last Name:</strong>{" "}
                                  {cleaner.lastName || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Email:</strong>{" "}
                                  {cleaner.email || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Phone:</strong>{" "}
                                  {cleaner.phone || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Preferred Contact:</strong>{" "}
                                  {cleaner.preferredContactMethod || "N/A"}
                                </div>
                              </div>

                              {/* Address Info */}
                              <div>
                                <h4 style={{ marginTop: 0, color: "#007bff" }}>
                                  Address
                                </h4>
                                <div style={detailRowStyle}>
                                  <strong>Address:</strong>{" "}
                                  {cleaner.address1 || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>City:</strong> {cleaner.city || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>State:</strong>{" "}
                                  {cleaner.state || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Pincode:</strong>{" "}
                                  {cleaner.pincode || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Primary Area:</strong>{" "}
                                  {cleaner.area || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Areas Served:</strong>{" "}
                                  {Array.isArray(cleaner.areasServed)
                                    ? cleaner.areasServed.join(", ")
                                    : cleaner.areasServed || "N/A"}
                                </div>
                              </div>

                              {/* Work Info */}
                              <div>
                                <h4 style={{ marginTop: 0, color: "#007bff" }}>
                                  Work Details
                                </h4>
                                <div style={detailRowStyle}>
                                  <strong>Experience:</strong>{" "}
                                  {cleaner.experienceYears || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Type of Work:</strong>{" "}
                                  {Array.isArray(cleaner.typeOfWork)
                                    ? cleaner.typeOfWork.join(", ")
                                    : cleaner.typeOfWork || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Expected Salary/Job:</strong>{" "}
                                  {cleaner.expectedSalaryPerJob || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Services Offered:</strong> {services}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Languages:</strong>{" "}
                                  {cleaner.languagesKnown || "N/A"}
                                </div>
                              </div>

                              {/* ID Proof */}
                              <div>
                                <h4 style={{ marginTop: 0, color: "#007bff" }}>
                                  Identification
                                </h4>
                                <div style={detailRowStyle}>
                                  <strong>ID Proof Type:</strong>{" "}
                                  {cleaner.idProofType || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>ID Proof Number:</strong>{" "}
                                  {cleaner.idProofNumber || "N/A"}
                                </div>
                              </div>

                              {/* Availability */}
                              <div>
                                <h4 style={{ marginTop: 0, color: "#007bff" }}>
                                  Availability
                                </h4>
                                <div style={detailRowStyle}>
                                  <strong>Days:</strong>{" "}
                                  {cleaner.availability?.days?.join(", ") ||
                                    "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Time Windows:</strong>{" "}
                                  {cleaner.availability?.timeWindows?.join(
                                    ", "
                                  ) || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Max Jobs/Day:</strong>{" "}
                                  {cleaner.availability?.maxJobsPerDay || "N/A"}
                                </div>
                              </div>

                              {/* Metrics & Status */}
                              <div>
                                <h4 style={{ marginTop: 0, color: "#007bff" }}>
                                  Performance & Status
                                </h4>
                                <div style={detailRowStyle}>
                                  <strong>Application Status:</strong>{" "}
                                  <span
                                    style={{
                                      padding: "2px 8px",
                                      borderRadius: "3px",
                                      backgroundColor: getStatusColor(
                                        cleaner.applicationStatus
                                      ),
                                      color: "#fff",
                                    }}
                                  >
                                    {cleaner.applicationStatus}
                                  </span>
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Active:</strong>{" "}
                                  {cleaner.isActive ? "Yes" : "No"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Jobs Assigned:</strong>{" "}
                                  {cleaner.metrics?.totalAssigned || 0}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Completed:</strong>{" "}
                                  {cleaner.metrics?.completed || 0}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Completion Rate:</strong>{" "}
                                  {cleaner.metrics?.completionRate || 0}%
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Source:</strong>{" "}
                                  {cleaner.source || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Applied:</strong>{" "}
                                  {cleaner.createdAt
                                    ? new Date(
                                        cleaner.createdAt
                                      ).toLocaleString()
                                    : "N/A"}
                                </div>
                              </div>
                            </div>

                            {/* Notes Section */}
                            {cleaner.notes && (
                              <div
                                style={{
                                  marginTop: "15px",
                                  padding: "10px",
                                  backgroundColor: "#fff",
                                  borderRadius: "4px",
                                }}
                              >
                                <strong>Applicant Notes:</strong>
                                <p style={{ margin: "5px 0 0 0" }}>
                                  {cleaner.notes}
                                </p>
                              </div>
                            )}

                            {cleaner.reviewNotes && (
                              <div
                                style={{
                                  marginTop: "10px",
                                  padding: "10px",
                                  backgroundColor: "#fffacd",
                                  borderRadius: "4px",
                                }}
                              >
                                <strong>Admin Review Notes:</strong>
                                <p style={{ margin: "5px 0 0 0" }}>
                                  {cleaner.reviewNotes}
                                </p>
                              </div>
                            )}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <p style={{ marginTop: "20px", color: "#666", fontSize: "14px" }}>
          Total: {filteredCleaners.length} cleaner(s)
          {filteredCleaners.length !== cleaners.length &&
            ` (filtered from ${cleaners.length})`}
        </p>
      </div>
    </MainLayout>
  );
}

// Styles
const filterInputStyle = {
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const clearButtonStyle = {
  padding: "8px 12px",
  borderRadius: "4px",
  border: "1px solid #999",
  backgroundColor: "#fff",
  cursor: "pointer",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "#fff",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
};

const theadStyle = {
  backgroundColor: "#f5f5f5",
  borderBottom: "2px solid #ddd",
};

const thStyle = {
  padding: "12px 8px",
  textAlign: "left",
  fontWeight: "600",
  fontSize: "14px",
  color: "#333",
};

const tdStyle = {
  padding: "8px",
  fontSize: "13px",
  verticalAlign: "top",
};

const statusSelectStyle = {
  padding: "6px",
  fontSize: "13px",
  border: "1px solid #ddd",
  borderRadius: "3px",
  width: "100%",
};

const detailRowStyle = {
  padding: "5px 0",
  fontSize: "13px",
  borderBottom: "1px solid #eee",
};

const toggleButtonStyle = {
  padding: "6px 12px",
  fontSize: "12px",
  fontWeight: "600",
  color: "#fff",
  border: "none",
  borderRadius: "3px",
  cursor: "pointer",
  width: "100%",
};

const actionButtonStyle = {
  padding: "6px 12px",
  fontSize: "12px",
  fontWeight: "600",
  color: "#fff",
  border: "none",
  borderRadius: "3px",
  cursor: "pointer",
  width: "100%",
};

function getStatusColor(status) {
  switch (status) {
    case "Pending":
      return "#ffc107";
    case "Approved":
      return "#28a745";
    case "Rejected":
      return "#dc3545";
    case "Hold":
      return "#17a2b8";
    default:
      return "#6c757d";
  }
}
