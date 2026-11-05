import mongoose from "mongoose";

const officeSchema = new mongoose.Schema(
  {
    country: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Office", officeSchema);
