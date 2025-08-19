import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./WatchList.css";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchWatchlist = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/watchlist/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWatchlist(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch watchlist");
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const removeFromWatchlist = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/watchlist/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchWatchlist();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to delete movie");
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/watchlist/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchWatchlist();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="watchlist-container">
      <h2>My Watchlist</h2>
      {watchlist.length === 0 ? (
        <p className="empty-text">No movies in your watchlist yet.</p>
      ) : (
        <div className="watchlist-grid">
          {watchlist.map((item) => (
            <div
              className="watchlist-card"
              key={item._id}
              onClick={() => navigate(`/movieDetail/${item.movie._id}`)}
              style={{ cursor: "pointer" }}
            >
              <img src={item.movie.poster} alt={item.movie.title} />
              <div className="watchlist-info">
                <h3>{item.movie.title}</h3>
              </div>

              <select
                value={item.status}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => updateStatus(item._id, e.target.value)}
                className={`status-dropdown ${item.status.replace(/\s+/g, "")}`}
              >
                <option value="Plan to Watch">Plan to Watch</option>
                <option value="Watching">Watching</option>
                <option value="Watched">Watched</option>
                <option value="Dropped">Dropped</option>
              </select>

              <button
                className="remove-btn"
                onClick={(e) => {
                  e.stopPropagation(); //To prevent the event from reaching parent elements
                  removeFromWatchlist(item._id);
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
