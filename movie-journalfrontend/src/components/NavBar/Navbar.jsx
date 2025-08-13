import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import "./Navbar.css";

const Navbar = ({ isAuth }) => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!title && !genre)
      return;

    try {
      const response = await axios.get(
        `/api/search?title=${title}&genre=${genre}`
      );
    } catch (error) {

    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Movie Journal</Link>
      </div>
      {isAuth && (
        <div className="search-box">
          <input type="text" placeholder="Search movie" />
          <FaSearch className="search-icon" />
        </div>
      )}
      <ul className="nav-links">
        {isAuth ? (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/">Home</Link></li>
            <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
