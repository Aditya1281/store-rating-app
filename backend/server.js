const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const storeRoutes = require("./routes/stores");
const ratingsRoutes = require("./routes/ratings");
const adminRoutes = require("./routes/admin");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// ============================
// MIDDLEWARE
// ============================

app.use(cors());
app.use(express.json());

// ============================
// AUTH ROUTES
// ============================

app.use("/api/auth", authRoutes);

// ============================
// STORE ROUTES
// ============================

app.use("/api/stores", storeRoutes);

// ============================
// RATING ROUTES
// ============================

app.use("/api/ratings", ratingsRoutes);

// ============================
// ADMIN ROUTES
// ============================

app.use("/api/admin", adminRoutes);

// ============================
// MONGODB CONNECTION
// ============================

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:");
    console.error(error);
  });

// ============================
// TEST ROUTE
// ============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "StoreRate API is running",
  });
});

// ============================
// START SERVER
// ============================

app.listen(PORT, () => {
  console.log(
    `StoreRate backend running on http://localhost:${PORT}`
  );
});