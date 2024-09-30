import React from "react";
import {
  FaBox,
  FaUsers,
  FaWallet,
  FaShoppingCart,
  FaTags,
  FaUserTie,
} from "react-icons/fa";

const Sidebar = ({ onSelect }) => {
  return (
    <div className="flex flex-col bg-green-300 h-full p-4">
      <button
        className="flex items-center p-2 text-black hover:bg-green-400 rounded transition duration-300"
        onClick={() => onSelect("manageOrders")}
      >
        <FaShoppingCart className="mr-2" /> Manage Orders
      </button>
      <button
        className="flex items-center p-2 text-black hover:bg-green-400 rounded transition duration-300 mt-2"
        onClick={() => onSelect("manageUsers")}
      >
        <FaUsers className="mr-2" /> Manage Users
      </button>
      <button
        className="flex items-center p-2 text-black hover:bg-green-400 rounded transition duration-300 mt-2"
        onClick={() => onSelect("manageCatalogue")}
      >
        <FaTags className="mr-2" /> Manage Catalogue
      </button>
      <button
        className="flex items-center p-2 text-black hover:bg-green-400 rounded transition duration-300 mt-2"
        onClick={() => onSelect("manageWallets")}
      >
        <FaWallet className="mr-2" /> Manage Wallets
      </button>
      <button
        className="flex items-center p-2 text-black hover:bg-green-400 rounded transition duration-300 mt-2"
        onClick={() => onSelect("manageInventory")}
      >
        <FaBox className="mr-2" /> Manage Inventory
      </button>
      <button
        className="flex items-center p-2 text-black hover:bg-green-400 rounded transition duration-300 mt-2"
        onClick={() => onSelect("manageEmployees")}
      >
        <FaUserTie className="mr-2" /> Manage Employees
      </button>
    </div>
  );
};

export default Sidebar;
