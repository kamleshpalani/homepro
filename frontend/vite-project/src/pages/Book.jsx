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
    hours: 1,
    estimatedPrice: 450,
  });

  const [message, setMessage] = useState("");

  const HOUR_PRICING = {
    1: { label: "Quick Refresh (1 hour)", original: 650, offer: 450 },
    2: { label: "Standard Clean (2 hours)", original: 1200, offer: 849 },
    3: { label: "Deep Clean (3 hours)", original: 1600, offer: 1199 },
    4: { label: "Extended Deep Clean (4 hours)", original: 2000, offer: 1499 },
  };

  function handleChange(e) {
    const { name, value } = e.target;
    // Special handling for hours so we can recalculate estimated price
    if (name === "hours") {
      const hoursValue = Number(value);
      const priceInfo = HOUR_PRICING[hoursValue];
      setForm((prev) => ({
        ...prev,
        hours: hoursValue,
        estimatedPrice: priceInfo ? priceInfo.offer : prev.estimatedPrice,
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
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
      //   hours: 1,
      //   estimatedPrice: 450,
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
        hourPricing={HOUR_PRICING}
      />
    </MainLayout>
  );
}

export default Book;
