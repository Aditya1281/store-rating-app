const express = require("express");
const router = express.Router();

const Store = require("../models/Store");
const Rating = require("../models/Rating");

// ============================
// GET ALL STORES
// ============================

router.get("/", async (req, res) => {
  try {
    const stores = await Store.find()
      .sort({ createdAt: -1 })
      .lean();

    const storesWithRatings = await Promise.all(
      stores.map(async (store) => {
        const ratings = await Rating.find({
          store: store._id,
        }).lean();

        const reviews = ratings.length;

        const totalRating = ratings.reduce(
          (sum, item) => sum + item.rating,
          0
        );

        const averageRating =
          reviews > 0
            ? Number((totalRating / reviews).toFixed(1))
            : 0;

        return {
          ...store,
          rating: averageRating,
          reviews,
        };
      })
    );

    res.json({
      success: true,
      stores: storesWithRatings,
    });
  } catch (error) {
    console.error("Get stores error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch stores",
    });
  }
});

// ============================
// GET OWNER STORE + RATINGS
// ============================

router.get("/owner/:ownerId", async (req, res) => {
  try {
    const { ownerId } = req.params;

    const store = await Store.findOne({
      owner: ownerId,
    }).lean();

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found for this owner",
      });
    }

    const ratings = await Rating.find({
      store: store._id,
    })
      .populate("user", "name email address")
      .sort({ createdAt: -1 })
      .lean();

    const totalRatings = ratings.length;

    const totalRating = ratings.reduce(
      (sum, item) => sum + item.rating,
      0
    );

    const averageRating =
      totalRatings > 0
        ? Number((totalRating / totalRatings).toFixed(1))
        : 0;

    res.json({
      success: true,
      store: {
        ...store,
        rating: averageRating,
        reviews: totalRatings,
      },
      ratings,
    });
  } catch (error) {
    console.error("Get owner store error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch owner store",
    });
  }
});

// ============================
// GET SINGLE STORE
// ============================

router.get("/:id", async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }

    const ratings = await Rating.find({
      store: store._id,
    }).lean();

    const reviews = ratings.length;

    const totalRating = ratings.reduce(
      (sum, item) => sum + item.rating,
      0
    );

    const averageRating =
      reviews > 0
        ? Number((totalRating / reviews).toFixed(1))
        : 0;

    res.json({
      success: true,
      store: {
        ...store.toObject(),
        rating: averageRating,
        reviews,
      },
    });
  } catch (error) {
    console.error("Get store error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch store",
    });
  }
});

module.exports = router;