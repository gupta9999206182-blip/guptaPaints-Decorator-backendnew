const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: { type: String, required: true },
    description: { type: String, default: "" },
    icon: { type: String, default: "roller" }, // maps to an icon key on the frontend
    priceFrom: { type: String, default: "" }, // e.g. "Rs. 12/sqft"
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
