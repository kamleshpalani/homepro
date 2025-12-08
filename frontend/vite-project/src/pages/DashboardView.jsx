import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function DashboardView({
  user,
  bookings,
  activeTab,
  setActiveTab,
  editMode,
  setEditMode,
  editForm,
  onEditChange,
  onUpdateProfile,
  addressForm,
  onAddressChange,
  showAddressForm,
  setShowAddressForm,
  onAddAddress,
  onDeleteAddress,
  onLogout,
  message,
}) {
  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "bookings", label: "My Bookings", icon: "📅" },
    { id: "addresses", label: "Addresses", icon: "📍" },
    { id: "profile", label: "Profile", icon: "👤" },
  ];

  const getStatusClass = (status) => {
    const statusLower = (status || "New").toLowerCase();
    switch (statusLower) {
      case "completed":
        return "status-completed";
      case "in progress":
        return "status-progress";
      case "cancelled":
        return "status-cancelled";
      default:
        return "status-new";
    }
  };

  // Calculate stats
  const stats = {
    total: bookings.length,
    completed: bookings.filter((b) => b.status === "Completed").length,
    upcoming: bookings.filter(
      (b) => b.status !== "Completed" && b.status !== "Cancelled"
    ).length,
    addresses: user?.addresses?.length || 0,
  };

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-welcome">
            <h1 className="dashboard-title">
              Welcome back, <span className="dashboard-gradient">{user?.firstName}!</span>
            </h1>
            <p className="dashboard-subtitle">
              Manage your bookings, addresses, and account settings
            </p>
          </div>
          <div className="dashboard-header-actions">
            <Link to="/book" className="dashboard-book-btn">
              <span>📅</span> Book Now
            </Link>
            <button onClick={onLogout} className="dashboard-logout-btn">
              <span>🚪</span> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Sidebar */}
        <div className="dashboard-sidebar">
          <div className="dashboard-user-card">
            <div className="dashboard-user-avatar">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </div>
            <div className="dashboard-user-info">
              <h3>{user?.firstName} {user?.lastName}</h3>
              <p>{user?.email}</p>
            </div>
          </div>

          <nav className="dashboard-nav">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`dashboard-nav-item ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="dashboard-nav-icon">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Area */}
        <div className="dashboard-main">
          {message.text && (
            <div className={`dashboard-message dashboard-message-${message.type}`}>
              {message.type === "success" ? "✅" : "⚠️"} {message.text}
            </div>
          )}

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="dashboard-tab">
              <h2 className="dashboard-section-title">📊 Overview</h2>
              
              <div className="dashboard-stats-grid">
                <div className="dashboard-stat-card stat-total">
                  <div className="stat-icon">📋</div>
                  <div className="stat-value">{stats.total}</div>
                  <div className="stat-label">Total Bookings</div>
                </div>
                <div className="dashboard-stat-card stat-upcoming">
                  <div className="stat-icon">⏳</div>
                  <div className="stat-value">{stats.upcoming}</div>
                  <div className="stat-label">Upcoming</div>
                </div>
                <div className="dashboard-stat-card stat-completed">
                  <div className="stat-icon">✅</div>
                  <div className="stat-value">{stats.completed}</div>
                  <div className="stat-label">Completed</div>
                </div>
                <div className="dashboard-stat-card stat-addresses">
                  <div className="stat-icon">📍</div>
                  <div className="stat-value">{stats.addresses}</div>
                  <div className="stat-label">Saved Addresses</div>
                </div>
              </div>

              {/* Recent Bookings */}
              <div className="dashboard-recent">
                <h3 className="dashboard-recent-title">Recent Bookings</h3>
                {bookings.length === 0 ? (
                  <div className="dashboard-empty">
                    <div className="empty-icon">📭</div>
                    <h4>No bookings yet</h4>
                    <p>Book your first cleaning service today!</p>
                    <Link to="/book" className="empty-cta">Book Now →</Link>
                  </div>
                ) : (
                  <div className="dashboard-recent-list">
                    {bookings.slice(0, 3).map((booking) => (
                      <div key={booking._id} className="dashboard-booking-card">
                        <div className="booking-card-header">
                          <div className="booking-service">{booking.service}</div>
                          <span className={`booking-status ${getStatusClass(booking.status)}`}>
                            {booking.status || "New"}
                          </span>
                        </div>
                        <div className="booking-card-details">
                          <span>📅 {booking.date}</span>
                          <span>🕐 {booking.timeSlot || "-"}</span>
                          <span>📍 {booking.area}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === "bookings" && (
            <div className="dashboard-tab">
              <div className="dashboard-section-header">
                <h2 className="dashboard-section-title">📅 My Bookings</h2>
                <Link to="/book" className="section-action-btn">+ New Booking</Link>
              </div>

              {bookings.length === 0 ? (
                <div className="dashboard-empty">
                  <div className="empty-icon">📭</div>
                  <h4>No bookings yet</h4>
                  <p>Book your first cleaning service today!</p>
                  <Link to="/book" className="empty-cta">Book Now →</Link>
                </div>
              ) : (
                <div className="dashboard-bookings-list">
                  {bookings.map((booking) => (
                    <div key={booking._id} className="booking-full-card">
                      <div className="booking-full-header">
                        <div>
                          <div className="booking-full-service">{booking.service}</div>
                          <div className="booking-full-date">
                            Booked on {new Date(booking.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <span className={`booking-status ${getStatusClass(booking.status)}`}>
                          {booking.status || "New"}
                        </span>
                      </div>
                      <div className="booking-full-grid">
                        <div className="booking-full-item">
                          <span className="booking-full-label">📅 Date</span>
                          <span className="booking-full-value">{booking.date}</span>
                        </div>
                        <div className="booking-full-item">
                          <span className="booking-full-label">🕐 Time</span>
                          <span className="booking-full-value">{booking.timeSlot || "-"}</span>
                        </div>
                        <div className="booking-full-item">
                          <span className="booking-full-label">📍 Area</span>
                          <span className="booking-full-value">{booking.area}</span>
                        </div>
                        <div className="booking-full-item">
                          <span className="booking-full-label">⏱️ Duration</span>
                          <span className="booking-full-value">{booking.hours || "-"} hours</span>
                        </div>
                        {booking.assignedCleaner && (
                          <div className="booking-full-item">
                            <span className="booking-full-label">👷 Cleaner</span>
                            <span className="booking-full-value">{booking.assignedCleaner}</span>
                          </div>
                        )}
                        {booking.estimatedPrice && (
                          <div className="booking-full-item">
                            <span className="booking-full-label">💰 Price</span>
                            <span className="booking-full-value booking-price">₹{booking.estimatedPrice}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === "addresses" && (
            <div className="dashboard-tab">
              <div className="dashboard-section-header">
                <h2 className="dashboard-section-title">📍 My Addresses</h2>
                <button
                  className="section-action-btn"
                  onClick={() => setShowAddressForm(!showAddressForm)}
                >
                  {showAddressForm ? "Cancel" : "+ Add Address"}
                </button>
              </div>

              {showAddressForm && (
                <form onSubmit={onAddAddress} className="address-form">
                  <div className="address-form-grid">
                    <div className="form-field">
                      <label>Label</label>
                      <select
                        name="label"
                        value={addressForm.label}
                        onChange={onAddressChange}
                        className="form-input"
                      >
                        <option value="Home">Home</option>
                        <option value="Office">Office</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label>Pincode</label>
                      <input
                        type="text"
                        name="pincode"
                        value={addressForm.pincode}
                        onChange={onAddressChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-field full-width">
                      <label>Address Line 1</label>
                      <input
                        type="text"
                        name="address1"
                        value={addressForm.address1}
                        onChange={onAddressChange}
                        className="form-input"
                        placeholder="House/Flat No, Building Name"
                        required
                      />
                    </div>
                    <div className="form-field full-width">
                      <label>Address Line 2</label>
                      <input
                        type="text"
                        name="address2"
                        value={addressForm.address2}
                        onChange={onAddressChange}
                        className="form-input"
                        placeholder="Street, Area, Landmark"
                      />
                    </div>
                    <div className="form-field">
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        value={addressForm.city}
                        onChange={onAddressChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label>State</label>
                      <input
                        type="text"
                        name="state"
                        value={addressForm.state}
                        onChange={onAddressChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-field checkbox-field">
                      <label>
                        <input
                          type="checkbox"
                          name="isDefault"
                          checked={addressForm.isDefault}
                          onChange={onAddressChange}
                        />
                        Set as default address
                      </label>
                    </div>
                  </div>
                  <button type="submit" className="address-submit-btn">
                    Save Address
                  </button>
                </form>
              )}

              {(!user?.addresses || user.addresses.length === 0) && !showAddressForm ? (
                <div className="dashboard-empty">
                  <div className="empty-icon">📍</div>
                  <h4>No addresses saved</h4>
                  <p>Add addresses for faster booking</p>
                  <button className="empty-cta" onClick={() => setShowAddressForm(true)}>
                    Add Address →
                  </button>
                </div>
              ) : (
                <div className="addresses-grid">
                  {user?.addresses?.map((addr) => (
                    <div key={addr._id} className="address-card">
                      <div className="address-card-header">
                        <span className="address-label">{addr.label}</span>
                        {addr.isDefault && <span className="address-default">Default</span>}
                      </div>
                      <div className="address-content">
                        <p>{addr.address1}</p>
                        {addr.address2 && <p>{addr.address2}</p>}
                        <p>{addr.city}, {addr.state} - {addr.pincode}</p>
                      </div>
                      <button
                        className="address-delete-btn"
                        onClick={() => onDeleteAddress(addr._id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="dashboard-tab">
              <div className="dashboard-section-header">
                <h2 className="dashboard-section-title">👤 Profile Settings</h2>
                {!editMode && (
                  <button className="section-action-btn" onClick={() => setEditMode(true)}>
                    ✏️ Edit Profile
                  </button>
                )}
              </div>

              <div className="profile-card">
                {editMode ? (
                  <form onSubmit={onUpdateProfile} className="profile-form">
                    <div className="profile-form-grid">
                      <div className="form-field">
                        <label>First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={editForm.firstName}
                          onChange={onEditChange}
                          className="form-input"
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label>Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={editForm.lastName}
                          onChange={onEditChange}
                          className="form-input"
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label>Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={editForm.phone}
                          onChange={onEditChange}
                          className="form-input"
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label>Email (cannot be changed)</label>
                        <input
                          type="email"
                          value={user?.email}
                          className="form-input"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="profile-form-actions">
                      <button type="button" className="btn-cancel" onClick={() => setEditMode(false)}>
                        Cancel
                      </button>
                      <button type="submit" className="btn-save">
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="profile-view">
                    <div className="profile-avatar-large">
                      {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                    </div>
                    <div className="profile-details">
                      <div className="profile-item">
                        <span className="profile-item-label">Full Name</span>
                        <span className="profile-item-value">
                          {user?.firstName} {user?.lastName}
                        </span>
                      </div>
                      <div className="profile-item">
                        <span className="profile-item-label">Email</span>
                        <span className="profile-item-value">{user?.email}</span>
                      </div>
                      <div className="profile-item">
                        <span className="profile-item-label">Phone</span>
                        <span className="profile-item-value">{user?.phone}</span>
                      </div>
                      <div className="profile-item">
                        <span className="profile-item-label">Member Since</span>
                        <span className="profile-item-value">
                          {new Date(user?.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
