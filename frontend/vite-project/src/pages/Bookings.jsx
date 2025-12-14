// src/pages/Bookings.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";

const TOKEN_KEY = "HOMECAREPRO_ADMIN_TOKEN";
const API_BASE = "http://localhost:4000";

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

  // Filter logic (client-side)
  const filteredBookings = bookings.filter((booking) => {
    if (filterDate && booking.date !== filterDate) return false;
    if (
      filterArea &&
      !booking.area.toLowerCase().includes(filterArea.toLowerCase())
    )
      return false;
    if (filterStatus && booking.status !== filterStatus) return false;
    if (searchText) {
      const search = searchText.toLowerCase();
      const name = `${booking.firstName} ${booking.lastName}`.toLowerCase();
      const phone = booking.phone.toLowerCase();
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
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Phone</th>
                  <th style={thStyle}>Area</th>
                  <th style={thStyle}>Service</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Time Slot</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Assigned Cleaner</th>
                  <th style={thStyle}>Admin Notes</th>
                  <th style={thStyle}>Created At</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => {
                  const isSaving = savingRows[booking._id];
                  return (
                    <tr
                      key={booking._id}
                      style={{
                        borderBottom: "1px solid #eee",
                        opacity: isSaving ? 0.6 : 1,
                        position: "relative",
                      }}
                    >
                      <td style={tdStyle}>
                        {booking.firstName} {booking.lastName}
                      </td>
                      <td style={tdStyle}>{booking.phone}</td>
                      <td style={tdStyle}>{booking.area}</td>
                      <td style={tdStyle}>{booking.service}</td>

                      {/* Editable Date */}
                      <td style={tdStyle}>
                        <input
                          type="date"
                          value={booking.date || ""}
                          onChange={(e) =>
                            updateBooking(booking._id, "date", e.target.value)
                          }
                          disabled={isSaving}
                          style={inputStyle}
                        />
                      </td>

                      {/* Editable Time Slot */}
                      <td style={tdStyle}>
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
                          disabled={isSaving}
                          placeholder="e.g. 9-11 AM"
                          style={inputStyle}
                        />
                      </td>

                      {/* Editable Status */}
                      <td style={tdStyle}>
                        <select
                          value={booking.status || "New"}
                          onChange={(e) =>
                            updateBooking(booking._id, "status", e.target.value)
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
                              {cleaner.name} ({cleaner.area})
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Editable Admin Notes */}
                      <td style={tdStyle}>
                        <textarea
                          value={booking.adminNotes || ""}
                          onChange={(e) =>
                            updateBooking(
                              booking._id,
                              "adminNotes",
                              e.target.value
                            )
                          }
                          onBlur={(e) => {
                            // Only update on blur to avoid too many requests
                            if (e.target.value !== (booking.adminNotes || "")) {
                              updateBooking(
                                booking._id,
                                "adminNotes",
                                e.target.value
                              );
                            }
                          }}
                          disabled={isSaving}
                          placeholder="Internal notes..."
                          style={{
                            ...inputStyle,
                            minHeight: "50px",
                            resize: "vertical",
                            fontFamily: "inherit",
                          }}
                        />
                      </td>

                      <td style={tdStyle}>
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </td>

                      {isSaving && (
                        <td
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            fontWeight: "bold",
                            color: "#007bff",
                            pointerEvents: "none",
                          }}
                        >
                          Saving...
                        </td>
                      )}
                    </tr>
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
