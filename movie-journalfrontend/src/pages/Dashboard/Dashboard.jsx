import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../../components/MovieCard/MovieCard";
import "./Dashboard.css";

const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/movies");
        setMovies(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load movies");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  return (
    <div className="dashboard-container">
      <h1>Browse All Movies</h1>
      {movies.length === 0 ? (
        <p>No movies available.</p>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
