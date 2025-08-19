import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import axios from "axios";
import addToWatchlist from "../../utils/AddtoWatchList";
import "./Home.css";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/movies/");
        setMovies(response.data);
      } catch (error) {
        setMessage(
          "Failed to load movies: " +
          (error.response?.data?.message || error.message)
        );
      }
    };

    fetchMovies();
  }, []);

  
  return (
    <div className="home-container">
      <section className="welcome-section">
        <h1 className="main-heading"> Welcome:) </h1>
        <p className="sub-text">
          Explore, track, review, and rate your favorite movies all in one place.
        </p>
      </section>

      <section className="features-section">
        <h2 className="section-heading">What you can do</h2>
        <ul className="features-list">
          <li>Browse movies by title, genre</li>
          <li>Rate and review any movie</li>
          <li>Add movies to your watchlist with custom status</li>
          <li>Organize: Watching, Completed, Plan to Watch, Dropped</li>
        </ul>
      </section>

      <section className="movies-section">
        <h2 className="section-heading">Available Movies</h2>

        {message && <p className="error-message">{message}</p>}

        {movies.length === 0 ? (
          <p>No movies available.</p>
        ) : (
          <div className="movies-grid">
            {movies.slice(0, 8).map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                onAddToWatchlist={() => addToWatchlist(movie._id)}
              />
            ))}
          </div>
        )}
        <div className="dashlink">
          <Link to="/dashboard">
            <button>Browser All Movies</button>
          </Link>
        </div>
      </section>

      <section className="cta-section">
        <p>Ready to get started?</p>
        <Link to="/addMovie">
          <button className="primary-btn">Add Movie</button>
        </Link>
        <Link to="/watchlist">
          <button className="secondary-btn"> My Watchlist</button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
