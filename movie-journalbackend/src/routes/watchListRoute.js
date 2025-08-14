const express = require('express');
const { addToWatchlist, getWatchlist, updateWatchlist, deleteFromWatchlist } = require('../controllers/watchlistController');
const router = express.Router();

const protect = require("../middleware/AuthMiddleware");

router.post("/add", protect, addToWatchlist);
router.get("/get", protect, getWatchlist);
router.put("/:id", protect, updateWatchlist);
router.delete("/:id", protect, deleteFromWatchlist);

module.exports = router;