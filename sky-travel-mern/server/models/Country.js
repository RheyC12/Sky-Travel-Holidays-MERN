import mongoose from "mongoose";

const countrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    region: { type: String, trim: true },
    summary: { type: String, trim: true },
    description: { type: String },
    image: { type: String },
    visaTypesOffered: [{ type: String }],
    processingTimeDays: { type: Number, default: 5 },
    baseFee: { type: Number, default: 0 },
    currency: { type: String, default: "AED" },
    requiredDocuments: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Country", countrySchema);
