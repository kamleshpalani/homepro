import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardView from "./DashboardView";

const API_URL = "http://localhost:4000";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [addressForm, setAddressForm] = useState({
    label: "Home",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
  });
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // New state for expanded features
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loyalty, setLoyalty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [referralData, setReferralData] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  // Check auth on mount
  useEffect(() => {
    const token = localStorage.getItem("customerToken");
    if (!token) {
      navigate("/account/login");
      return;
    }
    fetchProfile();
    fetchBookings();
    fetchWallet();
    fetchTransactions();
    fetchLoyalty();
    fetchReviews();
    fetchNotifications();
    fetchReferralData();
    fetchTickets();
    fetchSubscriptions();
  }, [navigate]);

  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("customerToken")}`,
  });

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/profile`, {
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Session expired");
      const data = await res.json();
      setUser(data);
      setEditForm({
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
      });
    } catch (err) {
      localStorage.removeItem("customerToken");
      localStorage.removeItem("customerUser");
      navigate("/account/login");
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/bookings`, {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("customerToken");
    localStorage.removeItem("customerUser");
    navigate("/account/login");
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/auth/profile`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        setEditMode(false);
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/auth/addresses`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(addressForm),
      });
      const data = await res.json();
      if (res.ok) {
        setUser((prev) => ({ ...prev, addresses: data.addresses }));
        setShowAddressForm(false);
        setAddressForm({
          label: "Home",
          address1: "",
          address2: "",
          city: "",
          state: "",
          pincode: "",
          isDefault: false,
        });
        setMessage({ type: "success", text: "Address added successfully!" });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!confirm("Are you sure you want to delete this address?")) return;
    try {
      const res = await fetch(`${API_URL}/api/auth/addresses/${addressId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (res.ok) {
        setUser((prev) => ({ ...prev, addresses: data.addresses }));
        setMessage({ type: "success", text: "Address deleted!" });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  // Wallet & Transactions
  const fetchWallet = async () => {
    try {
      const res = await fetch(`${API_URL}/api/wallet`, {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setWallet(data);
      }
    } catch (err) {
      console.error("Error fetching wallet:", err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await fetch(`${API_URL}/api/transactions`, {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setTransactions(data);
      }
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  // Loyalty & Rewards
  const fetchLoyalty = async () => {
    try {
      const res = await fetch(`${API_URL}/api/loyalty`, {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setLoyalty(data);
      }
    } catch (err) {
      console.error("Error fetching loyalty:", err);
    }
  };

  const handleRedeemPoints = async (points, reward) => {
    try {
      const res = await fetch(`${API_URL}/api/loyalty/redeem`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ points, reward }),
      });
      const data = await res.json();
      if (res.ok) {
        setLoyalty(data.loyalty);
        setMessage({ type: "success", text: "Points redeemed successfully!" });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  // Reviews
  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_URL}/api/reviews`, {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  const handleSubmitReview = async (reviewData) => {
    try {
      const res = await fetch(`${API_URL}/api/reviews`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(reviewData),
      });
      const data = await res.json();
      if (res.ok) {
        setReviews((prev) => [data.review, ...prev]);
        setMessage({ type: "success", text: "Review submitted successfully!" });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  // Notifications
  const fetchNotifications = async () => {
    try {
      const res = await fetch(`${API_URL}/api/notifications`, {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  const handleMarkNotificationRead = async (notifId) => {
    try {
      const res = await fetch(`${API_URL}/api/notifications/${notifId}/read`, {
        method: "PUT",
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        setNotifications((prev) =>
          prev.map((n) => (n._id === notifId ? { ...n, isRead: true } : n))
        );
      }
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const handleMarkAllNotificationsRead = async () => {
    try {
      const res = await fetch(`${API_URL}/api/notifications/read-all`, {
        method: "PUT",
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      }
    } catch (err) {
      console.error("Error marking all as read:", err);
    }
  };

  // Referrals
  const fetchReferralData = async () => {
    try {
      const res = await fetch(`${API_URL}/api/referral`, {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setReferralData(data);
      }
    } catch (err) {
      console.error("Error fetching referral data:", err);
    }
  };

  // Support Tickets
  const fetchTickets = async () => {
    try {
      const res = await fetch(`${API_URL}/api/tickets`, {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setTickets(data);
      }
    } catch (err) {
      console.error("Error fetching tickets:", err);
    }
  };

  const handleCreateTicket = async (ticketData) => {
    try {
      const res = await fetch(`${API_URL}/api/tickets`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(ticketData),
      });
      const data = await res.json();
      if (res.ok) {
        setTickets((prev) => [data.ticket, ...prev]);
        setMessage({ type: "success", text: "Ticket created successfully!" });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  // Subscriptions
  const fetchSubscriptions = async () => {
    try {
      const res = await fetch(`${API_URL}/api/subscriptions`, {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setSubscriptions(data);
      }
    } catch (err) {
      console.error("Error fetching subscriptions:", err);
    }
  };

  const handleCreateSubscription = async (subData) => {
    try {
      const res = await fetch(`${API_URL}/api/subscriptions`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(subData),
      });
      const data = await res.json();
      if (res.ok) {
        setSubscriptions((prev) => [data.subscription, ...prev]);
        setMessage({
          type: "success",
          text: "Subscription created successfully!",
        });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const handleUpdateSubscription = async (subId, status) => {
    try {
      const res = await fetch(`${API_URL}/api/subscriptions/${subId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubscriptions((prev) =>
          prev.map((s) => (s._id === subId ? data.subscription : s))
        );
        setMessage({ type: "success", text: "Subscription updated!" });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="dashboard-loading">
          <div className="dashboard-spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <DashboardView
        user={user}
        bookings={bookings}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        editMode={editMode}
        setEditMode={setEditMode}
        editForm={editForm}
        onEditChange={handleEditChange}
        onUpdateProfile={handleUpdateProfile}
        addressForm={addressForm}
        onAddressChange={handleAddressChange}
        showAddressForm={showAddressForm}
        setShowAddressForm={setShowAddressForm}
        onAddAddress={handleAddAddress}
        onDeleteAddress={handleDeleteAddress}
        onLogout={handleLogout}
        message={message}
        wallet={wallet}
        transactions={transactions}
        loyalty={loyalty}
        reviews={reviews}
        notifications={notifications}
        referralData={referralData}
        tickets={tickets}
        subscriptions={subscriptions}
        onRedeemPoints={handleRedeemPoints}
        onSubmitReview={handleSubmitReview}
        onMarkNotificationRead={handleMarkNotificationRead}
        onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
        onCreateTicket={handleCreateTicket}
        onCreateSubscription={handleCreateSubscription}
        onUpdateSubscription={handleUpdateSubscription}
      />
    </MainLayout>
  );
}
