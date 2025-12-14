// src/pages/Bookings.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";

const TOKEN_KEY = "HOMECAREPRO_ADMIN_TOKEN";
const API_BASE = "http://localhost:4000";

// Inline styles for expanded details
const detailRowStyle = {
  padding: "5px 0",
  borderBottom: "1px solid #eee",
};

const VALID_STATUSES = [
  "New",
  "Assigned",
  "In Progress",
  "Completed",
  "Cancelled",
];

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [cleaners, setCleaners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingRows, setSavingRows] = useState({}); // Track which row is saving

  // Filter states
  const [filterDate, setFilterDate] = useState("");
  const [filterArea, setFilterArea] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [searchText, setSearchText] = useState("");
  const [expandedRow, setExpandedRow] = useState(null); // For showing full details

  const navigate = useNavigate();

  // API helper with auth
  const apiFetch = async (url, options = {}) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      navigate("/admin/login");
      throw new Error("No token");
    }

    const response = await fetch(`${API_BASE}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (response.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      navigate("/admin/login");
      throw new Error("Unauthorized");
    }

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || "Request failed");
    }

    return response.json();
  };

  // Load bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await apiFetch("/api/bookings");
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError(err.message || "Unable to load bookings");
    } finally {
      setLoading(false);
    }
  };

  // Load cleaners for dropdown
  const fetchCleaners = async () => {
    try {
      const data = await apiFetch("/api/cleaners");
      setCleaners(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching cleaners:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchBookings();
    fetchCleaners();
  }, [navigate]);

  // Update booking field
  const updateBooking = async (bookingId, field, value) => {
    setSavingRows((prev) => ({ ...prev, [bookingId]: true }));

    try {
      const updated = await apiFetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        body: JSON.stringify({ [field]: value }),
      });

      // Update local state
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? updated : b))
      );
    } catch (err) {
      console.error(`Error updating ${field}:`, err);
      alert(`Failed to update ${field}: ${err.message}`);
    } finally {
      setSavingRows((prev) => ({ ...prev, [bookingId]: false }));
    }
  };

  // Filter logic (client-side) - safely handle missing fields
  const filteredBookings = bookings.filter((booking) => {
    if (filterDate && getFieldValue(booking, "date", "") !== filterDate)
      return false;
    if (
      filterArea &&
      !getFieldValue(booking, "area", "")
        .toLowerCase()
        .includes(filterArea.toLowerCase())
    )
      return false;
    if (
      filterStatus &&
      getFieldValue(booking, "status", "New") !== filterStatus
    )
      return false;
    if (searchText) {
      const search = searchText.toLowerCase();
      const name = `${getFieldValue(booking, "firstName", "")} ${getFieldValue(
        booking,
        "lastName",
        ""
      )}`.toLowerCase();
      const phone = getFieldValue(booking, "phone", "").toLowerCase();
      if (!name.includes(search) && !phone.includes(search)) return false;
    }
    return true;
  });

  return (
    <MainLayout>
      <div style={{ padding: "20px" }}>
        <h1 style={{ marginBottom: "20px" }}>📋 Booking Management</h1>

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
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            placeholder="Filter by date"
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="text"
            value={filterArea}
            onChange={(e) => setFilterArea(e.target.value)}
            placeholder="Filter by area"
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "150px",
            }}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">All Statuses</option>
            {VALID_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search name or phone"
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              flex: "1",
              minWidth: "200px",
            }}
          />
          {(filterDate || filterArea || filterStatus || searchText) && (
            <button
              onClick={() => {
                setFilterDate("");
                setFilterArea("");
                setFilterStatus("");
                setSearchText("");
              }}
              style={{
                padding: "8px 12px",
                borderRadius: "4px",
                border: "1px solid #999",
                backgroundColor: "#fff",
                cursor: "pointer",
              }}
            >
              Clear Filters
            </button>
          )}
        </div>

        {loading ? (
          <p>Loading bookings...</p>
        ) : filteredBookings.length === 0 ? (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              backgroundColor: "#f9f9f9",
              borderRadius: "4px",
              color: "#666",
            }}
          >
            {bookings.length === 0
              ? "📭 No bookings yet"
              : "🔍 No bookings match your filters"}
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                backgroundColor: "#fff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "#f5f5f5",
                    borderBottom: "2px solid #ddd",
                  }}
                >
                  <th style={thStyle}>Details</th>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Phone</th>
                  <th style={thStyle}>Service</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Assigned</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => {
                  const isSaving = savingRows[booking._id];
                  const isExpanded = expandedRow === booking._id;

                  return (
                    <React.Fragment key={booking._id}>
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
                              setExpandedRow(isExpanded ? null : booking._id)
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
                          {booking.firstName} {booking.lastName}
                        </td>
                        <td style={tdStyle}>{booking.phone}</td>
                        <td style={tdStyle}>{booking.service}</td>
                        <td style={tdStyle}>{booking.date}</td>

                        {/* Editable Status */}
                        <td style={tdStyle}>
                          <select
                            value={booking.status || "New"}
                            onChange={(e) =>
                              updateBooking(
                                booking._id,
                                "status",
                                e.target.value
                              )
                            }
                            disabled={isSaving}
                            style={{
                              ...inputStyle,
                              backgroundColor: getStatusColor(booking.status),
                              fontWeight: "600",
                              color: "#fff",
                            }}
                          >
                            {VALID_STATUSES.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </td>

                        {/* Editable Assigned Cleaner */}
                        <td style={tdStyle}>
                          <select
                            value={booking.assignedCleaner || ""}
                            onChange={(e) =>
                              updateBooking(
                                booking._id,
                                "assignedCleaner",
                                e.target.value
                              )
                            }
                            disabled={isSaving}
                            style={inputStyle}
                          >
                            <option value="">-- Unassigned --</option>
                            {cleaners.map((cleaner) => (
                              <option key={cleaner._id} value={cleaner.name}>
                                {cleaner.name}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>

                      {/* Expanded Details Row */}
                      {isExpanded && (
                        <tr>
                          <td
                            colSpan="7"
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
                              {/* Contact Information */}
                              <div>
                                <h4 style={{ marginTop: 0, color: "#007bff" }}>
                                  Contact Information
                                </h4>
                                <div style={detailRowStyle}>
                                  <strong>Full Name:</strong>{" "}
                                  {booking.firstName} {booking.lastName}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Phone:</strong>{" "}
                                  {booking.phone || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Email:</strong>{" "}
                                  {booking.email || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Preferred Contact:</strong>{" "}
                                  {booking.preferredContactMethod || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Preferred Time:</strong>{" "}
                                  {booking.preferredContactTime || "N/A"}
                                </div>
                              </div>

                              {/* Service Details */}
                              <div>
                                <h4 style={{ marginTop: 0, color: "#007bff" }}>
                                  Service Details
                                </h4>
                                <div style={detailRowStyle}>
                                  <strong>Service:</strong>{" "}
                                  {booking.service || "N/A"}
                                  {booking.serviceOther &&
                                    ` (${booking.serviceOther})`}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Area:</strong> {booking.area || "N/A"}
                                  {booking.areaOther &&
                                    ` (${booking.areaOther})`}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Hours:</strong>{" "}
                                  {booking.hours || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Estimated Price:</strong> ₹
                                  {booking.estimatedPrice || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Date:</strong> {booking.date || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Time Slot:</strong>
                                  <input
                                    type="text"
                                    value={booking.timeSlot || ""}
                                    onChange={(e) =>
                                      updateBooking(
                                        booking._id,
                                        "timeSlot",
                                        e.target.value
                                      )
                                    }
                                    placeholder="e.g. 9-11 AM"
                                    style={{
                                      ...inputStyle,
                                      marginLeft: "10px",
                                      width: "150px",
                                    }}
                                  />
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Frequency:</strong>{" "}
                                  {booking.serviceFrequency || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Cleaning Materials:</strong>{" "}
                                  {booking.cleaningMaterials || "N/A"}
                                </div>
                              </div>

                              {/* Address */}
                              <div>
                                <h4 style={{ marginTop: 0, color: "#007bff" }}>
                                  Address
                                </h4>
                                <div style={detailRowStyle}>
                                  <strong>Address 1:</strong>{" "}
                                  {booking.address1 || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Address 2:</strong>{" "}
                                  {booking.address2 || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>City:</strong> {booking.city || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>State:</strong>{" "}
                                  {booking.state || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Pincode:</strong>{" "}
                                  {booking.pincode || "N/A"}
                                </div>
                              </div>

                              {/* Property Details */}
                              <div>
                                <h4 style={{ marginTop: 0, color: "#007bff" }}>
                                  Property Details
                                </h4>
                                <div style={detailRowStyle}>
                                  <strong>Bedrooms:</strong>{" "}
                                  {booking.numBedrooms || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Bathrooms:</strong>{" "}
                                  {booking.numBathrooms || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Property Type:</strong>{" "}
                                  {booking.propertyType || "N/A"}
                                  {booking.propertyTypeOther &&
                                    ` (${booking.propertyTypeOther})`}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Floor Count:</strong>{" "}
                                  {booking.floorCount || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Area (sqft):</strong>{" "}
                                  {booking.approxAreaSqft || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Pets:</strong>{" "}
                                  {booking.petsAtHome || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Access:</strong>{" "}
                                  {booking.propertyAccess || "N/A"}
                                </div>
                              </div>

                              {/* Additional Services */}
                              <div>
                                <h4 style={{ marginTop: 0, color: "#007bff" }}>
                                  Additional Services
                                </h4>
                                <div style={detailRowStyle}>
                                  <strong>Clean Balcony:</strong>{" "}
                                  {booking.cleanBalcony ? "Yes" : "No"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Clean Terrace:</strong>{" "}
                                  {booking.cleanTerrace ? "Yes" : "No"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Clean Staircase:</strong>{" "}
                                  {booking.cleanStaircase ? "Yes" : "No"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Clean Parking:</strong>{" "}
                                  {booking.cleanParking ? "Yes" : "No"}
                                </div>
                              </div>

                              {/* Cleaner Preferences */}
                              <div>
                                <h4 style={{ marginTop: 0, color: "#007bff" }}>
                                  Cleaner Preferences
                                </h4>
                                <div style={detailRowStyle}>
                                  <strong>Gender:</strong>{" "}
                                  {booking.cleanerGenderPreference || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Experience:</strong>{" "}
                                  {booking.cleanerExperiencePreference || "N/A"}
                                </div>
                                <div style={detailRowStyle}>
                                  <strong>Languages:</strong>{" "}
                                  {[
                                    booking.languageTamil && "Tamil",
                                    booking.languageEnglish && "English",
                                    booking.languageHindi && "Hindi",
                                    booking.languageMalayalam && "Malayalam",
                                  ]
                                    .filter(Boolean)
                                    .join(", ") || "N/A"}
                                </div>
                              </div>

                              {/* Admin Management */}
                              <div style={{ gridColumn: "1 / -1" }}>
                                <h4 style={{ marginTop: 0, color: "#007bff" }}>
                                  Admin Management
                                </h4>
                                <div
                                  style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr 1fr",
                                    gap: "15px",
                                  }}
                                >
                                  <div>
                                    <strong>Status:</strong>
                                    <select
                                      value={booking.status || "New"}
                                      onChange={(e) =>
                                        updateBooking(
                                          booking._id,
                                          "status",
                                          e.target.value
                                        )
                                      }
                                      style={{
                                        ...inputStyle,
                                        marginLeft: "10px",
                                        backgroundColor: getStatusColor(
                                          booking.status
                                        ),
                                        color: "#fff",
                                        fontWeight: "600",
                                      }}
                                    >
                                      {VALID_STATUSES.map((s) => (
                                        <option key={s} value={s}>
                                          {s}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div>
                                    <strong>Assigned Cleaner:</strong>
                                    <select
                                      value={booking.assignedCleaner || ""}
                                      onChange={(e) =>
                                        updateBooking(
                                          booking._id,
                                          "assignedCleaner",
                                          e.target.value
                                        )
                                      }
                                      style={{
                                        ...inputStyle,
                                        marginLeft: "10px",
                                      }}
                                    >
                                      <option value="">-- Unassigned --</option>
                                      {cleaners.map((cleaner) => (
                                        <option
                                          key={cleaner._id}
                                          value={cleaner.name}
                                        >
                                          {cleaner.name} ({cleaner.area})
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div>
                                    <strong>Created:</strong>{" "}
                                    {new Date(
                                      booking.createdAt
                                    ).toLocaleString()}
                                  </div>
                                </div>
                                <div style={{ marginTop: "15px" }}>
                                  <strong>Admin Notes:</strong>
                                  <textarea
                                    value={booking.adminNotes || ""}
                                    onChange={(e) =>
                                      updateBooking(
                                        booking._id,
                                        "adminNotes",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Internal admin notes..."
                                    style={{
                                      ...inputStyle,
                                      width: "100%",
                                      minHeight: "80px",
                                      marginTop: "5px",
                                      fontFamily: "inherit",
                                    }}
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Customer Notes */}
                            {booking.notes && (
                              <div
                                style={{
                                  marginTop: "15px",
                                  padding: "10px",
                                  backgroundColor: "#fff",
                                  borderRadius: "4px",
                                }}
                              >
                                <strong>Customer Notes:</strong>
                                <p style={{ margin: "5px 0 0 0" }}>
                                  {booking.notes}
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
          Total: {filteredBookings.length} booking(s)
          {filteredBookings.length !== bookings.length &&
            ` (filtered from ${bookings.length})`}
        </p>
      </div>
    </MainLayout>
  );
}

// Styles
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

const inputStyle = {
  width: "100%",
  padding: "6px",
  fontSize: "13px",
  border: "1px solid #ddd",
  borderRadius: "3px",
  fontFamily: "inherit",
};

// Status color helper
function getStatusColor(status) {
  switch (status) {
    case "New":
      return "#007bff";
    case "Assigned":
      return "#17a2b8";
    case "In Progress":
      return "#ffc107";
    case "Completed":
      return "#28a745";
    case "Cancelled":
      return "#dc3545";
    default:
      return "#6c757d";
  }
}

export default Bookings;
