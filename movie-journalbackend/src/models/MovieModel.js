const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: String,
    genre: String,
    year: Number,
    duration: Number,
    status: String,
    poster: String,
    synopsis: String,
    cast: [String],
    rating: Number,
    review: String,
    watchedOn: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});


module.exports = mongoose.model('Movie', movieSchema);