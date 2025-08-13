const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  status: { type: String, enum: ['Watching', 'Completed', 'Plan to Watch', 'Dropped'], default: 'Plan to Watch' },
});

module.exports = mongoose.model('Watchlist', watchlistSchema);
