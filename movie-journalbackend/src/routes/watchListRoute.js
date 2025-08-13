const express = require('express');
const { addToWatchlist, getWatchlist, updateWatchlist, removeFromWatchlist } = require('../controllers/watchlistController');
const router = express.Router();

const protect = require("../middleware/AuthMiddleware");

router.post("/", protect, addToWatchlist);
router.get("/get", protect, getWatchlist);
router.put("/:id", protect, updateWatchlist);
router.delete("/:id", protect, removeFromWatchlist);

module.exports = router;