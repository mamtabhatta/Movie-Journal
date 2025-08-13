const Review = require("../models/Review");

const addReview = async (req, res) => {
    try {
        const { movieId, reviewText, rating } = req.body;
        const userId = req.user.id;

        const review = new Review({
            user: userId,
            movie: movieId,
            reviewText,
            rating,
        });

        await review.save();
        res.status(201).json({ message: 'Review added', review });
    } catch (err) {
        res.status(500).json({ message: 'Error adding review' });
    }
};

const getReviews = async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const reviews = await Review.find({ movie: movieId }).populate('user', 'name');
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Error getting reviews' });
    }
};

const deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        await Review.findByIdAndDelete(reviewId);
        res.json({ message: 'Review deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting review' });
    }
};

module.exports = {
    addReview,
    getReviews,
    deleteReview,
};