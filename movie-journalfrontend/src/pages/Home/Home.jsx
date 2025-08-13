import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import "./Home.css";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/movies");
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

  const handleAddToWatchlist = async (movieId) => {
    if (!token) return;

    try {
      console.log("Adding to watchlist, movieId:", movieId);
      const res = await axios.post(
        "http://localhost:5000/api/watchlist/",
        { movieId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Failed to add to watchlist:", err.response?.data || err.message);
    }
  };

  return (
    <div className="home-container">
      <section className="welcome-section">
        <h1 className="main-heading">🎬 Welcome to Movie Journal</h1>
        <p className="sub-text">
          Explore, track, review, and rate your favorite movies all in one place.
        </p>
      </section>

      <section className="features-section">
        <h2 className="section-heading">What you can do</h2>
        <ul className="features-list">
          <li>Browse movies by title, genre, or year</li>
          <li>Rate and review any movie</li>
          <li>Add movies to your watchlist with custom status</li>
          <li>Organize: Watching, Completed, Plan to Watch, Dropped</li>
          <li>Admin: Add, edit, or delete movie entries</li>
        </ul>
      </section>

      <section className="movies-section">
        <h2 className="section-heading">Available Movies</h2>
        {message && <p className="error-message">{message}</p>}
        {movies.length === 0 ? (
          <p>No movies available.</p>
        ) : (
          <>
            <div className="movies-grid">
              {movies.map((movie) => (
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  onAddToWatchlist={handleAddToWatchlist}
                />
              ))}
            </div>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <Link to="/dashboard">
                <button className="browse-movies-btn">Browse All Movies</button>
              </Link>
            </div>
          </>
        )}
      </section>

      <section className="cta-section">
        <p>Ready to get started?</p>
        <Link to="/addMovie">
          <button className="primary-btn">Add Your First Movie</button>
        </Link>
        <Link to="/watchlist">
          <button className="secondary-btn">Go to My Watchlist</button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
