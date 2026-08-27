const express = require("express");
const Rating = require("../models/Rating");

const router = express.Router();

// ============================
// SUBMIT RATING
// ============================

router.post("/", async (req, res) => {
  try {
    const { user, store, rating, review } = req.body;

    if (!user || !store || !rating) {
      return res.status(400).json({
        message: "User, store and rating are required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    const existingRating = await Rating.findOne({
      user,
      store,
    });

    if (existingRating) {
      existingRating.rating = rating;
      existingRating.review = review || "";

      await existingRating.save();

      return res.status(200).json({
        message: "Rating updated successfully",
        rating: existingRating,
      });
    }

    const newRating = await Rating.create({
      user,
      store,
      rating,
      review: review || "",
    });

    res.status(201).json({
      message: "Rating submitted successfully",
      rating: newRating,
    });
  } catch (error) {
    console.error("Rating error:", error);

    res.status(500).json({
      message: "Failed to submit rating",
      error: error.message,
    });
  }
});

// ============================
// GET RATINGS FOR A STORE
// ============================

router.get("/store/:storeId", async (req, res) => {
  try {
    const { storeId } = req.params;

    const ratings = await Rating.find({
      store: storeId,
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(ratings);
  } catch (error) {
    console.error("Get ratings error:", error);

    res.status(500).json({
      message: "Failed to get ratings",
      error: error.message,
    });
  }
});

// ============================
// GET USER'S RATINGS
// ============================

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const ratings = await Rating.find({
      user: userId,
    })
      .populate("store", "name location")
      .sort({ createdAt: -1 });

    res.status(200).json({
      ratings,
    });
  } catch (error) {
    console.error("Get user ratings error:", error);

    res.status(500).json({
      message: "Failed to get user ratings",
      error: error.message,
    });
  }
});

module.exports = router;