import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaShoppingCart, FaUser, FaFilter } from "react-icons/fa";
import "../styles/navbar.css";

const Navbar = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
    onFilter(event.target.value);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/home">
          <FaHome size={24} />
        </Link>
      </div>
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="navbar-links">
        <Link to="/cart">
          <FaShoppingCart size={24} />
        </Link>
        <div className="navbar-filter">
          <FaFilter size={24} />
          <select value={filter} onChange={handleFilter}>
            <option value="">All Categories</option>
            <option value="soups">Soups</option>
            <option value="starters">Starters</option>
            <option value="snacks">Snacks</option>
            <option value="salads">Salads</option>
          </select>
        </div>
        <Link to="/profile">
          <FaUser size={24} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
