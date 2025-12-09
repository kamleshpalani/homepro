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
  // New props for expanded features
  wallet,
  transactions,
  loyalty,
  reviews,
  notifications,
  referralData,
  tickets,
  subscriptions,
  onRedeemPoints,
  onSubmitReview,
  onMarkNotificationRead,
  onMarkAllNotificationsRead,
  onCreateTicket,
  onCreateSubscription,
  onUpdateSubscription,
}) {
  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "bookings", label: "My Bookings", icon: "📅" },
    { id: "wallet", label: "Wallet", icon: "💰" },
    { id: "loyalty", label: "Rewards", icon: "🎁" },
    { id: "reviews", label: "Reviews", icon: "⭐" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "referral", label: "Refer & Earn", icon: "🤝" },
    { id: "support", label: "Support", icon: "💬" },
    { id: "subscriptions", label: "Subscriptions", icon: "🔄" },
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
    walletBalance: wallet?.balance || 0,
    loyaltyPoints: loyalty?.points || 0,
    notifications: notifications?.filter((n) => !n.isRead).length || 0,
  };

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-welcome">
            <h1 className="dashboard-title">
              Welcome back,{" "}
              <span className="dashboard-gradient">{user?.firstName}!</span>
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
              {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </div>
            <div className="dashboard-user-info">
              <h3>
                {user?.firstName} {user?.lastName}
              </h3>
              <p>{user?.email}</p>
            </div>
          </div>

          <nav className="dashboard-nav">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`dashboard-nav-item ${
                  activeTab === tab.id ? "active" : ""
                }`}
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
            <div
              className={`dashboard-message dashboard-message-${message.type}`}
            >
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
                <div className="dashboard-stat-card stat-wallet">
                  <div className="stat-icon">💰</div>
                  <div className="stat-value">₹{stats.walletBalance}</div>
                  <div className="stat-label">Wallet Balance</div>
                </div>
                <div className="dashboard-stat-card stat-loyalty">
                  <div className="stat-icon">⭐</div>
                  <div className="stat-value">{stats.loyaltyPoints}</div>
                  <div className="stat-label">Loyalty Points</div>
                </div>
                <div className="dashboard-stat-card stat-notifications">
                  <div className="stat-icon">🔔</div>
                  <div className="stat-value">{stats.notifications}</div>
                  <div className="stat-label">Unread Notifications</div>
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
                    <Link to="/book" className="empty-cta">
                      Book Now →
                    </Link>
                  </div>
                ) : (
                  <div className="dashboard-recent-list">
                    {bookings.slice(0, 3).map((booking) => (
                      <div key={booking._id} className="dashboard-booking-card">
                        <div className="booking-card-header">
                          <div className="booking-service">
                            {booking.service}
                          </div>
                          <span
                            className={`booking-status ${getStatusClass(
                              booking.status
                            )}`}
                          >
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
                <Link to="/book" className="section-action-btn">
                  + New Booking
                </Link>
              </div>

              {bookings.length === 0 ? (
                <div className="dashboard-empty">
                  <div className="empty-icon">📭</div>
                  <h4>No bookings yet</h4>
                  <p>Book your first cleaning service today!</p>
                  <Link to="/book" className="empty-cta">
                    Book Now →
                  </Link>
                </div>
              ) : (
                <div className="dashboard-bookings-list">
                  {bookings.map((booking) => (
                    <div key={booking._id} className="booking-full-card">
                      <div className="booking-full-header">
                        <div>
                          <div className="booking-full-service">
                            {booking.service}
                          </div>
                          <div className="booking-full-date">
                            Booked on{" "}
                            {new Date(booking.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <span
                          className={`booking-status ${getStatusClass(
                            booking.status
                          )}`}
                        >
                          {booking.status || "New"}
                        </span>
                      </div>
                      <div className="booking-full-grid">
                        <div className="booking-full-item">
                          <span className="booking-full-label">📅 Date</span>
                          <span className="booking-full-value">
                            {booking.date}
                          </span>
                        </div>
                        <div className="booking-full-item">
                          <span className="booking-full-label">🕐 Time</span>
                          <span className="booking-full-value">
                            {booking.timeSlot || "-"}
                          </span>
                        </div>
                        <div className="booking-full-item">
                          <span className="booking-full-label">📍 Area</span>
                          <span className="booking-full-value">
                            {booking.area}
                          </span>
                        </div>
                        <div className="booking-full-item">
                          <span className="booking-full-label">
                            ⏱️ Duration
                          </span>
                          <span className="booking-full-value">
                            {booking.hours || "-"} hours
                          </span>
                        </div>
                        {booking.assignedCleaner && (
                          <div className="booking-full-item">
                            <span className="booking-full-label">
                              👷 Cleaner
                            </span>
                            <span className="booking-full-value">
                              {booking.assignedCleaner}
                            </span>
                          </div>
                        )}
                        {booking.estimatedPrice && (
                          <div className="booking-full-item">
                            <span className="booking-full-label">💰 Price</span>
                            <span className="booking-full-value booking-price">
                              ₹{booking.estimatedPrice}
                            </span>
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

              {(!user?.addresses || user.addresses.length === 0) &&
              !showAddressForm ? (
                <div className="dashboard-empty">
                  <div className="empty-icon">📍</div>
                  <h4>No addresses saved</h4>
                  <p>Add addresses for faster booking</p>
                  <button
                    className="empty-cta"
                    onClick={() => setShowAddressForm(true)}
                  >
                    Add Address →
                  </button>
                </div>
              ) : (
                <div className="addresses-grid">
                  {user?.addresses?.map((addr) => (
                    <div key={addr._id} className="address-card">
                      <div className="address-card-header">
                        <span className="address-label">{addr.label}</span>
                        {addr.isDefault && (
                          <span className="address-default">Default</span>
                        )}
                      </div>
                      <div className="address-content">
                        <p>{addr.address1}</p>
                        {addr.address2 && <p>{addr.address2}</p>}
                        <p>
                          {addr.city}, {addr.state} - {addr.pincode}
                        </p>
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

          {/* Wallet Tab */}
          {activeTab === "wallet" && (
            <div className="dashboard-tab">
              <h2 className="dashboard-section-title">💰 My Wallet</h2>

              <div className="wallet-balance-card">
                <div className="wallet-balance-header">
                  <span>Available Balance</span>
                  <span className="wallet-balance-amount">
                    ₹{wallet?.balance || 0}
                  </span>
                </div>
              </div>

              <div className="dashboard-section-header">
                <h3 className="dashboard-section-subtitle">
                  Transaction History
                </h3>
              </div>

              {!transactions || transactions.length === 0 ? (
                <div className="dashboard-empty">
                  <div className="empty-icon">💳</div>
                  <h4>No transactions yet</h4>
                  <p>Your wallet transactions will appear here</p>
                </div>
              ) : (
                <div className="transactions-list">
                  {transactions.map((txn) => (
                    <div key={txn._id} className="transaction-item">
                      <div className="transaction-info">
                        <div className="transaction-type">{txn.type}</div>
                        <div className="transaction-desc">
                          {txn.description}
                        </div>
                        <div className="transaction-date">
                          {new Date(txn.createdAt).toLocaleString()}
                        </div>
                      </div>
                      <div
                        className={`transaction-amount ${
                          txn.type === "credit" ? "credit" : "debit"
                        }`}
                      >
                        {txn.type === "credit" ? "+" : "-"}₹{txn.amount}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Loyalty & Rewards Tab */}
          {activeTab === "loyalty" && (
            <div className="dashboard-tab">
              <h2 className="dashboard-section-title">🎁 Loyalty & Rewards</h2>

              <div className="loyalty-stats-grid">
                <div className="loyalty-stat-card">
                  <div className="loyalty-stat-icon">⭐</div>
                  <div className="loyalty-stat-value">
                    {loyalty?.points || 0}
                  </div>
                  <div className="loyalty-stat-label">Available Points</div>
                </div>
                <div className="loyalty-stat-card">
                  <div className="loyalty-stat-icon">🏆</div>
                  <div className="loyalty-stat-value">
                    {loyalty?.tier || "Bronze"}
                  </div>
                  <div className="loyalty-stat-label">Current Tier</div>
                </div>
                <div className="loyalty-stat-card">
                  <div className="loyalty-stat-icon">💎</div>
                  <div className="loyalty-stat-value">
                    {loyalty?.lifetimePoints || 0}
                  </div>
                  <div className="loyalty-stat-label">Lifetime Points</div>
                </div>
              </div>

              <div className="rewards-catalog">
                <h3 className="dashboard-section-subtitle">Redeem Rewards</h3>
                <div className="rewards-grid">
                  <div className="reward-card">
                    <div className="reward-icon">🎫</div>
                    <div className="reward-title">₹50 Off</div>
                    <div className="reward-points">100 Points</div>
                    <button
                      className="reward-redeem-btn"
                      onClick={() => onRedeemPoints(100, "₹50 Off")}
                    >
                      Redeem
                    </button>
                  </div>
                  <div className="reward-card">
                    <div className="reward-icon">🎁</div>
                    <div className="reward-title">₹100 Off</div>
                    <div className="reward-points">200 Points</div>
                    <button
                      className="reward-redeem-btn"
                      onClick={() => onRedeemPoints(200, "₹100 Off")}
                    >
                      Redeem
                    </button>
                  </div>
                  <div className="reward-card">
                    <div className="reward-icon">💝</div>
                    <div className="reward-title">Free Service</div>
                    <div className="reward-points">500 Points</div>
                    <button
                      className="reward-redeem-btn"
                      onClick={() => onRedeemPoints(500, "Free Service")}
                    >
                      Redeem
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="dashboard-tab">
              <h2 className="dashboard-section-title">⭐ My Reviews</h2>

              <div className="dashboard-card">
                <h3 className="dashboard-section-subtitle">
                  Share your feedback
                </h3>
                <form
                  className="support-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    onSubmitReview?.({
                      rating: Number(formData.get("rating")),
                      comment: formData.get("comment"),
                    });
                    e.target.reset();
                  }}
                >
                  <label className="dashboard-input-label">Rating</label>
                  <select name="rating" defaultValue="5" className="form-input">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <option key={star} value={star}>
                        {star} Star{star > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>

                  <label className="dashboard-input-label">Comments</label>
                  <textarea
                    name="comment"
                    placeholder="Tell us about your experience"
                    className="form-textarea"
                    required
                  ></textarea>

                  <button type="submit" className="section-action-btn">
                    Submit Review
                  </button>
                </form>
              </div>

              {!reviews || reviews.length === 0 ? (
                <div className="dashboard-empty">
                  <div className="empty-icon">⭐</div>
                  <h4>No reviews yet</h4>
                  <p>Share your experience with our services</p>
                </div>
              ) : (
                <div className="reviews-list">
                  {reviews.map((review) => (
                    <div key={review._id} className="review-card">
                      <div className="review-header">
                        <div className="review-rating">
                          {"⭐".repeat(review.rating)}
                        </div>
                        <div className="review-date">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="review-comment">{review.comment}</div>
                      {review.adminResponse && (
                        <div className="review-response">
                          <strong>Admin Response:</strong>{" "}
                          {review.adminResponse}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="dashboard-tab">
              <div className="dashboard-section-header">
                <h2 className="dashboard-section-title">🔔 Notifications</h2>
                {notifications && notifications.some((n) => !n.isRead) && (
                  <button
                    className="section-action-btn"
                    onClick={onMarkAllNotificationsRead}
                  >
                    Mark All as Read
                  </button>
                )}
              </div>

              {!notifications || notifications.length === 0 ? (
                <div className="dashboard-empty">
                  <div className="empty-icon">🔔</div>
                  <h4>No notifications</h4>
                  <p>You're all caught up!</p>
                </div>
              ) : (
                <div className="notifications-list">
                  {notifications.map((notif) => (
                    <div
                      key={notif._id}
                      className={`notification-item ${
                        notif.isRead ? "read" : "unread"
                      }`}
                    >
                      <div className="notification-header">
                        <span className="notification-type">{notif.type}</span>
                        <span className="notification-date">
                          {new Date(notif.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="notification-title">{notif.title}</div>
                      <div className="notification-message">
                        {notif.message}
                      </div>
                      {!notif.isRead && (
                        <button
                          className="notification-mark-read"
                          onClick={() => onMarkNotificationRead(notif._id)}
                        >
                          Mark as Read
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Referral Tab */}
          {activeTab === "referral" && (
            <div className="dashboard-tab">
              <h2 className="dashboard-section-title">🤝 Refer & Earn</h2>

              <div className="referral-hero">
                <h3>Share the Love, Earn Rewards!</h3>
                <p>
                  Refer friends and earn ₹100 for each successful referral. Your
                  friend gets ₹50 too!
                </p>
              </div>

              <div className="referral-code-card">
                <div className="referral-code-label">Your Referral Code</div>
                <div className="referral-code-value">
                  {referralData?.referralCode || "Loading..."}
                </div>
                <button
                  className="referral-copy-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(referralData?.referralCode)
                  }
                >
                  📋 Copy Code
                </button>
              </div>

              <div className="referral-stats-grid">
                <div className="referral-stat">
                  <div className="referral-stat-value">
                    {referralData?.totalReferrals || 0}
                  </div>
                  <div className="referral-stat-label">Total Referrals</div>
                </div>
                <div className="referral-stat">
                  <div className="referral-stat-value">
                    {referralData?.completedReferrals || 0}
                  </div>
                  <div className="referral-stat-label">Successful</div>
                </div>
                <div className="referral-stat">
                  <div className="referral-stat-value">
                    ₹{referralData?.earnings || 0}
                  </div>
                  <div className="referral-stat-label">Total Earnings</div>
                </div>
              </div>
            </div>
          )}

          {/* Support Tab */}
          {activeTab === "support" && (
            <div className="dashboard-tab">
              <h2 className="dashboard-section-title">💬 Support</h2>

              <div className="support-create-card">
                <h3>Create New Ticket</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    onCreateTicket({
                      subject: formData.get("subject"),
                      message: formData.get("message"),
                      priority: formData.get("priority"),
                    });
                    e.target.reset();
                  }}
                  className="support-form"
                >
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    required
                    className="form-input"
                  />
                  <textarea
                    name="message"
                    placeholder="Describe your issue..."
                    required
                    className="form-input"
                    rows="4"
                  ></textarea>
                  <select name="priority" className="form-input">
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                  <button type="submit" className="support-submit-btn">
                    Submit Ticket
                  </button>
                </form>
              </div>

              <h3 className="dashboard-section-subtitle">My Tickets</h3>
              {!tickets || tickets.length === 0 ? (
                <div className="dashboard-empty">
                  <div className="empty-icon">💬</div>
                  <h4>No support tickets</h4>
                  <p>Create a ticket if you need help</p>
                </div>
              ) : (
                <div className="tickets-list">
                  {tickets.map((ticket) => (
                    <div key={ticket._id} className="ticket-card">
                      <div className="ticket-header">
                        <div className="ticket-subject">{ticket.subject}</div>
                        <span
                          className={`ticket-status status-${ticket.status}`}
                        >
                          {ticket.status}
                        </span>
                      </div>
                      <div className="ticket-message">{ticket.message}</div>
                      <div className="ticket-footer">
                        <span className="ticket-priority">
                          Priority: {ticket.priority}
                        </span>
                        <span className="ticket-date">
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Subscriptions Tab */}
          {activeTab === "subscriptions" && (
            <div className="dashboard-tab">
              <h2 className="dashboard-section-title">🔄 Subscriptions</h2>

              <div className="dashboard-card">
                <h3 className="dashboard-section-subtitle">Create a plan</h3>
                <form
                  className="support-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    onCreateSubscription?.({
                      service: formData.get("service"),
                      frequency: formData.get("frequency"),
                      notes: formData.get("notes"),
                    });
                    e.target.reset();
                  }}
                >
                  <label className="dashboard-input-label">Service</label>
                  <input
                    type="text"
                    name="service"
                    placeholder="e.g., Weekly Home Cleaning"
                    className="form-input"
                    required
                  />

                  <label className="dashboard-input-label">Frequency</label>
                  <select
                    name="frequency"
                    defaultValue="monthly"
                    className="form-input"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>

                  <label className="dashboard-input-label">
                    Notes (optional)
                  </label>
                  <textarea
                    name="notes"
                    placeholder="Share any preferences or schedule notes"
                    className="form-textarea"
                  ></textarea>

                  <button type="submit" className="section-action-btn">
                    Create Subscription
                  </button>
                </form>
              </div>

              {!subscriptions || subscriptions.length === 0 ? (
                <div className="dashboard-empty">
                  <div className="empty-icon">🔄</div>
                  <h4>No active subscriptions</h4>
                  <p>Subscribe to our services for regular cleaning</p>
                  <Link to="/services" className="empty-cta">
                    Browse Services →
                  </Link>
                </div>
              ) : (
                <div className="subscriptions-grid">
                  {subscriptions.map((sub) => (
                    <div key={sub._id} className="subscription-card">
                      <div className="subscription-header">
                        <div className="subscription-plan">{sub.planName}</div>
                        <span
                          className={`subscription-status status-${sub.status}`}
                        >
                          {sub.status}
                        </span>
                      </div>
                      <div className="subscription-details">
                        <div>Service: {sub.service}</div>
                        <div>Frequency: {sub.frequency}</div>
                        <div>
                          Price: ₹{sub.price}/{sub.frequency}
                        </div>
                        <div>
                          Next Service:{" "}
                          {new Date(sub.nextServiceDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="subscription-actions">
                        {sub.status === "active" && (
                          <button
                            className="subscription-pause-btn"
                            onClick={() =>
                              onUpdateSubscription(sub._id, "paused")
                            }
                          >
                            Pause
                          </button>
                        )}
                        {sub.status === "paused" && (
                          <button
                            className="subscription-resume-btn"
                            onClick={() =>
                              onUpdateSubscription(sub._id, "active")
                            }
                          >
                            Resume
                          </button>
                        )}
                        <button
                          className="subscription-cancel-btn"
                          onClick={() =>
                            onUpdateSubscription(sub._id, "cancelled")
                          }
                        >
                          Cancel
                        </button>
                      </div>
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
                  <button
                    className="section-action-btn"
                    onClick={() => setEditMode(true)}
                  >
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
                      <button
                        type="button"
                        className="btn-cancel"
                        onClick={() => setEditMode(false)}
                      >
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
                      {user?.firstName?.charAt(0)}
                      {user?.lastName?.charAt(0)}
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
                        <span className="profile-item-value">
                          {user?.email}
                        </span>
                      </div>
                      <div className="profile-item">
                        <span className="profile-item-label">Phone</span>
                        <span className="profile-item-value">
                          {user?.phone}
                        </span>
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
