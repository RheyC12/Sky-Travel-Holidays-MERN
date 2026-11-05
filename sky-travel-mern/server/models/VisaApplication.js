import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    label: { type: String, required: true }, // e.g. "Passport Copy", "Photo"
    fileName: { type: String, required: true },
    filePath: { type: String, required: true },
    mimeType: { type: String },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const statusHistorySchema = new mongoose.Schema(
  {
    status: { type: String, required: true },
    note: { type: String },
    changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    changedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const visaApplicationSchema = new mongoose.Schema(
  {
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    referenceNumber: { type: String, required: true, unique: true },

    country: { type: mongoose.Schema.Types.ObjectId, ref: "Country", required: true },
    visaType: { type: String, required: true }, // Tourist, Business, Transit, Visa Change...

    // Traveler / applicant details
    fullName: { type: String, required: true },
    passportNumber: { type: String, required: true },
    passportExpiry: { type: Date, required: true },
    dateOfBirth: { type: Date, required: true },
    nationality: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },

    // Travel details
    intendedTravelDate: { type: Date },
    durationOfStayDays: { type: Number },
    purposeOfTravel: { type: String },

    documents: [documentSchema],

    status: {
      type: String,
      enum: [
        "submitted",
        "under_review",
        "additional_docs_required",
        "approved",
        "rejected",
        "cancelled",
      ],
      default: "submitted",
    },
    statusHistory: [statusHistorySchema],
    adminNotes: { type: String },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    fee: { type: Number, default: 0 },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded"],
      default: "unpaid",
    },
  },
  { timestamps: true }
);

visaApplicationSchema.index({ applicant: 1, createdAt: -1 });
visaApplicationSchema.index({ status: 1 });

visaApplicationSchema.pre("validate", function (next) {
  if (!this.referenceNumber) {
    const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.referenceNumber = `STH-${Date.now().toString().slice(-6)}-${rand}`;
  }
  next();
});

export default mongoose.model("VisaApplication", visaApplicationSchema);
