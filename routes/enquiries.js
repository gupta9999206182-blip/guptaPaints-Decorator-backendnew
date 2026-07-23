const express = require("express");
const router = express.Router();
const Enquiry = require("../models/Enquiry");

// POST /api/enquiries  -> submit a new quote / site-visit request (from the QuoteForm)
router.post("/", async (req, res) => {
  try {
    const { name, phone, email, city, propertyType, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: "Name and phone number are required." });
    }

    const phoneDigits = String(phone).replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      return res.status(400).json({ error: "Please enter a valid phone number." });
    }

    const enquiry = await Enquiry.create({
      name,
      phone,
      email,
      city,
      propertyType,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Thanks! Our team will call you shortly to schedule your free site visit.",
      enquiry,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

// GET /api/enquiries  -> list all enquiries (simple admin/back-office view)
router.get("/", async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(200);
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ error: "Failed to load enquiries." });
  }
});

// PATCH /api/enquiries/:id  -> update status (e.g. mark contacted)
router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!enquiry) return res.status(404).json({ error: "Not found" });
    res.json(enquiry);
  } catch (err) {
    res.status(500).json({ error: "Failed to update enquiry." });
  }
});

// DELETE /api/enquiries/:id
router.delete("/:id", async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete enquiry." });
  }
});

module.exports = router;
