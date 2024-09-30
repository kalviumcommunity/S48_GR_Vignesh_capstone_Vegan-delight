import React from "react";
import "../../styles/options.css";

const Options = () => {
  return (
    <nav className="options">
      <div className="logo">
        <img src="../assets/app-logo.png" alt="App Logo" />
      </div>
      <div className="nav-links">
        <ul>
          <li>
            <a href="https://www.veganricha.com/">Blog Articles</a>
          </li>
          <li>
            <a href="#about-us">About Us</a>
          </li>
          <li>
            <a href="#how-it-works">How it works</a>
          </li>
          <li>
            <a href="/login">Log In</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Options;
