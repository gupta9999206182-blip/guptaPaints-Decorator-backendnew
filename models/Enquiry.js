const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, default: "" },
    city: { type: String, trim: true, default: "" },
    propertyType: {
      type: String,
      enum: ["Interior", "Exterior", "Waterproofing", "Wood Coating", "Full Home", "Other"],
      default: "Other",
    },
    message: { type: String, trim: true, default: "" },
    status: {
      type: String,
      enum: ["new", "contacted", "site_visit_scheduled", "quoted", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enquiry", enquirySchema);
