// src/pages/CleanerApply.jsx
import { useState } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import CleanerApplyView from "./CleanerApplyView.jsx";

export default function CleanerApply() {
  const [form, setForm] = useState({
    // Step 1: Personal Information
    firstName: "",
    lastName: "",
    phone: "",
    email: "",

    // Step 2: Location Details
    area: "",
    areaOther: "",
    city: "",
    address1: "",
    state: "",
    pincode: "",

    // Step 3: Professional Details
    experienceYears: "",
    educationLevel: "",
    expectedSalaryPerJob: "",
    typeOfWork: "",
    preferredContactMethod: "whatsapp",
    gender: "",
    dateOfBirth: "",
    ownVehicle: "no",
    servicesOffered: "",
    languagesKnown: "",
    previousEmployment: "",

    // Step 4: Skills & Equipment
    skillDeepCleaning: false,
    skillCarpetCleaning: false,
    skillWindowCleaning: false,
    skillKitchenCleaning: false,
    skillBathroomCleaning: false,
    skillFloorPolishing: false,
    equipmentVacuum: false,
    equipmentMop: false,
    equipmentCleaningSupplies: false,
    equipmentSteamCleaner: false,
    equipmentPressureWasher: false,
    certifications: "",

    // Step 5: Availability
    availableFrom: "",
    preferredShift: "",
    availableMonday: false,
    availableTuesday: false,
    availableWednesday: false,
    availableThursday: false,
    availableFriday: false,
    availableSaturday: false,
    availableSunday: false,

    // Step 6: Banking & References
    bankName: "",
    bankAccountNumber: "",
    bankIFSC: "",
    bankAccountHolderName: "",
    reference1: "",
    reference2: "",

    // Step 7: Emergency Contact
    emergencyContactName: "",
    emergencyContactRelation: "",
    emergencyContactPhone: "",
    emergencyContactAddress: "",

    // Step 8: Identity & Health
    idProofType: "",
    idProofNumber: "",
    idProofFile: null,
    photoFile: null,
    covidVaccinationStatus: "",
    hasMedicalConditions: "no",
    medicalConditionsDetails: "",
    consentBackgroundCheck: false,
    policeVerificationStatus: "",
    notes: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    if (type === "file") {
      setForm((prev) => ({ ...prev, [name]: files[0] || null }));
    } else if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    setError("");

    try {
      console.log("➡ Sending cleaner application:", form);

      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      const res = await fetch("http://localhost:4000/api/cleaners/apply", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit application");
      }

      setMessage(
        data.message ||
          "Thank you! Your application was submitted successfully. We'll review it within 24 hours."
      );

      // Reset form to initial state
      setCurrentStep(1);
      window.scrollTo(0, 0);
    } catch (err) {
      console.error("Cleaner apply error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentStep < 8) setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  return (
    <MainLayout>
      <CleanerApplyView
        form={form}
        message={message}
        error={error}
        submitting={submitting}
        currentStep={currentStep}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </MainLayout>
  );
}
