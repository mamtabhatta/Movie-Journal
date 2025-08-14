import axios from "axios";

const addToWatchlist = async (movieId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/watchlist",
        { movieId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Movie added to watchlist");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add to watchlist");
    }
  };