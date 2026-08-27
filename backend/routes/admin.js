const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Store = require("../models/Store");
const Rating = require("../models/Rating");

// ============================
// ADMIN DASHBOARD STATS
// ============================

router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStores = await Store.countDocuments();
    const totalRatings = await Rating.countDocuments();

    const ratingData = await Rating.aggregate([
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    const averageRating =
      ratingData.length > 0
        ? Number(ratingData[0].averageRating.toFixed(1))
        : 0;

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalStores,
        totalRatings,
        averageRating,
      },
    });
  } catch (error) {
    console.error("Admin stats error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch admin stats",
    });
  }
});

module.exports = router;