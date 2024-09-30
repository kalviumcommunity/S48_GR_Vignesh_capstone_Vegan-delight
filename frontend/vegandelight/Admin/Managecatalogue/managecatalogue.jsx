import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateFoodItem from "./updatefooditem";
import AddFoodItem from "./addFooditem";
// import "./adminpagesstyles.css";

const ManageCatalogue = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);
  const [showAddFoodPopup, setShowAddFoodPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/fooditems");
        setFoodItems(response.data);
      } catch (error) {
        setError("Failed to load food items. Please try again later.");
        console.error("Error fetching food items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleUpdateClick = (foodItem, e) => {
    setSelectedFoodItem(foodItem);
    setEditingItemId(foodItem._id);
    // Position the popup next to the item clicked
    const { clientX, clientY } = e;
    setPopupPosition({ top: clientY, left: clientX });
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/deletefooditem/${id}`);
      setFoodItems(foodItems.filter((item) => item._id !== id));
    } catch (error) {
      setError("Failed to delete food item. Please try again.");
      console.error("Error deleting food item:", error);
    }
  };

  const handleUpdate = (updatedItem) => {
    setFoodItems(
      foodItems.map((item) =>
        item._id === updatedItem._id ? updatedItem : item
      )
    );
    setEditingItemId(null);
    setSelectedFoodItem(null);
  };

  const handleAddFoodClick = (e) => {
    // Position the popup next to the add button
    const { clientX, clientY } = e;
    setPopupPosition({ top: clientY, left: clientX });
    setShowAddFoodPopup(true);
  };

  const filteredItems = foodItems.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === "" || item.category.toLowerCase() === filter.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-text">{error}</p>
      </div>
    );
  }

  return (
    <div className="manage-catalogue-container">
      <h1 className="catalogue-title">Manage Catalogue</h1>
      <div className="search-filter-container">
        <div className="search-filter-inputs">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <select
            value={filter}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Categories</option>
            <option value="soups">Soups</option>
            <option value="starters">Starters</option>
            <option value="snacks">Snacks</option>
            <option value="salads">Salads</option>
          </select>
        </div>
        <button onClick={handleAddFoodClick} className="add-food-button">
          Add Food Item
        </button>
      </div>
      {showAddFoodPopup && (
        <div
          className="popup-container"
          style={{ top: popupPosition.top, left: popupPosition.left }}
        >
          <div className="popup-content">
            <button
              onClick={() => setShowAddFoodPopup(false)}
              className="cancel-button"
            >
              Cancel
            </button>
            <AddFoodItem />
          </div>
        </div>
      )}
      <div className="catalogue-list">
        {filteredItems.length > 0 ? (
          <ul className="catalogue-grid">
            {filteredItems.map((foodItem) => (
              <li key={foodItem._id} className="catalogue-item">
                <div className="item-image-container">
                  <img
                    src={`http://localhost:3000/uploads/${foodItem.image}`}
                    alt={foodItem.name}
                    className="item-image"
                  />
                </div>
                <div className="item-details">
                  <h2 className="item-title">{foodItem.name}</h2>
                  <p className="item-description">{foodItem.description}</p>
                  <p className="item-calories">Calories: {foodItem.calories}</p>
                  <p className="item-price">Price: ₹{foodItem.price}</p>
                  <p className="item-category">Category: {foodItem.category}</p>
                  <div className="item-actions">
                    <button
                      onClick={(e) => handleUpdateClick(foodItem, e)}
                      className="update-button"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteClick(foodItem._id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {editingItemId === foodItem._id && selectedFoodItem && (
                  <div
                    className="popup-container"
                    style={{ top: popupPosition.top, left: popupPosition.left }}
                  >
                    <div className="popup-content">
                      <button
                        onClick={() => setEditingItemId(null)}
                        className="cancel-button"
                      >
                        Cancel
                      </button>
                      <UpdateFoodItem
                        foodItem={selectedFoodItem}
                        onClose={() => setEditingItemId(null)}
                        onUpdate={handleUpdate}
                      />
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-items-message">No food items available.</div>
        )}
      </div>
    </div>
  );
};

export default ManageCatalogue;
