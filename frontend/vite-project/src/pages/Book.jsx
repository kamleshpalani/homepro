import { useState } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import BookView from "./BookView.jsx";

function Book() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    area: "",
    areaOther: "",
    service: "",
    serviceOther: "",
    date: "",
    timeSlot: "",
    address1: "",
    address2: "",
    city: "Coimbatore",
    state: "Tamil Nadu",
    country: "India",
    pincode: "",
    preferredContactMethod: "whatsapp",
    preferredContactTime: "",
    propertyType: "",
    propertyTypeOther: "",
    floorCount: "",
    approxAreaSqft: "",
    petsAtHome: "no",
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
      !form.firstName ||
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
      //   firstName: "",
      //   lastName: "",
      //   phone: "",
      //   email: "",
      //   area: "",
      //   areaOther: "",
      //   service: "",
      //   serviceOther: "",
      //   date: "",
      //   timeSlot: "",
      //   address1: "",
      //   address2: "",
      //   city: "Coimbatore",
      //   state: "Tamil Nadu",
      //   country: "India",
      //   pincode: "",
      //   preferredContactMethod: "whatsapp",
      //   preferredContactTime: "",
      //   propertyType: "",
      //   propertyTypeOther: "",
      //   floorCount: "",
      //   approxAreaSqft: "",
      //   petsAtHome: "no",
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
