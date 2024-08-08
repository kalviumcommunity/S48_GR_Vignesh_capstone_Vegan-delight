import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>Contact</h3>
        <p>7676412864</p>
        <p>vegandelight@gmail.com</p>
      </div>
      <div className="footer-section">
        <h3>Social</h3>
        <p>Twitter</p>
        <p>Instagram</p>
      </div>
      <div className="footer-section">
        <h3>Copyright</h3>
        <p>All rights reserved&copy; 2024 Vegan Delight</p>
      </div>
    </footer>
  );
};

export default Footer;
