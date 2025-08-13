import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../../components/MovieCard/MovieCard";
import "./WatchList.css";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/watchlist/get", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWatchlist(res.data);
      } catch (error) {
        setMessage(error.response?.data?.message || error.message);
      }
    };
    fetchWatchlist();
  }, [token]);

  if (message) return <p>{message}</p>;

  return (
    <div className="watchlist-container">
      <h1>My Watchlist</h1>
      {watchlist.length === 0 ? (
        <p>Your watchlist is empty.</p>
      ) : (
        <div className="movies-grid">
          {watchlist.map((item) => (
            <MovieCard
              key={item._id}
              movie={item.movie}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;

