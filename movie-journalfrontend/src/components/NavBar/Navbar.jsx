import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./Navbar.css";

const Navbar = ({ isAuth }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
  };

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
        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by title or genre"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">
            <FaSearch className="search-icon" />
          </button>
        </form>
      )}

      <ul className="nav-links">
        {isAuth ? (
          <>
            <li><Link to="/addMovie">Add Movie</Link></li>
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
