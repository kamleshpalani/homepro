import { useState } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import BookView from "./BookView.jsx";

function Book() {
  const [form, setForm] = useState({
    // Contact Information
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    preferredContactMethod: "whatsapp",
    preferredContactTime: "",
    onsiteContactName: "",
    onsiteContactPhone: "",
    quietHours: "",

    // Service Details
    service: "",
    serviceOther: "",
    area: "",
    areaOther: "",
    hours: 1,
    estimatedPrice: 450,
    date: "",
    timeSlot: "",

    // Enhanced Service Fields (Coimbatore specific)
    numBedrooms: "",
    numBathrooms: "",
    serviceFrequency: "one-time",
    cleaningMaterials: "cleaner-provides",
    cleanBalcony: false,
    cleanTerrace: false,
    cleanStaircase: false,
    cleanParking: false,
    flexibilityWindow: "",

    // Address
    address1: "",
    address2: "",
    city: "Coimbatore",
    state: "Tamil Nadu",
    country: "India",
    pincode: "",

    // Property & Cleaner Preferences
    propertyType: "",
    propertyTypeOther: "",
    floorCount: "",
    approxAreaSqft: "",
    petsAtHome: "no",
    propertyAccess: "customer-present",
    elevatorAvailable: "",
    parkingAvailability: "",
    accessInstructions: "",
    powerWaterConstraints: "",
    doNotCleanAreas: "",
    onsiteContactNotes: "",

    // Cleaner Preferences
    cleanerGenderPreference: "no-preference",
    cleanerExperiencePreference: "any",
    languageTamil: false,
    languageEnglish: false,
    languageHindi: false,
    languageMalayalam: false,

    // Additional
    budgetRange: "",
    postServiceProof: false,
    notes: "",
  });

  const [message, setMessage] = useState("");

  const HOUR_PRICING = {
    1: { label: "Quick Refresh (1 hour)", original: 650, offer: 450 },
    2: { label: "Standard Clean (2 hours)", original: 1200, offer: 849 },
    3: { label: "Deep Clean (3 hours)", original: 1600, offer: 1199 },
    4: { label: "Extended Deep Clean (4 hours)", original: 2000, offer: 1499 },
    5: { label: "Full Home Clean (5 hours)", original: 2400, offer: 1799 },
    6: { label: "Complete Deep Clean (6+ hours)", original: 2800, offer: 2099 },
  };

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    // Handle checkbox inputs (boolean values)
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    // Special handling for hours to recalculate estimated price
    if (name === "hours") {
      const hoursValue = Number(value);
      const priceInfo = HOUR_PRICING[hoursValue];
      let finalPrice = priceInfo ? priceInfo.offer : 450;

      // Apply frequency discount if applicable
      if (form.serviceFrequency === "weekly") {
        finalPrice = Math.round(finalPrice * 0.85); // 15% discount
      } else if (form.serviceFrequency === "biweekly") {
        finalPrice = Math.round(finalPrice * 0.9); // 10% discount
      } else if (form.serviceFrequency === "monthly") {
        finalPrice = Math.round(finalPrice * 0.92); // 8% discount
      }

      setForm((prev) => ({
        ...prev,
        hours: hoursValue,
        estimatedPrice: finalPrice,
      }));
    }
    // Handle service frequency changes
    else if (name === "serviceFrequency") {
      const priceInfo = HOUR_PRICING[form.hours];
      let basePrice = priceInfo ? priceInfo.offer : 450;

      // Apply frequency discount
      let finalPrice = basePrice;
      if (value === "weekly") {
        finalPrice = Math.round(basePrice * 0.85); // 15% discount
      } else if (value === "biweekly") {
        finalPrice = Math.round(basePrice * 0.9); // 10% discount
      } else if (value === "monthly") {
        finalPrice = Math.round(basePrice * 0.92); // 8% discount
      }

      setForm((prev) => ({
        ...prev,
        [name]: value,
        estimatedPrice: finalPrice,
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  // 👉 NEW VERSION: sends data to backend
  async function handleSubmit(e) {
    e.preventDefault();

    console.log("📋 Form submission attempt");
    console.log("Form data:", form);
    console.log("Required fields check:");
    console.log("  firstName:", form.firstName, form.firstName ? "✓" : "✗");
    console.log("  phone:", form.phone, form.phone ? "✓" : "✗");
    console.log("  area:", form.area, form.area ? "✓" : "✗");
    console.log("  service:", form.service, form.service ? "✓" : "✗");
    console.log("  date:", form.date, form.date ? "✓" : "✗");

    // very simple validation - trim values to handle whitespace
    if (
      !form.firstName?.trim() ||
      !form.phone?.trim() ||
      !form.area?.trim() ||
      !form.service?.trim() ||
      !form.date?.trim()
    ) {
      console.error("❌ Validation failed - missing required fields");
      setMessage("Please fill all required fields (marked *).");
      return;
    }

    console.log("✅ Validation passed, submitting to backend...");

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
