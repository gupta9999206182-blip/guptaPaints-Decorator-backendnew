const express = require("express");
const router = express.Router();
const Testimonial = require("../models/Testimonial");

// GET /api/testimonials -> all active testimonials
router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ active: true }).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: "Failed to load testimonials." });
  }
});

// POST /api/testimonials -> add a new testimonial (simple admin use)
router.post("/", async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json(testimonial);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
