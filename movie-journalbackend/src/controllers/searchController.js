const Movie = require("../models/MovieModel");

exports.searchMovies = async (req, res) => {
    const { title, genre } = req.query;

    if (!title && !genre) {
        return res.status(400).json({ error: "Title or genre is required" });
    }

    try {
        const query = {};

        if (title || genre) {
            query.$or = [];
            if (title) query.$or.push({ title: { $regex: title, $options: "i" } });
            if (genre) query.$or.push({ genre: { $regex: genre, $options: "i" } });
        }

        const movies = await Movie.find(query);
        res.json(movies);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};
