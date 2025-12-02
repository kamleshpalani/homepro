// backend/server.js
require("dotenv").config(); // Load .env variables

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

// ------------- CONNECT TO MONGODB -------------
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// ------------- BOOKING SCHEMA & MODEL -------------
const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    area: { type: String, required: true },
    service: { type: String, required: true },
    date: { type: String, required: true }, // keep as string from form
    timeSlot: { type: String },
    notes: { type: String },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

// ------------- MIDDLEWARES -------------
app.use(cors());
app.use(express.json());

// ------------- ROUTES -------------

// Simple health check
app.get("/", (req, res) => {
  res.send("HomeCare Pro backend is running with MongoDB");
});

// POST /api/bookings -> save booking to MongoDB
app.post("/api/bookings", async (req, res) => {
  const { name, phone, area, service, date, timeSlot, notes } = req.body;

  // Basic validation
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

    res.status(201).json({
      message: "Booking received successfully",
      bookingId: booking._id, // MongoDB-generated ID
    });
  } catch (err) {
    console.error("Error saving booking:", err);
    res.status(500).json({ message: "Failed to save booking" });
  }
});

// GET /api/bookings -> return all bookings (for Admin view)
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 }); // newest first
    res.json(bookings);
  } catch (err) {
    console.error("Error loading bookings:", err);
    res.status(500).json({ message: "Failed to load bookings" });
  }
});

// ------------- START SERVER -------------
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
