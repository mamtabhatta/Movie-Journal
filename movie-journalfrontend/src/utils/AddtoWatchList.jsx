import axios from "axios";

const token = localStorage.getItem("token");
const addToWatchlist = async (movieId) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/watchlist/add",
      { movieId, status: "Plan to Watch" },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(res.data.message);
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert(err.response?.data?.message || "Failed to add movie");
  }
};


export default addToWatchlist;