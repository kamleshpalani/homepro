# Database Schema Design - Dynamic & Scalable

## Overview

The HomeCare Pro database is designed to be **flexible, scalable, and future-proof** by supporting dynamic field additions without requiring schema migrations or code changes.

## Key Features

### 1. **Strict Mode Disabled (`strict: false`)**

- Allows storing fields not explicitly defined in the schema
- Future features can add new fields without breaking existing code
- Perfect for A/B testing and gradual rollouts

### 2. **Mixed Type Fields**

- `customFields`: Object to store any additional data
- `performance.customMetrics`: Extensible metrics tracking
- `preferences`: User-specific settings (in User schema)

### 3. **Schema Versioning**

- Each document has `schemaVersion` field (default: 1)
- Enables data migrations and backward compatibility
- Can identify which version of data structure is being used

### 4. **Default Values**

- All fields have sensible defaults
- Prevents `undefined` or `null` errors
- Makes frontend code more robust

### 5. **Timestamps**

- Automatic `createdAt` and `updatedAt` on all documents
- Track when records are created and modified
- Useful for auditing and analytics

## Schema Structures

### Booking Schema

```javascript
{
  // Standard booking fields...

  // Dynamic extensibility
  customFields: {},        // Any additional data
  schemaVersion: 1,        // Track schema changes

  // Options
  strict: false,           // Allow undefined fields
  timestamps: true,        // createdAt, updatedAt
  minimize: false          // Keep empty objects
}
```

### Cleaner Schema

```javascript
{
  // Standard cleaner fields...

  // Dynamic extensibility
  customFields: {},        // Any additional data
  performance: {
    totalJobsCompleted: 0,
    averageRating: 0,
    totalRatings: 0,
    customMetrics: {}      // Extensible metrics
  },
  schemaVersion: 1,

  // Options
  strict: false,
  timestamps: true,
  minimize: false,
  toJSON: { getters: true }  // Apply getters when converting to JSON
}
```

### User/Customer Schema

```javascript
{
  // Standard user fields...

  // Dynamic extensibility
  preferences: {},         // User preferences
  schemaVersion: 1,

  // Options
  strict: false,
  timestamps: true,
  minimize: false
}
```

## Frontend Safety

### Safe Field Access

All admin views use helper functions to prevent errors:

```javascript
// Helper to safely access fields with fallback
const getFieldValue = (obj, field, fallback = "N/A") => {
  const value = obj?.[field];
  if (value === undefined || value === null || value === "") {
    return fallback;
  }
  return value;
};

// Helper for array fields
const getArrayField = (obj, field, fallback = []) => {
  const value = obj?.[field];
  if (Array.isArray(value)) return value;
  if (typeof value === "string" && value) {
    return value.split(",").map((s) => s.trim());
  }
  return fallback;
};
```

### Usage Examples

```javascript
// Safe access - won't crash if field missing
const email = getFieldValue(cleaner, "email", "No email");
const services = getArrayField(cleaner, "servicesOffered", []);
const area = getFieldValue(booking, "area", "Unknown");
```

## Adding New Fields - Best Practices

### Backend (server.js)

1. **For optional fields**: Just use them! `strict: false` allows it

   ```javascript
   await Booking.create({
     ...existingFields,
     newFeatureField: "value", // Works automatically!
   });
   ```

2. **For structured/validated fields**: Add to schema

   ```javascript
   const bookingSchema = new mongoose.Schema({
     // ... existing fields
     newRequiredField: { type: String, required: true, default: "" },
     newOptionalField: { type: Number, default: 0 },
   });
   ```

3. **For metadata**: Use customFields
   ```javascript
   await Booking.create({
     ...existingFields,
     customFields: {
       experimentalFeature: true,
       betaUserData: { ... },
     },
   });
   ```

### Frontend (Admin Views)

1. **Always use safe accessors**:

   ```javascript
   const value = getFieldValue(record, "newField", "default");
   ```

2. **Check before displaying**:

   ```javascript
   {
     cleaner.newField && <div>{cleaner.newField}</div>;
   }
   ```

3. **Handle arrays safely**:
   ```javascript
   const items = getArrayField(record, "newArrayField", []);
   ```

## Data Migration Strategy

### When Schema Version Changes

```javascript
// Example migration function
async function migrateBookingsV1toV2() {
  const oldBookings = await Booking.find({ schemaVersion: 1 });

  for (const booking of oldBookings) {
    booking.newField = deriveFromOldData(booking);
    booking.schemaVersion = 2;
    await booking.save();
  }
}
```

### Backward Compatibility

```javascript
// Handle both old and new formats
const getServices = (cleaner) => {
  // V2: Array
  if (Array.isArray(cleaner.servicesOffered)) {
    return cleaner.servicesOffered;
  }
  // V1: Comma-separated string
  if (typeof cleaner.servicesOffered === "string") {
    return cleaner.servicesOffered.split(",").map((s) => s.trim());
  }
  return [];
};
```

## Performance Metrics System

### Extensible Performance Tracking

```javascript
// Update cleaner performance
await Cleaner.findByIdAndUpdate(cleanerId, {
  $inc: { "performance.totalJobsCompleted": 1 },
  $set: {
    "performance.averageRating": newAverage,
    "performance.customMetrics.lastMonthEarnings": 5000,
  },
});
```

## Benefits

### ✅ Future-Proof

- Add fields without downtime
- No schema migrations needed
- A/B test features easily

### ✅ Robust

- Default values prevent errors
- Safe accessors in frontend
- Graceful degradation

### ✅ Scalable

- Mixed types handle complex data
- Versioning enables migrations
- Timestamps for analytics

### ✅ Consistent

- All views show available data
- Missing fields don't break UI
- Filters handle undefined gracefully

## Example: Adding a New Feature

### Scenario: Add "Preferred Language" to Bookings

**Backend** (NO schema update needed!):

```javascript
app.post("/api/bookings", async (req, res) => {
  const booking = await Booking.create({
    ...req.body,
    preferredLanguage: req.body.preferredLanguage || "English",
  });
  res.json(booking);
});
```

**Frontend**:

```javascript
<td>{getFieldValue(booking, "preferredLanguage", "English")}</td>
```

**That's it!** No migration, no downtime, no breaking changes.

## Monitoring & Debugging

### Check Schema Versions

```javascript
db.bookings.aggregate([
  { $group: { _id: "$schemaVersion", count: { $sum: 1 } } },
]);
```

### Find Documents with Custom Fields

```javascript
db.cleaners.find({ customFields: { $exists: true, $ne: {} } });
```

### Audit Recent Changes

```javascript
db.bookings
  .find({
    updatedAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
  })
  .sort({ updatedAt: -1 });
```

## Summary

The database is now:

- ✅ **Dynamic**: Add fields without schema updates
- ✅ **Safe**: Frontend handles missing data gracefully
- ✅ **Versioned**: Track and migrate schema changes
- ✅ **Consistent**: Admin views show all available data
- ✅ **Scalable**: Ready for future growth

All changes are backward compatible and production-ready! 🚀
