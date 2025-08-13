const express = require("express");
const router = express.Router();
const { addMovie, getAllMovies, getMovie, updateMovie, deleteMovie } = require('../controllers/MovieController');
const authMiddleware = require("../middleware/AuthMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

router.get("/", getAllMovies);
router.get("/:id", getMovie);

router.post("/addmovie", authMiddleware, authorizeRole("admin"), addMovie);
router.put("/:id", authMiddleware, authorizeRole("admin"), updateMovie);
router.delete("/delete/:id", authMiddleware, authorizeRole("admin"), deleteMovie);

module.exports = router;
