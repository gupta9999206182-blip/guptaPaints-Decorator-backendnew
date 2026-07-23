/**
 * seed.js
 * Populates the database with starter Services and Testimonials
 * so the site isn't empty on first run.
 *
 * Run with: npm run seed
 */
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Service = require("./models/Service");
const Testimonial = require("./models/Testimonial");

const services = [
  {
    title: "Interior Painting",
    slug: "interior-painting",
    shortDescription: "Fresh, long-lasting finishes for living rooms, bedrooms, and kitchens.",
    description:
      "Our interior painting service covers surface prep, putty & primer, and 2-3 coats of premium emulsion in the shade of your choice.",
    icon: "roller",
    priceFrom: "Rs. 12/sqft",
    order: 1,
  },
  {
    title: "Exterior Painting",
    slug: "exterior-painting",
    shortDescription: "Weatherproof paints that protect and beautify your home's facade.",
    description:
      "Built to withstand sun, rain, and pollution — our exterior painting uses weather-resistant coats with a long warranty.",
    icon: "house",
    priceFrom: "Rs. 20/sqft",
    order: 2,
  },
  {
    title: "Waterproofing",
    slug: "waterproofing",
    shortDescription: "Stop leaks and seepage before they damage your walls and ceilings.",
    description:
      "Terrace, bathroom, and wall waterproofing using proven membrane and coating systems.",
    icon: "droplet",
    priceFrom: "Rs. 45/sqft",
    order: 3,
  },
  {
    title: "Wood Coating & Polishing",
    slug: "wood-coating",
    shortDescription: "Restore doors, windows, and furniture with a durable wood finish.",
    description:
      "Melamine, PU, and duco finishes applied by trained craftsmen for a smooth, lasting shine.",
    icon: "brush",
    priceFrom: "Rs. 60/sqft",
    order: 4,
  },
  {
    title: "Texture & Stencil Walls",
    slug: "texture-stencil",
    shortDescription: "Add depth and character with designer textures and stencil art.",
    description:
      "From subtle textures to statement accent walls, we bring designer finishes to your home.",
    icon: "sparkles",
    priceFrom: "Rs. 80/sqft",
    order: 5,
  },
  {
    title: "Wall Putty & Repair",
    slug: "putty-repair",
    shortDescription: "Crack filling, damp-patch repair, and surface levelling before painting.",
    description:
      "Proper surface preparation is the foundation of a paint job that lasts — we never skip it.",
    icon: "trowel",
    priceFrom: "Rs. 8/sqft",
    order: 6,
  },
];

const testimonials = [
  {
    name: "Ramesh Sharma",
    city: "Gurugram",
    rating: 5,
    message:
      "Gupta Paints did a fantastic job on our 3BHK. Neat work, finished on time, and the team cleaned up after every day.",
  },
  {
    name: "Priya Malhotra",
    city: "Delhi",
    rating: 5,
    message:
      "Very professional team. The colour consultation helped us pick the perfect shades for every room.",
  },
  {
    name: "Anil Kumar",
    city: "Faridabad",
    rating: 4,
    message:
      "Good quality work on our exterior painting. Would recommend for waterproofing too.",
  },
];

async function seed() {
  await connectDB();

  await Service.deleteMany({});
  await Service.insertMany(services);
  console.log(`[seed] Inserted ${services.length} services`);

  await Testimonial.deleteMany({});
  await Testimonial.insertMany(testimonials);
  console.log(`[seed] Inserted ${testimonials.length} testimonials`);

  await mongoose.disconnect();
  console.log("[seed] Done.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
