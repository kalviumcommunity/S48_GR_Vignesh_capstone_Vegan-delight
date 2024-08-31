// src/admincomponents/Sidebar.jsx
import React from "react";

const Sidebar = ({ onSelect }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-item" onClick={() => onSelect("manageOrders")}>
        Manage Orders
      </div>
      <div className="sidebar-item" onClick={() => onSelect("manageUsers")}>
        Manage Users
      </div>
      <div className="sidebar-item" onClick={() => onSelect("manageCatalogue")}>
        Manage Catalogue
      </div>
      <div className="sidebar-item" onClick={() => onSelect("manageWallets")}>
        Manage Wallets
      </div>
      <div className="sidebar-item" onClick={() => onSelect("manageEmployees")}>
        Manage Employees
      </div>
      <div className="sidebar-item" onClick={() => onSelect("manageInventory")}>
        Manage Inventory
      </div>
    </div>
  );
};

export default Sidebar;
