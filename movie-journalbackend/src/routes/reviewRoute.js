const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/AuthMiddleware");
const { addReview, getReviews, deleteReview } = require("../controllers/reviewController");

router.post("/", authMiddleware, addReview);
router.get("/:movieId", authMiddleware, getReviews);
router.delete("/:id", authMiddleware, deleteReview);

module.exports = router;