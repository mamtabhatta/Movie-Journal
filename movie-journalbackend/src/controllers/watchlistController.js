const Watchlist = require('../models/watchList');

const addToWatchlist = async (req, res) => {
    try {
        if (req.user.role === 'admin') {
            return res.status(403).json({ message: 'Admins cannot have a watchlist' });
        }

        const { movieId, status } = req.body;
        const userId = req.user.id;

        const exists = await Watchlist.findOne({ user: userId, movie: movieId });
        if (exists) {
            return res.status(400).json({ message: "Movie already in watchlist" });
        }

        const entry = new Watchlist({
            user: userId,
            movie: movieId,
            status: status || 'Plan to Watch'
        });

        await entry.save();
        res.status(201).json({
            message: "Movie added to watchlist successfully",
            watchlist: entry
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const getWatchlist = async (req, res) => {
    try {
        if (req.user.role === 'admin') {
            return res.status(403).json({ message: 'Admins do not have a watchlist' });
        }

        const userId = req.user.id;
        const watchlist = await Watchlist.find({ user: userId }).populate('movie');
        res.json(watchlist);
    } catch (error) {
        res.status(500).json({ message: "Failed to get watchList", error: error.message });
    }
};

const updateWatchlist = async (req, res) => {
    try {
        if (req.user.role === 'admin') {
            return res.status(403).json({ message: 'Admins cannot update watchlist' });
        }

        const userId = req.user.id;
        const { id } = req.params;
        const { status } = req.body;

        const update = await Watchlist.findOneAndUpdate(
            { _id: id, user: userId },
            { status },
            { new: true }
        ).populate('movie');

        if (!update) {
            return res.status(404).json({ message: "Watchlist item not found" });
        }
        res.json(update);
    } catch (error) {
        res.status(500).json({ message: "Failed to update watchList", error: error.message });
    }
};
const deleteFromWatchlist = async (req, res) => {
    try {
        const watchlistId = req.params.id;

        const deleted = await Watchlist.findOneAndDelete({
            _id: watchlistId,
            user: req.user.id
        });

        if (!deleted) {
            return res.status(404).json({ message: "Movie not found in watchlist" });
        }

        res.status(200).json({ message: "Movie removed from watchlist successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};





module.exports = {
    addToWatchlist,
    getWatchlist,
    updateWatchlist,
    deleteFromWatchlist
};
