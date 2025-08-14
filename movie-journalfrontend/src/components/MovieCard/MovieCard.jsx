import React from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = ({ movie, onAddToWatchlist }) => {
  return (
    <div className="movie-card">
      <Link to={`/movieDetail/${movie._id}`} className="movie-link">
        <img
          src={movie.poster || "/placeholder.jpg"}
          alt={movie.title}
          className="movie-poster"
        />
      </Link>

      <div className="movie-title">{movie.title}</div>
      <div className="rating">
        <span className="star">★</span> {movie.rating || "N/A"}
      </div>
      <button
        className="watchlist-button"
        onClick={() => onAddToWatchlist(movie._id)}
        title="Add to Watchlist"
      >
        +
      </button>
    </div>
  );
};

export default MovieCard;
