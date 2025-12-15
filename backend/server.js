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
    // Contact Information
    firstName: { type: String, required: true },
    lastName: { type: String },
    phone: { type: String, required: true },
    email: { type: String },
    preferredContactMethod: { type: String, default: "whatsapp" },
    preferredContactTime: { type: String },

    // Service Details
    service: { type: String, required: true },
    serviceOther: { type: String },
    area: { type: String, required: true },
    areaOther: { type: String },
    hours: { type: Number, default: 1 },
    estimatedPrice: { type: Number },
    date: { type: String, required: true },
    timeSlot: { type: String },

    // Enhanced Service Fields (Coimbatore specific)
    numBedrooms: { type: String },
    numBathrooms: { type: String },
    serviceFrequency: { type: String, default: "one-time" },
    cleaningMaterials: { type: String, default: "cleaner-provides" },
    cleanBalcony: { type: Boolean, default: false },
    cleanTerrace: { type: Boolean, default: false },
    cleanStaircase: { type: Boolean, default: false },
    cleanParking: { type: Boolean, default: false },

    // Address
    address1: { type: String },
    address2: { type: String },
    city: { type: String, default: "Coimbatore" },
    state: { type: String, default: "Tamil Nadu" },
    country: { type: String, default: "India" },
    pincode: { type: String },

    // Property & Cleaner Preferences
    propertyType: { type: String },
    propertyTypeOther: { type: String },
    floorCount: { type: String },
    approxAreaSqft: { type: Number },
    petsAtHome: { type: String, default: "no" },
    propertyAccess: { type: String, default: "customer-present" },

    // Cleaner Preferences
    cleanerGenderPreference: { type: String, default: "no-preference" },
    cleanerExperiencePreference: { type: String, default: "any" },
    languageTamil: { type: Boolean, default: false },
    languageEnglish: { type: Boolean, default: false },
    languageHindi: { type: Boolean, default: false },
    languageMalayalam: { type: Boolean, default: false },

    // Additional
    notes: { type: String, default: "" },

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
    adminNotes: {
      type: String,
      default: "",
    },

    // Dynamic fields support - allows future field additions without schema changes
    customFields: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    // Schema version for tracking changes
    schemaVersion: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
    strict: false, // Allow fields not defined in schema for future flexibility
    minimize: false, // Keep empty objects
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

// ---- CLEANER SCHEMA & MODEL ----
const cleanerSchema = new mongoose.Schema(
  {
    // Personal Information (Step 1)
    firstName: { type: String },
    lastName: { type: String },
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    password: { type: String },
    phone: { type: String, required: true },
    gender: { type: String },
    dateOfBirth: { type: String },

    // Location Details (Step 2)
    area: { type: String, required: true },
    areaOther: { type: String },
    areasServed: { type: [String], default: [] }, // NEW: Multi-area support
    city: { type: String },
    address1: { type: String },
    state: { type: String },
    pincode: { type: String },

    // Professional Details (Step 3)
    experienceYears: { type: String, default: "0-1" },
    educationLevel: { type: String },
    expectedSalaryPerJob: { type: String },
    typeOfWork: {
      type: mongoose.Schema.Types.Mixed, // Support both string and array
      default: [],
      get: function (val) {
        // Convert to array for consistency
        if (typeof val === "string") {
          return val ? val.split(",").map((s) => s.trim()) : [];
        }
        if (Array.isArray(val)) {
          return val;
        }
        return [];
      },
    },
    preferredContactMethod: { type: String, default: "whatsapp" },
    ownVehicle: { type: String, default: "no" },
    servicesOffered: {
      type: mongoose.Schema.Types.Mixed, // NEW: Support both string (legacy) and array
      default: [],
      get: function (val) {
        // Backward compatibility: convert string to array on read
        if (typeof val === "string") {
          return val ? val.split(",").map((s) => s.trim()) : [];
        }
        return val || [];
      },
    },
    languagesKnown: { type: String },
    previousEmployment: { type: String },

    // Skills & Equipment (Step 4)
    skillDeepCleaning: { type: Boolean, default: false },
    skillCarpetCleaning: { type: Boolean, default: false },
    skillWindowCleaning: { type: Boolean, default: false },
    skillKitchenCleaning: { type: Boolean, default: false },
    skillBathroomCleaning: { type: Boolean, default: false },
    skillFloorPolishing: { type: Boolean, default: false },
    equipmentVacuum: { type: Boolean, default: false },
    equipmentMop: { type: Boolean, default: false },
    equipmentCleaningSupplies: { type: Boolean, default: false },
    equipmentSteamCleaner: { type: Boolean, default: false },
    equipmentPressureWasher: { type: Boolean, default: false },
    certifications: { type: String },

    // Availability (Step 5)
    availableFrom: { type: String },
    preferredShift: { type: String },
    availableMonday: { type: Boolean, default: false },
    availableTuesday: { type: Boolean, default: false },
    availableWednesday: { type: Boolean, default: false },
    availableThursday: { type: Boolean, default: false },
    availableFriday: { type: Boolean, default: false },
    availableSaturday: { type: Boolean, default: false },
    availableSunday: { type: Boolean, default: false },

    // NEW: Structured Availability
    availability: {
      days: { type: [String], default: [] }, // ["Mon","Tue","Wed",...]
      timeWindows: [
        {
          start: { type: String }, // "09:00"
          end: { type: String }, // "13:00"
        },
      ],
      maxJobsPerDay: { type: Number, default: 3 },
    },

    // Banking & References (Step 6)
    bankName: { type: String },
    bankAccountNumber: { type: String },
    bankIFSC: { type: String },
    bankAccountHolderName: { type: String },
    reference1: { type: String },
    reference2: { type: String },

    // Emergency Contact (Step 7)
    emergencyContactName: { type: String },
    emergencyContactRelation: { type: String },
    emergencyContactPhone: { type: String },
    emergencyContactAddress: { type: String },

    // Identity & Health (Step 8)
    idProofType: { type: String },
    idProofNumber: { type: String },
    idProofFile: { type: String },
    photoFile: { type: String },
    covidVaccinationStatus: { type: String },
    hasMedicalConditions: { type: String, default: "no" },
    medicalConditionsDetails: { type: String },
    policeVerificationStatus: { type: String },
    consentBackgroundCheck: { type: Boolean, default: false },
    notes: { type: String, default: "" },

    // NEW: Application Management
    applicationStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Hold"],
      default: "Pending",
    },
    reviewNotes: { type: String, default: "" },
    reviewedAt: { type: Date },
    reviewedBy: { type: String }, // Admin email/name who reviewed

    // System fields
    isActive: { type: Boolean, default: false },
    source: { type: String, default: "public_form" },

    // Dynamic fields support - allows future field additions without schema changes
    customFields: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    // Performance tracking (extensible)
    performance: {
      totalJobsCompleted: { type: Number, default: 0 },
      averageRating: { type: Number, default: 0 },
      totalRatings: { type: Number, default: 0 },
      customMetrics: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
    },

    // Schema version for tracking changes
    schemaVersion: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    strict: false, // Allow fields not defined in schema for future flexibility
    minimize: false, // Keep empty objects
    toJSON: { getters: true }, // Enable getters for servicesOffered
    toObject: { getters: true },
  }
);

// Hash password before saving (only if password is provided)
cleanerSchema.pre("save", async function (save) {
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const Cleaner = mongoose.model("Cleaner", cleanerSchema);

// ---- CUSTOMER USER SCHEMA & MODEL ----
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String }, // Made optional
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    addresses: [
      {
        label: { type: String, default: "Home" }, // Home, Office, etc.
        address1: String,
        address2: String,
        city: String,
        state: String,
        pincode: String,
        isDefault: { type: Boolean, default: false },
      },
    ],
    isActive: { type: Boolean, default: true },

    // Dynamic fields support
    preferences: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    // Schema version
    schemaVersion: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    strict: false, // Allow fields not defined in schema
    minimize: false,
  }
);

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

// ---- TRANSACTION/PAYMENT SCHEMA ----
const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
    amount: { type: Number, required: true },
    type: {
      type: String,
      enum: ["booking", "refund", "wallet_credit", "referral_bonus"],
      default: "booking",
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "completed",
    },
    paymentMethod: { type: String, default: "Cash" },
    transactionId: String,
    description: String,
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

// ---- WALLET SCHEMA ----
const walletSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    balance: { type: Number, default: 0 },
    transactions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
    ],
  },
  { timestamps: true }
);

const Wallet = mongoose.model("Wallet", walletSchema);

// ---- LOYALTY/REWARDS SCHEMA ----
const loyaltySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    points: { type: Number, default: 0 },
    tier: {
      type: String,
      enum: ["bronze", "silver", "gold", "platinum"],
      default: "bronze",
    },
    lifetimePoints: { type: Number, default: 0 },
    pointsHistory: [
      {
        points: Number,
        action: String,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Loyalty = mongoose.model("Loyalty", loyaltySchema);

// ---- REVIEW SCHEMA ----
const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    cleanerId: { type: mongoose.Schema.Types.ObjectId, ref: "Cleaner" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
    photos: [String],
    response: String,
    isPublic: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

// ---- NOTIFICATION SCHEMA ----
const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ["booking", "payment", "promotion", "alert", "system"],
      default: "system",
    },
    isRead: { type: Boolean, default: false },
    actionUrl: String,
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

// ---- REFERRAL SCHEMA ----
const referralSchema = new mongoose.Schema(
  {
    referrerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    refereeId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    referralCode: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    reward: { type: Number, default: 100 },
    refereeEmail: String,
  },
  { timestamps: true }
);

const Referral = mongoose.model("Referral", referralSchema);

// ---- SUPPORT TICKET SCHEMA ----
const ticketSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved", "closed"],
      default: "open",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    replies: [
      {
        from: String,
        message: String,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

// ---- SUBSCRIPTION SCHEMA ----
const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    planName: { type: String, required: true },
    frequency: {
      type: String,
      enum: ["weekly", "biweekly", "monthly"],
      default: "monthly",
    },
    service: { type: String, required: true },
    startDate: { type: Date, required: true },
    nextBillingDate: Date,
    status: {
      type: String,
      enum: ["active", "paused", "cancelled"],
      default: "active",
    },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

// ---- MIDDLEWARES ----
// allow both Vite ports while developing
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:8081",
    ],
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

// ---- CUSTOMER AUTH ROUTES ----

// Customer Signup
app.post("/api/auth/signup", async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body || {};

  console.log("📝 Signup request received:", {
    firstName,
    lastName,
    email,
    phone,
  });

  if (!firstName || !email || !phone || !password) {
    return res
      .status(400)
      .json({ message: "Required fields: firstName, email, phone, password" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "An account with this email already exists" });
    }

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone,
      password,
    });

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: "customer" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("✅ New customer registered:", user.email);

    return res.status(201).json({
      message: "Account created successfully",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error("❌ Error creating user:", err.message);
    console.error("Stack:", err.stack);
    return res.status(500).json({
      message: "Failed to create account",
      error: err.message,
    });
  }
});

// Customer Login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.isActive) {
      return res
        .status(401)
        .json({ message: "Your account has been deactivated" });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: "customer" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("👤 Customer logged in:", user.email);

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ message: "Login failed" });
  }
});

// Middleware to verify customer token
function requireCustomer(req, res, next) {
  const authHeader = req.headers.authorization || "";

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: missing token" });
  }

  const token = authHeader.slice(7);

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    console.error("JWT error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

// Get customer profile
app.get("/api/auth/profile", requireCustomer, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (err) {
    console.error("Error fetching profile:", err);
    return res.status(500).json({ message: "Failed to fetch profile" });
  }
});

// Update customer profile
app.put("/api/auth/profile", requireCustomer, async (req, res) => {
  const { firstName, lastName, phone } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { firstName, lastName, phone },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error("Error updating profile:", err);
    return res.status(500).json({ message: "Failed to update profile" });
  }
});

// Add address
app.post("/api/auth/addresses", requireCustomer, async (req, res) => {
  const { label, address1, address2, city, state, pincode, isDefault } =
    req.body;

  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If this is default, unset other defaults
    if (isDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
    }

    user.addresses.push({
      label,
      address1,
      address2,
      city,
      state,
      pincode,
      isDefault,
    });
    await user.save();

    return res.json({
      message: "Address added successfully",
      addresses: user.addresses,
    });
  } catch (err) {
    console.error("Error adding address:", err);
    return res.status(500).json({ message: "Failed to add address" });
  }
});

// Delete address
app.delete(
  "/api/auth/addresses/:addressId",
  requireCustomer,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.addresses = user.addresses.filter(
        (addr) => addr._id.toString() !== req.params.addressId
      );
      await user.save();

      return res.json({
        message: "Address deleted",
        addresses: user.addresses,
      });
    } catch (err) {
      console.error("Error deleting address:", err);
      return res.status(500).json({ message: "Failed to delete address" });
    }
  }
);

// Get customer's bookings
app.get("/api/auth/bookings", requireCustomer, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find bookings by phone number (since bookings use phone)
    const bookings = await Booking.find({ phone: user.phone }).sort({
      createdAt: -1,
    });
    return res.json(bookings);
  } catch (err) {
    console.error("Error fetching user bookings:", err);
    return res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

// ---- BOOKINGS ROUTES ----

// Public: create a booking from the customer form
app.post("/api/bookings", async (req, res) => {
  const {
    firstName,
    lastName,
    phone,
    email,
    preferredContactMethod,
    preferredContactTime,
    service,
    serviceOther,
    area,
    areaOther,
    hours,
    estimatedPrice,
    date,
    timeSlot,
    numBedrooms,
    numBathrooms,
    serviceFrequency,
    cleaningMaterials,
    cleanBalcony,
    cleanTerrace,
    cleanStaircase,
    cleanParking,
    address1,
    address2,
    city,
    state,
    country,
    pincode,
    propertyType,
    propertyTypeOther,
    floorCount,
    approxAreaSqft,
    petsAtHome,
    propertyAccess,
    cleanerGenderPreference,
    cleanerExperiencePreference,
    languageTamil,
    languageEnglish,
    languageHindi,
    languageMalayalam,
    notes,
  } = req.body;

  // Basic validation
  if (!firstName || !phone || !area || !service || !date) {
    return res.status(400).json({
      message: "Missing required fields: firstName, phone, area, service, date",
    });
  }

  try {
    const booking = await Booking.create({
      firstName,
      lastName,
      phone,
      email,
      preferredContactMethod,
      preferredContactTime,
      service,
      serviceOther,
      area,
      areaOther,
      hours,
      estimatedPrice,
      date,
      timeSlot,
      numBedrooms,
      numBathrooms,
      serviceFrequency,
      cleaningMaterials,
      cleanBalcony,
      cleanTerrace,
      cleanStaircase,
      cleanParking,
      address1,
      address2,
      city,
      state,
      country,
      pincode,
      propertyType,
      propertyTypeOther,
      floorCount,
      approxAreaSqft,
      petsAtHome,
      propertyAccess,
      cleanerGenderPreference,
      cleanerExperiencePreference,
      languageTamil,
      languageEnglish,
      languageHindi,
      languageMalayalam,
      notes,
    });

    console.log("New Coimbatore booking saved:", booking);

    return res.status(201).json({
      message: "Booking received successfully for Coimbatore location",
      bookingId: booking._id,
      service: booking.service,
      area: booking.area,
      estimatedPrice: booking.estimatedPrice,
    });
  } catch (err) {
    console.error("Error saving booking:", err);
    return res.status(500).json({
      message: "Failed to save booking",
      error: err.message,
    });
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
  const { status, assignedCleaner, date, timeSlot, adminNotes } = req.body;

  // Validate status if provided
  const validStatuses = [
    "New",
    "Assigned",
    "In Progress",
    "Completed",
    "Cancelled",
  ];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({
      message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
    });
  }

  try {
    const updateFields = {};
    if (status !== undefined) updateFields.status = status;
    if (assignedCleaner !== undefined)
      updateFields.assignedCleaner = assignedCleaner;
    if (date !== undefined) updateFields.date = date;
    if (timeSlot !== undefined) updateFields.timeSlot = timeSlot;
    if (adminNotes !== undefined) updateFields.adminNotes = adminNotes;

    // Auto-update status from "New" to "Assigned" when a cleaner is assigned
    if (assignedCleaner !== undefined && assignedCleaner !== "") {
      const currentBooking = await Booking.findById(id);
      if (currentBooking && currentBooking.status === "New") {
        updateFields.status = "Assigned";
        console.log(
          `📌 Auto-updating status from "New" to "Assigned" for booking ${id}`
        );
      }
    }

    const booking = await Booking.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    console.log(`✅ Booking ${id} updated by admin:`, updateFields);
    return res.json(booking);
  } catch (err) {
    console.error("Error updating booking:", err);
    return res.status(500).json({ message: "Failed to update booking" });
  }
});

// ---- CLEANERS ROUTES ----

// ✅ PUBLIC: Cleaner Login
app.post("/api/cleaners/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const cleaner = await Cleaner.findOne({ email });

    if (!cleaner) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!cleaner.password) {
      return res.status(401).json({
        message:
          "Please complete your account setup through the application form",
      });
    }

    const isMatch = await bcrypt.compare(password, cleaner.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!cleaner.isActive) {
      return res.status(403).json({
        message:
          "Your account is pending approval. Please wait for admin verification.",
      });
    }

    const token = jwt.sign(
      { cleanerId: cleaner._id, email: cleaner.email, role: "cleaner" },
      JWT_SECRET,
      { expiresIn: "30d" }
    );

    return res.json({
      message: "Login successful",
      token,
      cleaner: {
        id: cleaner._id,
        firstName: cleaner.firstName,
        lastName: cleaner.lastName,
        name: cleaner.name,
        email: cleaner.email,
        phone: cleaner.phone,
        area: cleaner.area,
        isActive: cleaner.isActive,
      },
    });
  } catch (err) {
    console.error("Error in cleaner login:", err);
    return res.status(500).json({ message: "Login failed" });
  }
});

// ✅ PUBLIC: "Apply as cleaner" – no admin token needed
app.post("/api/cleaners/apply", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    area,
    areasServed, // NEW: comma-separated or array
    city,
    address1,
    state,
    pincode,
    experienceYears,
    expectedSalaryPerJob,
    typeOfWork,
    preferredContactMethod,
    servicesOffered, // NEW: comma-separated or array
    languagesKnown,
    idProofType,
    idProofNumber,
    notes,
    areaOther,
    // NEW: Availability fields
    availabilityDays,
    availabilityTimeWindows,
    maxJobsPerDay,
  } = req.body || {};

  // Debug logging
  console.log("📝 Cleaner application received:", {
    firstName,
    lastName,
    phone,
    area,
    email,
  });

  // Trim values and check for required fields
  const trimmedFirstName = (firstName || "").trim();
  const trimmedLastName = (lastName || "").trim();
  const trimmedPhone = (phone || "").trim();
  const trimmedArea = (area || "").trim();

  if (!trimmedFirstName || !trimmedLastName || !trimmedPhone || !trimmedArea) {
    return res.status(400).json({
      message: "First name, last name, phone, and area are required",
      received: {
        firstName: !!trimmedFirstName,
        lastName: !!trimmedLastName,
        phone: !!trimmedPhone,
        area: !!trimmedArea,
      },
    });
  }

  try {
    // Check for duplicate phone
    const existingByPhone = await Cleaner.findOne({ phone: trimmedPhone });
    if (existingByPhone) {
      return res.status(400).json({
        message: "Phone number already registered.",
      });
    }

    // Check for duplicate email (if provided)
    const trimmedEmail = email ? email.trim() : "";
    if (trimmedEmail) {
      const existingByEmail = await Cleaner.findOne({ email: trimmedEmail });
      if (existingByEmail) {
        return res.status(400).json({
          message:
            "Email already registered. Please login or use a different email.",
        });
      }
    }

    const fullName = `${trimmedFirstName} ${trimmedLastName}`;
    const finalArea =
      trimmedArea === "Others / Not listed"
        ? (areaOther || "").trim()
        : trimmedArea;

    // Convert servicesOffered to array
    let servicesArray = [];
    if (Array.isArray(servicesOffered)) {
      servicesArray = servicesOffered;
    } else if (typeof servicesOffered === "string" && servicesOffered) {
      servicesArray = servicesOffered
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    // Convert areasServed to array
    let areasArray = [finalArea];
    if (Array.isArray(areasServed)) {
      areasArray = areasServed;
    } else if (typeof areasServed === "string" && areasServed) {
      areasArray = areasServed
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    // Parse availability
    let availabilityData = {
      days: [],
      timeWindows: [],
      maxJobsPerDay: maxJobsPerDay || 3,
    };

    if (availabilityDays) {
      availabilityData.days = Array.isArray(availabilityDays)
        ? availabilityDays
        : availabilityDays
            .split(",")
            .map((d) => d.trim())
            .filter(Boolean);
    }

    if (availabilityTimeWindows) {
      availabilityData.timeWindows = Array.isArray(availabilityTimeWindows)
        ? availabilityTimeWindows
        : [];
    }

    // Create temp password if email provided
    const tempPassword = trimmedEmail
      ? `${trimmedFirstName}${trimmedPhone.slice(-4)}`
      : undefined;

    const cleaner = await Cleaner.create({
      firstName: trimmedFirstName,
      lastName: trimmedLastName,
      name: fullName,
      email: trimmedEmail || undefined,
      password: tempPassword, // Will be hashed by pre-save hook
      phone: trimmedPhone,
      area: finalArea,
      areasServed: areasArray,
      city: city || "",
      address1: address1 || "",
      state: state || "",
      pincode: pincode || "",
      experienceYears: experienceYears || "0-1",
      expectedSalaryPerJob: expectedSalaryPerJob || "",
      typeOfWork: typeOfWork || "",
      preferredContactMethod: preferredContactMethod || "whatsapp",
      servicesOffered: servicesArray,
      languagesKnown: languagesKnown || "",
      idProofType: idProofType || "",
      idProofNumber: idProofNumber || "",
      notes: notes || "",
      availability: availabilityData,
      applicationStatus: "Pending",
      isActive: false, // Will be set to true only after admin approval
      source: "public_form",
    });

    console.log("🧹 New cleaner application:", cleaner.name, cleaner.phone);

    // Log credentials server-side (will be sent via email in production)
    if (tempPassword) {
      console.log("📧 [EMAIL WOULD BE SENT] To:", cleaner.email);
      console.log(
        "   Credentials - Email:",
        cleaner.email,
        "Password:",
        tempPassword
      );
      console.log("   Application ID:", cleaner._id);

      // TODO: Send email here
      // Example: await sendEmail({
      //   to: cleaner.email,
      //   subject: 'HomeCare Pro - Application Received',
      //   text: `Thank you for applying! Your login credentials:
      //          Email: ${cleaner.email}
      //          Password: ${tempPassword}
      //          We'll review your application within 24 hours.`
      // });
    }

    const response = {
      message: `Thank you for applying! Your application has been received and is pending review. Login credentials have been sent to ${cleaner.email}. We'll review your application within 24 hours.`,
      cleanerId: cleaner._id,
      applicationStatus: cleaner.applicationStatus,
    };

    return res.status(201).json(response);
  } catch (err) {
    console.error("❌ Error creating cleaner application:", err);
    console.error("Error details:", err.message);
    console.error("Stack trace:", err.stack);
    return res.status(500).json({
      message: "Failed to submit cleaner application",
      error: err.message,
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
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
    // Only return approved + active cleaners for booking assignment
    const cleaners = await Cleaner.find({
      applicationStatus: "Approved",
      isActive: true,
    }).sort({ name: 1 });
    return res.json(cleaners);
  } catch (err) {
    console.error("Error loading cleaners:", err);
    return res.status(500).json({ message: "Failed to load cleaners" });
  }
});

// NEW: Admin-only list with metrics
app.get("/api/admin/cleaners", requireAdmin, async (req, res) => {
  try {
    console.log("📞 GET /api/admin/cleaners called");
    const cleaners = await Cleaner.find().sort({ createdAt: -1 }).lean();
    console.log(`✅ Found ${cleaners.length} cleaners in database`);

    // Fetch all bookings to compute metrics
    const bookings = await Booking.find().lean();

    // Compute metrics for each cleaner
    const cleanersWithMetrics = cleaners.map((cleaner) => {
      // Find bookings assigned to this cleaner
      const assignedBookings = bookings.filter(
        (b) =>
          b.assignedCleaner === cleaner.name ||
          b.assignedCleaner === cleaner._id.toString()
      );

      const totalAssigned = assignedBookings.length;
      const completed = assignedBookings.filter(
        (b) => b.status === "Completed"
      ).length;
      const cancelled = assignedBookings.filter(
        (b) => b.status === "Cancelled"
      ).length;

      // Find last assigned date
      const sortedByDate = assignedBookings.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      const lastAssignedDate = sortedByDate[0]?.createdAt || null;

      // Completion rate
      const completionRate =
        totalAssigned > 0 ? Math.round((completed / totalAssigned) * 100) : 0;

      return {
        ...cleaner,
        metrics: {
          totalAssigned,
          completed,
          cancelled,
          completionRate,
          lastAssignedDate,
          averageRating: 0, // Placeholder for future rating system
        },
      };
    });

    console.log(
      `📤 Returning ${cleanersWithMetrics.length} cleaners with metrics`
    );
    return res.json(cleanersWithMetrics);
  } catch (err) {
    console.error("❌ Error loading cleaners with metrics:", err);
    return res.status(500).json({ message: "Failed to load cleaners" });
  }
});

// NEW: Admin-only - Approve/Reject/Hold cleaner application
app.patch("/api/admin/cleaners/:id/status", requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { applicationStatus, reviewNotes } = req.body;

  const validStatuses = ["Pending", "Approved", "Rejected", "Hold"];
  if (!applicationStatus || !validStatuses.includes(applicationStatus)) {
    return res.status(400).json({
      message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
    });
  }

  try {
    const updateData = {
      applicationStatus,
      reviewedAt: new Date(),
      reviewedBy: req.admin.email || "admin",
    };

    if (reviewNotes !== undefined) {
      updateData.reviewNotes = reviewNotes;
    }

    // Auto-activate if approved
    if (applicationStatus === "Approved") {
      updateData.isActive = true;
    }

    // Auto-deactivate if rejected
    if (applicationStatus === "Rejected") {
      updateData.isActive = false;
    }

    const cleaner = await Cleaner.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!cleaner) {
      return res.status(404).json({ message: "Cleaner not found" });
    }

    console.log(
      `✅ Cleaner ${cleaner.name} status updated to ${applicationStatus} by ${req.admin.email}`
    );
    return res.json(cleaner);
  } catch (err) {
    console.error("Error updating cleaner status:", err);
    return res.status(500).json({ message: "Failed to update status" });
  }
});

// NEW: Admin-only - Toggle cleaner active status
app.patch("/api/admin/cleaners/:id/active", requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  if (typeof isActive !== "boolean") {
    return res.status(400).json({ message: "isActive must be a boolean" });
  }

  try {
    const cleaner = await Cleaner.findByIdAndUpdate(
      id,
      { isActive },
      { new: true, runValidators: true }
    );

    if (!cleaner) {
      return res.status(404).json({ message: "Cleaner not found" });
    }

    console.log(
      `✅ Cleaner ${cleaner.name} ${
        isActive ? "activated" : "deactivated"
      } by ${req.admin.email}`
    );
    return res.json(cleaner);
  } catch (err) {
    console.error("Error toggling cleaner active status:", err);
    return res.status(500).json({ message: "Failed to update active status" });
  }
});

// ---- WALLET & TRANSACTIONS ROUTES ----

// Get wallet balance
app.get("/api/wallet", requireCustomer, async (req, res) => {
  try {
    let wallet = await Wallet.findOne({ userId: req.user.userId });
    if (!wallet) {
      wallet = await Wallet.create({ userId: req.user.userId, balance: 0 });
    }
    return res.json(wallet);
  } catch (err) {
    console.error("Error fetching wallet:", err);
    return res.status(500).json({ message: "Failed to fetch wallet" });
  }
});

// Get transaction history
app.get("/api/transactions", requireCustomer, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .limit(50);
    return res.json(transactions);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    return res.status(500).json({ message: "Failed to fetch transactions" });
  }
});

// ---- LOYALTY & REWARDS ROUTES ----

// Get loyalty points
app.get("/api/loyalty", requireCustomer, async (req, res) => {
  try {
    let loyalty = await Loyalty.findOne({ userId: req.user.userId });
    if (!loyalty) {
      loyalty = await Loyalty.create({ userId: req.user.userId, points: 0 });
    }
    return res.json(loyalty);
  } catch (err) {
    console.error("Error fetching loyalty:", err);
    return res.status(500).json({ message: "Failed to fetch loyalty points" });
  }
});

// Redeem points
app.post("/api/loyalty/redeem", requireCustomer, async (req, res) => {
  const { points, reward } = req.body;

  try {
    const loyalty = await Loyalty.findOne({ userId: req.user.userId });
    if (!loyalty || loyalty.points < points) {
      return res.status(400).json({ message: "Insufficient points" });
    }

    loyalty.points -= points;
    loyalty.pointsHistory.push({
      points: -points,
      action: `Redeemed for ${reward}`,
    });
    await loyalty.save();

    return res.json({ message: "Points redeemed successfully", loyalty });
  } catch (err) {
    console.error("Error redeeming points:", err);
    return res.status(500).json({ message: "Failed to redeem points" });
  }
});

// ---- REVIEW ROUTES ----

// Get user reviews
app.get("/api/reviews", requireCustomer, async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.user.userId })
      .populate("bookingId")
      .sort({ createdAt: -1 });
    return res.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    return res.status(500).json({ message: "Failed to fetch reviews" });
  }
});

// Create review
app.post("/api/reviews", requireCustomer, async (req, res) => {
  const { bookingId, rating, comment, photos } = req.body;

  if (!bookingId || !rating) {
    return res
      .status(400)
      .json({ message: "Booking ID and rating are required" });
  }

  try {
    const review = await Review.create({
      userId: req.user.userId,
      bookingId,
      rating,
      comment,
      photos: photos || [],
    });

    // Award points for review
    let loyalty = await Loyalty.findOne({ userId: req.user.userId });
    if (loyalty) {
      loyalty.points += 10;
      loyalty.lifetimePoints += 10;
      loyalty.pointsHistory.push({ points: 10, action: "Review submitted" });
      await loyalty.save();
    }

    return res
      .status(201)
      .json({ message: "Review submitted successfully", review });
  } catch (err) {
    console.error("Error creating review:", err);
    return res.status(500).json({ message: "Failed to submit review" });
  }
});

// ---- NOTIFICATION ROUTES ----

// Get notifications
app.get("/api/notifications", requireCustomer, async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .limit(50);
    return res.json(notifications);
  } catch (err) {
    console.error("Error fetching notifications:", err);
    return res.status(500).json({ message: "Failed to fetch notifications" });
  }
});

// Mark notification as read
app.put("/api/notifications/:id/read", requireCustomer, async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { isRead: true },
      { new: true }
    );
    return res.json(notification);
  } catch (err) {
    console.error("Error marking notification as read:", err);
    return res.status(500).json({ message: "Failed to update notification" });
  }
});

// Mark all as read
app.put("/api/notifications/read-all", requireCustomer, async (req, res) => {
  try {
    await Notification.updateMany(
      { userId: req.user.userId, isRead: false },
      { isRead: true }
    );
    return res.json({ message: "All notifications marked as read" });
  } catch (err) {
    console.error("Error marking all as read:", err);
    return res.status(500).json({ message: "Failed to update notifications" });
  }
});

// ---- REFERRAL ROUTES ----

// Get referral info
app.get("/api/referral", requireCustomer, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    let referralCode = `HC${user._id.toString().slice(-6).toUpperCase()}`;

    const referrals = await Referral.find({ referrerId: req.user.userId });
    const earnings =
      referrals.filter((r) => r.status === "completed").length * 100;

    return res.json({
      referralCode,
      totalReferrals: referrals.length,
      completedReferrals: referrals.filter((r) => r.status === "completed")
        .length,
      earnings,
      referrals,
    });
  } catch (err) {
    console.error("Error fetching referral info:", err);
    return res.status(500).json({ message: "Failed to fetch referral info" });
  }
});

// Apply referral code (during signup)
app.post("/api/referral/apply", requireCustomer, async (req, res) => {
  const { referralCode } = req.body;

  try {
    const referrer = await User.findOne({
      _id: { $regex: new RegExp(referralCode.slice(2), "i") },
    });

    if (!referrer) {
      return res.status(404).json({ message: "Invalid referral code" });
    }

    await Referral.create({
      referrerId: referrer._id,
      refereeId: req.user.userId,
      referralCode,
      status: "completed",
    });

    // Credit both users
    let referrerWallet = await Wallet.findOne({ userId: referrer._id });
    if (referrerWallet) {
      referrerWallet.balance += 100;
      await referrerWallet.save();
    }

    let refereeWallet = await Wallet.findOne({ userId: req.user.userId });
    if (refereeWallet) {
      refereeWallet.balance += 50;
      await refereeWallet.save();
    }

    return res.json({ message: "Referral applied successfully" });
  } catch (err) {
    console.error("Error applying referral:", err);
    return res.status(500).json({ message: "Failed to apply referral" });
  }
});

// ---- SUPPORT TICKET ROUTES ----

// Get user tickets
app.get("/api/tickets", requireCustomer, async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.user.userId }).sort({
      createdAt: -1,
    });
    return res.json(tickets);
  } catch (err) {
    console.error("Error fetching tickets:", err);
    return res.status(500).json({ message: "Failed to fetch tickets" });
  }
});

// Create ticket
app.post("/api/tickets", requireCustomer, async (req, res) => {
  const { subject, message, priority } = req.body;

  if (!subject || !message) {
    return res
      .status(400)
      .json({ message: "Subject and message are required" });
  }

  try {
    const ticket = await Ticket.create({
      userId: req.user.userId,
      subject,
      message,
      priority: priority || "medium",
    });

    return res
      .status(201)
      .json({ message: "Ticket created successfully", ticket });
  } catch (err) {
    console.error("Error creating ticket:", err);
    return res.status(500).json({ message: "Failed to create ticket" });
  }
});

// ---- SUBSCRIPTION ROUTES ----

// Get user subscriptions
app.get("/api/subscriptions", requireCustomer, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ userId: req.user.userId });
    return res.json(subscriptions);
  } catch (err) {
    console.error("Error fetching subscriptions:", err);
    return res.status(500).json({ message: "Failed to fetch subscriptions" });
  }
});

// Create subscription
app.post("/api/subscriptions", requireCustomer, async (req, res) => {
  const { planName, frequency, service, startDate, price } = req.body;

  if (!planName || !service || !price) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const subscription = await Subscription.create({
      userId: req.user.userId,
      planName,
      frequency: frequency || "monthly",
      service,
      startDate: startDate || new Date(),
      price,
    });

    return res
      .status(201)
      .json({ message: "Subscription created successfully", subscription });
  } catch (err) {
    console.error("Error creating subscription:", err);
    return res.status(500).json({ message: "Failed to create subscription" });
  }
});

// Update subscription status
app.put("/api/subscriptions/:id", requireCustomer, async (req, res) => {
  const { status } = req.body;

  try {
    const subscription = await Subscription.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { status },
      { new: true }
    );

    return res.json({
      message: "Subscription updated successfully",
      subscription,
    });
  } catch (err) {
    console.error("Error updating subscription:", err);
    return res.status(500).json({ message: "Failed to update subscription" });
  }
});

// ---- START SERVER ----
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
