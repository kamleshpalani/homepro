import { useState } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import BookView from "./BookView.jsx";

function Book() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
    service: "",
    date: "",
    timeSlot: "",
    notes: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // 👉 NEW VERSION: sends data to backend
  async function handleSubmit(e) {
    e.preventDefault();

    // very simple validation
    if (
      !form.name ||
      !form.phone ||
      !form.area ||
      !form.service ||
      !form.date
    ) {
      setMessage("Please fill all required fields (marked *).");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to submit booking");
      }

      const data = await response.json();

      setMessage(
        `Booking submitted to backend! Reference ID: ${data.bookingId}. (Currently stored in server memory.)`
      );

      // Optional: clear form after success
      // setForm({
      //   name: "",
      //   phone: "",
      //   area: "",
      //   service: "",
      //   date: "",
      //   timeSlot: "",
      //   notes: "",
      // });
    } catch (err) {
      console.error(err);
      setMessage(
        "Something went wrong while sending your booking. Please try again."
      );
    }
  }

  return (
    <MainLayout>
      <BookView
        form={form}
        message={message}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </MainLayout>
  );
}

export default Book;
