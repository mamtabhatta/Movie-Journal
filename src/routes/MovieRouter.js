const express = require("express");
const router = express.Router();
const { addMovie, getAllMovies, getMovie, updateMovie } = require('../controllers/movieController');
const authMiddleware = require("../middleware/authMiddleware");

router.post("/addmovie", addMovie);
router.get("/", getAllMovies);
router.get("/:id", getMovie);
router.put("/:id", updateMovie);
router.post("/", authMiddleware,addMovie)
module.exports = router;