import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateInventory = ({ itemId, onClose, onUpdate }) => {
  const [itemDetails, setItemDetails] = useState({
    item: "",
    supplier: "",
    rate: "",
    contact: "",
    lastordered: "",
  });

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/inventory/${itemId}`
        );
        setItemDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch item details:", error);
      }
    };

    fetchItemDetails();
  }, [itemId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/updateinventory/${itemId}`,
        itemDetails
      );
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Failed to update inventory item:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/deleteinventory/${itemId}`);
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Failed to delete inventory item:", error);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        position: "absolute",
        backgroundColor: "white",
        zIndex: 1000,
      }}
    >
      <h3>Update Inventory Item</h3>
      <form onSubmit={handleFormSubmit} className="adminforms">
        <div>
          <label>Item:</label>
          <input
            type="text"
            name="item"
            value={itemDetails.item}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Supplier:</label>
          <input
            type="text"
            name="supplier"
            value={itemDetails.supplier}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Rate:</label>
          <input
            type="number"
            name="rate"
            value={itemDetails.rate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Contact:</label>
          <input
            type="text"
            name="contact"
            value={itemDetails.contact}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Last Ordered:</label>
          <input
            type="date"
            name="lastordered"
            value={itemDetails.lastordered.slice(0, 10)}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update</button>
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateInventory;
