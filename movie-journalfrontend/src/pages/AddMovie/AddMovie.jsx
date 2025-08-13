import React, { useState } from "react";
import axios from "axios";
import "./AddMovie.css";

const AddMovie = () => {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    year: "",
    duration: "",
    status: "Plan to Watch",
    poster: "",
    synopsis: "",
    cast: "",
    rating: "",
    review: "",
    watchedOn: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      cast: formData.cast.split(",").map((c) => c.trim()),
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5000/api/movies/addmovie", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Payload to send:", payload);
      console.log("Token:", token);

      setMessage("Movie added successfully!");
      setFormData({
        title: "",
        genre: "",
        year: "",
        duration: "",
        status: "Plan to Watch",
        poster: "",
        synopsis: "",
        cast: "",
        rating: "",
        review: "",
        watchedOn: "",
      });
    } catch (error) {
      setMessage("Failed to add movie: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="add-movie-container">
      <h2>Add New Movie</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="movie-form">
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <input type="text" name="genre" placeholder="Genre" value={formData.genre} onChange={handleChange} />
        <input type="number" name="year" placeholder="Year" value={formData.year} onChange={handleChange} />
        <input type="number" name="duration" placeholder="Duration (minutes)" value={formData.duration} onChange={handleChange} />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Watching">Watching</option>
          <option value="Completed">Completed</option>
          <option value="Plan to Watch">Plan to Watch</option>
          <option value="Dropped">Dropped</option>
        </select>
        <input type="url" name="poster" placeholder="Poster URL" value={formData.poster} onChange={handleChange} />
        <textarea name="synopsis" placeholder="Synopsis" value={formData.synopsis} onChange={handleChange} />
        <input type="text" name="cast" placeholder="Cast (comma-separated)" value={formData.cast} onChange={handleChange} />
        <input type="number" name="rating" placeholder="Rating (1-10)" value={formData.rating} onChange={handleChange} step="0.1" />
        <textarea name="review" placeholder="Review" value={formData.review} onChange={handleChange} />
        <input type="date" name="watchedOn" value={formData.watchedOn} onChange={handleChange} />
        <button type="submit" className="submit-btn">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;
