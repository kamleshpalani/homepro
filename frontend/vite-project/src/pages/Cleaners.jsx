// src/pages/Cleaners.jsx  (ADMIN view only)
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import CleanersView from "./CleanersView.jsx";

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
      <CleanersView cleaners={cleaners} loading={loading} error={error} />
    </MainLayout>
  );
}

export default Cleaners;
