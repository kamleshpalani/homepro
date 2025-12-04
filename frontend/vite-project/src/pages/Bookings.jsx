// src/pages/Bookings.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import BookingsView from "./BookingsView.jsx";

const TOKEN_KEY = "HOMECAREPRO_ADMIN_TOKEN";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      navigate("/admin/login");
      return;
    }

    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("http://localhost:4000/api/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          localStorage.removeItem(TOKEN_KEY);
          navigate("/admin/login");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Unable to load bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  return (
    <MainLayout>
      <BookingsView bookings={bookings} loading={loading} error={error} />
    </MainLayout>
  );
}

export default Bookings;
