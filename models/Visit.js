import mongoose from "mongoose";

const VisitSchema = new mongoose.Schema(
  {
    guestName: {
      type: String,
      required: [true, "Guest name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    visitDate: {
      type: String, // YYYY-MM-DD
      required: [true, "Visit date is required"],
      match: [
        /^\d{4}-\d{2}-\d{2}$/u,
        "Visit date must be in YYYY-MM-DD format",
      ],
    },
    visitTime: {
      type: String, // HH:mm 24h
      required: [true, "Visit time is required"],
      match: [
        /^(?:[01]\d|2[0-3]):[0-5]\d$/u,
        "Visit time must be in HH:mm (24h) format",
      ],
    },
    visitAt: {
      type: Date, // Combined Date object for easier querying/sorting
      required: true,
    },
    countryCode: {
      type: String,
      required: [true, "Country code is required"],
      match: [/^\+?\d{1,4}$/u, "Country code must be like +91, +1, 91, etc."],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\d{7,15}$/u, "Phone number must be 7-15 digits"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/, "Invalid email format"],
    },

    address: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    aadhaar: {
      type: String,
      trim: true,
      match: [/^\d{12}$/u, "Aadhaar must be 12 digits"],
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Visit", VisitSchema);
