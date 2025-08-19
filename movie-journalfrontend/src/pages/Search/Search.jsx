import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard"; 
import addToWatchlist from "../../utils/AddtoWatchList";
import "./Search.css";

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query.trim()) {
        setMovies([]);
        setMessage("Please enter a valid title or genre");
        return;
      }
      try {
        const res = await axios.get("http://localhost:5000/api/search/search", {
          params: { title: query, genre: query },
        });

        if (!res.data.length) {
          setMessage("No movies found");
        } else {
          setMessage("");
        }

        setMovies(res.data);
      } catch (err) {
        console.error(err);
        setMessage("Failed to fetch movies");
      }
    };
    fetchMovies();
  }, [query]);

  return (
    <div className="search-container">
      <h2>Search Results for "{query}"</h2>
      {message && <p className="search-message">{message}</p>}
      {movies.length > 0 && (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onAddToWatchlist={() => addToWatchlist(movie._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
