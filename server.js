require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");

const enquiryRoutes = require("./routes/enquiries");
const serviceRoutes = require("./routes/services");
const testimonialRoutes = require("./routes/testimonials");

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic rate limiting on the public enquiry endpoint to prevent spam
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { error: "Too many requests, please try again later." },
});
app.use("/api/enquiries", enquiryLimiter);

// --- Routes ---
app.get("/api/health", (req, res) => res.json({ status: "ok", company: "Gupta Paints and Decorators" }));
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.post("/api/contact", enquiryLimiter, (req, res) => {
  // This endpoint can be used for a contact form submission
  // For now, it just returns a success message
  res.json({ message: "Contact form submitted successfully." });
});

// --- Start ---
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`[server] Gupta Paints API running on http://localhost:${PORT}`);
  });
});
