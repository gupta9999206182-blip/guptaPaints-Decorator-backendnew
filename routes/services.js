const express = require("express");
const router = express.Router();
const Service = require("../models/Service");

// GET /api/services -> all active services, used to render the Services section
router.get("/", async (req, res) => {
  try {
    const services = await Service.find({ active: true }).sort({ order: 1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: "Failed to load services." });
  }
});

// POST /api/services -> add a new service (simple admin use)
router.post("/", async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
