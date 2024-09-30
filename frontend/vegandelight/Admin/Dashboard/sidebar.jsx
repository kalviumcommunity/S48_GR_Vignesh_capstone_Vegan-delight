import React from "react";
import {
  FaBox,
  FaUsers,
  FaWallet,
  FaShoppingCart,
  FaTags,
  FaUserTie,
} from "react-icons/fa";
import "./dashBoardStyles.css";
const Sidebar = ({ onSelect }) => {
  return (
    <div className="sidebar">
      <button className="sidebar-btn" onClick={() => onSelect("manageOrders")}>
        <FaShoppingCart className="icon" /> Manage Orders
      </button>
      <button className="sidebar-btn" onClick={() => onSelect("manageUsers")}>
        <FaUsers className="icon" /> Manage Users
      </button>
      <button
        className="sidebar-btn"
        onClick={() => onSelect("manageCatalogue")}
      >
        <FaTags className="icon" /> Manage Catalogue
      </button>
      <button className="sidebar-btn" onClick={() => onSelect("manageWallets")}>
        <FaWallet className="icon" /> Manage Wallets
      </button>
      <button
        className="sidebar-btn"
        onClick={() => onSelect("manageInventory")}
      >
        <FaBox className="icon" /> Manage Inventory
      </button>
      <button
        className="sidebar-btn"
        onClick={() => onSelect("manageEmployees")}
      >
        <FaUserTie className="icon" /> Manage Employees
      </button>
    </div>
  );
};

export default Sidebar;
