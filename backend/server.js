// backend/server.js
require("dotenv").config(); // Load .env variables

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = express();

// ---- ENV VARIABLES ----
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

// Normalise and trim admin credentials from .env
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || "").trim();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_change_me";

// Basic validation of critical env vars
if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is missing in .env");
  process.exit(1);
}

// For debugging: see what we actually loaded from .env
console.log("🔐 Admin email from .env:", JSON.stringify(ADMIN_EMAIL));
console.log("🔐 Admin password length:", ADMIN_PASSWORD.length);

// ---- CONNECT TO MONGODB ----
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ---- BOOKING SCHEMA & MODEL ----
const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    area: { type: String, required: true },
    service: { type: String, required: true },
    date: { type: String, required: true }, // stored as string from form
    timeSlot: { type: String },
    notes: { type: String },

    // Admin-side management fields
    status: {
      type: String,
      enum: ["New", "Assigned", "In Progress", "Completed", "Cancelled"],
      default: "New",
    },
    assignedCleaner: {
      type: String, // for now we store cleaner NAME; later can be ObjectId
      default: "",
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

// ---- CLEANER SCHEMA & MODEL ----
const cleanerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    area: { type: String, required: true },
    experienceYears: { type: Number, default: 0 },
    servicesOffered: { type: String, default: "" },
    notes: { type: String, default: "" },

    // public applicants start as inactive, admin can later mark active
    isActive: { type: Boolean, default: false },
    source: { type: String, default: "public_form" }, // "public_form" | "admin"
  },
  {
    timestamps: true,
  }
);

const Cleaner = mongoose.model("Cleaner", cleanerSchema);

// ---- MIDDLEWARES ----
// allow both Vite ports while developing
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
  })
);
app.use(express.json());

// ---- HEALTH CHECK ----
app.get("/", (req, res) => {
  res.send("HomeCare Pro backend is running with MongoDB");
});

// ---- AUTH MIDDLEWARE (for admin-only routes) ----
function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization || "";

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: missing token" });
  }

  const token = authHeader.slice(7); // remove "Bearer "

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    if (payload.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized: not admin" });
    }

    req.admin = payload;
    next();
  } catch (err) {
    console.error("JWT error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

// ---- AUTH ROUTES ----
// TEMP: Always succeed admin login for debugging
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body || {};

  const inputEmail = (email || "").trim().toLowerCase();
  const inputPassword = (password || "").trim();

  console.log("👀 Admin login attempt (TEMP):", {
    inputEmail,
    inputPasswordLength: inputPassword.length,
  });

  // ⚠️ TEMPORARY: we are NOT checking password here
  // As long as email is present, we log in.
  if (!inputEmail) {
    return res.status(400).json({ message: "Email is required" });
  }

  const token = jwt.sign(
    { role: "admin", email: inputEmail || "admin@homecarepro.com" },
    JWT_SECRET,
    { expiresIn: "2h" }
  );

  return res.json({
    message: "Admin login successful (TEMP OVERRIDE)",
    token,
  });
});

// ---- BOOKINGS ROUTES ----

// Public: create a booking from the customer form
app.post("/api/bookings", async (req, res) => {
  const { name, phone, area, service, date, timeSlot, notes } = req.body;

  if (!name || !phone || !area || !service || !date) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const booking = await Booking.create({
      name,
      phone,
      area,
      service,
      date,
      timeSlot,
      notes,
    });

    console.log("New booking saved:", booking);

    return res.status(201).json({
      message: "Booking received successfully",
      bookingId: booking._id,
    });
  } catch (err) {
    console.error("Error saving booking:", err);
    return res.status(500).json({ message: "Failed to save booking" });
  }
});

// Admin-only: list all bookings
app.get("/api/bookings", requireAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    return res.json(bookings);
  } catch (err) {
    console.error("Error loading bookings:", err);
    return res.status(500).json({ message: "Failed to load bookings" });
  }
});

// Admin-only: update booking status / assigned cleaner
app.patch("/api/bookings/:id", requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { status, assignedCleaner } = req.body;

  try {
    const booking = await Booking.findByIdAndUpdate(
      id,
      {
        ...(status && { status }),
        ...(assignedCleaner && { assignedCleaner }),
      },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.json(booking);
  } catch (err) {
    console.error("Error updating booking:", err);
    return res.status(500).json({ message: "Failed to update booking" });
  }
});

// ---- CLEANERS ROUTES ----

// ✅ PUBLIC: "Apply as cleaner" – no admin token needed
app.post("/api/cleaners/apply", async (req, res) => {
  const { name, phone, area, experienceYears, servicesOffered, notes } =
    req.body || {};

  if (!name || !phone || !area) {
    return res
      .status(400)
      .json({ message: "Name, phone, and area are required" });
  }

  try {
    const cleaner = await Cleaner.create({
      name,
      phone,
      area,
      experienceYears: experienceYears ? Number(experienceYears) : 0,
      servicesOffered: servicesOffered || "",
      notes: notes || "",
      isActive: false, // applicants start as inactive
      source: "public_form",
    });

    console.log("🧹 New cleaner application:", cleaner);

    return res.status(201).json({
      message:
        "Thank you! Your cleaner application has been received. Our team will review and contact you.",
      cleanerId: cleaner._id,
    });
  } catch (err) {
    console.error("Error creating cleaner application:", err);
    return res
      .status(500)
      .json({ message: "Failed to submit cleaner application" });
  }
});

// Admin-only: register new cleaner directly (created by admin)
app.post("/api/cleaners", requireAdmin, async (req, res) => {
  const { name, phone, area, experienceYears, servicesOffered, notes } =
    req.body;

  if (!name || !phone || !area) {
    return res
      .status(400)
      .json({ message: "Name, phone, and area are required" });
  }

  try {
    const cleaner = await Cleaner.create({
      name,
      phone,
      area,
      experienceYears: experienceYears ? Number(experienceYears) : 0,
      servicesOffered: servicesOffered || "",
      notes: notes || "",
      isActive: true,
      source: "admin",
    });

    console.log("🧹 New cleaner registered by admin:", cleaner);

    return res.status(201).json({
      message: "Cleaner registered successfully",
      cleanerId: cleaner._id,
    });
  } catch (err) {
    console.error("Error registering cleaner:", err);
    return res.status(500).json({ message: "Failed to register cleaner" });
  }
});

// Admin-only: list all cleaners
app.get("/api/cleaners", requireAdmin, async (req, res) => {
  try {
    const cleaners = await Cleaner.find().sort({ createdAt: -1 });
    return res.json(cleaners);
  } catch (err) {
    console.error("Error loading cleaners:", err);
    return res.status(500).json({ message: "Failed to load cleaners" });
  }
});

// ---- START SERVER ----
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
