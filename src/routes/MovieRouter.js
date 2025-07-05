const express = require("express");
const router = express.Router();
const { addMovie, getAllMovies, getMovie, updateMovie } = require('../controllers/MovieController');
const authMiddleware = require("../middleware/AuthMiddleware");

router.post("/addmovie", addMovie);
router.get("/", getAllMovies);
router.get("/:id", getMovie);
router.put("/:id", updateMovie);
router.post("/", authMiddleware, addMovie);

module.exports = router;
