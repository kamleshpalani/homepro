// src/pages/Cleaners.jsx  (ADMIN view only)
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";

const TOKEN_KEY = "HOMECAREPRO_ADMIN_TOKEN";

function Cleaners() {
  const [cleaners, setCleaners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    async function loadCleaners() {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
          navigate("/admin/login", { replace: true });
          return;
        }

        const res = await fetch("http://localhost:4000/api/cleaners", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });

        if (res.status === 401) {
          localStorage.removeItem(TOKEN_KEY);
          navigate("/admin/login", { replace: true });
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to load cleaners");
        }

        const data = await res.json();
        setCleaners(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Error loading cleaners:", err);
        setError("Unable to load cleaner list from backend.");
      } finally {
        setLoading(false);
      }
    }

    loadCleaners();
    return () => controller.abort();
  }, [navigate]);

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
          Registered Cleaners (Admin)
        </h1>
        <p style={{ fontSize: "14px", marginBottom: "12px", color: "#4b5563" }}>
          Only admins can see and manage this list of approved / applied
          cleaners.
        </p>

        {loading && <p style={{ fontSize: "14px" }}>Loading cleaners…</p>}
        {error && <p style={{ fontSize: "14px", color: "#b91c1c" }}>{error}</p>}

        {!loading && !error && cleaners.length === 0 && (
          <p style={{ fontSize: "14px" }}>No cleaners registered yet.</p>
        )}

        {!loading && !error && cleaners.length > 0 && (
          <div style={{ marginTop: "12px", overflowX: "auto" }}>
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
                    Experience
                  </th>
                  <th
                    style={{
                      padding: "8px",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    Services Offered
                  </th>
                  <th
                    style={{
                      padding: "8px",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    Notes
                  </th>
                  <th
                    style={{
                      padding: "8px",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    Active?
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
                {cleaners.map((c, index) => (
                  <tr key={c._id || index}>
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
                      {c.name}
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {c.phone}
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {c.area}
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {c.experienceYears ? `${c.experienceYears} yrs` : "—"}
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {c.servicesOffered || "—"}
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {c.notes || "—"}
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {c.isActive ? "Yes" : "No"}
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {c.createdAt
                        ? new Date(c.createdAt).toLocaleString()
                        : "—"}
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

export default Cleaners;
