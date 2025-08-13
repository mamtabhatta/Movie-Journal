import React from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = ({ movie, onAddToWatchlist }) => {
  return (
    <div className="movie-card">
      <Link to={`/movieDetail/${movie._id}`} className="movie-link">
        {movie.poster && (
          <img src={movie.poster} alt={movie.title} className="movie-poster" />
        )}
      </Link>
      <div className="movie-title">{movie.title}</div>
      <div className="rating">
        <span className="star">★</span> {movie.rating}
      </div>
      <button
        className="watchlist-button"
        onClick={() =>  onAddToWatchlist(movie._id)}
      >+
      </button>
    </div>
  );
};

export default MovieCard;
