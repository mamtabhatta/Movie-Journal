const Watchlist = require('../models/watchList');

const addToWatchlist = async (req, res) => {
    try {
        const { movieId, status } = req.body;
        const userId = req.user.id;

        const exists = await Watchlist.findOne({ user: userId, movie: movieId });
        if (exists) {
            return res.status(400).json({ message: "Movie already in watchlist" });
        }
        const entry = new Watchlist({ user: userId, movie: movieId, status });
        await entry.save();
        res.status(201).json(entry);
    } catch (error) {
        res.status(500).json({ message: "Failed to add to watchlist", error: error.message });
    }
};


const getWatchlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const watchlist = await Watchlist.find({ user: userId }).populate('movie');
        res.json(watchlist);
    } catch (error) {
        res.status(500).json({ message: "Failed to get watchList", error: error.message });
    }
};
const updateWatchlist = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const update = await Watchlist.findByIdAndUpdate(id, { status }, { new: true }).populate('movie');
        if (!update) {
            return res.status(404).json({ message: "Watchlist item not found" });
        }
        res.json(update);
    } catch (error) {
        res.status(500).json({ message: "Failed to update watchList", error: error.message });
    }
};
const removeFromWatchlist = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Watchlist.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Watchlist item not found' });
        }

        res.json({ message: 'Removed from watchlist' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove from watchlist', error: error.message });
    }
};
module.exports = {
    addToWatchlist,
    getWatchlist,
    updateWatchlist,
    removeFromWatchlist
}
