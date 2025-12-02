import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout.jsx";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBookings() {
      try {
        const res = await fetch("http://localhost:4000/api/bookings");
        if (!res.ok) {
          throw new Error("Failed to load bookings");
        }
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load bookings from backend.");
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, []);

  return (
    <MainLayout>
      <section
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "20px",
          boxShadow: "0 12px 30px rgba(15, 23, 42, 0.12)",
        }}
      >
        <h1 style={{ fontSize: "22px", marginBottom: "8px" }}>
          Booking Requests (Admin View)
        </h1>

        {loading && <p style={{ fontSize: "14px" }}>Loading bookings…</p>}
        {error && <p style={{ fontSize: "14px", color: "#b91c1c" }}>{error}</p>}

        {!loading && !error && bookings.length === 0 && (
          <p style={{ fontSize: "14px" }}>No bookings yet.</p>
        )}

        {!loading && !error && bookings.length > 0 && (
          <div
            style={{
              marginTop: "12px",
              overflowX: "auto",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "13px",
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "#f3f4f6",
                    textAlign: "left",
                  }}
                >
                  <th
                    style={{
                      padding: "8px",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    #
                  </th>
                  <th
                    style={{
                      padding: "8px",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    Name
                  </th>
                  <th
                    style={{
                      padding: "8px",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    Phone
                  </th>
                  <th
                    style={{
                      padding: "8px",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    Area
                  </th>
                  <th
                    style={{
                      padding: "8px",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    Service
                  </th>
                  <th
                    style={{
                      padding: "8px",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    Date
                  </th>
                  <th
                    style={{
                      padding: "8px",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    Time Slot
                  </th>
                  <th
                    style={{
                      padding: "8px",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, index) => (
                  <tr key={index}>
                    <td
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {index + 1}
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {b.name}
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {b.phone}
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {b.area}
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {b.service}
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {b.date}
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {b.timeSlot || "-"}
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {b.createdAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </MainLayout>
  );
}

export default Bookings;
