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

  // Check auth on mount
  useEffect(() => {
    const token = localStorage.getItem("customerToken");
    if (!token) {
      navigate("/account/login");
      return;
    }
    fetchProfile();
    fetchBookings();
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
      />
    </MainLayout>
  );
}
