import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateFoodItem from "./updatefooditem";
import AddFoodItem from "./addFooditem";
import "./catalogueStyles.css";
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
    <div className="manage-catalogue">
      <h1 className="manage-catalogue__title">Manage Catalogue</h1>
      <div className="manage-catalogue__controls">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="manage-catalogue__search-input"
        />
        <select
          value={filter}
          onChange={handleFilterChange}
          className="manage-catalogue__filter-select"
        >
          <option value="">All Categories</option>
          <option value="soups">Soups</option>
          <option value="starters">Starters</option>
          <option value="snacks">Snacks</option>
          <option value="salads">Salads</option>
        </select>
        <button
          onClick={handleAddFoodClick}
          className="manage-catalogue__add-button"
        >
          Add Food Item
        </button>
      </div>
      {showAddFoodPopup && (
        <div className="popup-container">
          <div className="popup-content">
            <button
              onClick={() => setShowAddFoodPopup(false)}
              className="popup-content__cancel-button"
            >
              Cancel
            </button>
            <AddFoodItem />
          </div>
        </div>
      )}
      <div className="manage-catalogue__list">
        {filteredItems.length > 0 ? (
          <ul className="manage-catalogue__grid">
            {filteredItems.map((foodItem) => (
              <li key={foodItem._id} className="manage-catalogue__item">
                <div className="manage-catalogue__item-image">
                  <img
                    src={`http://localhost:3000/uploads/${foodItem.image}`}
                    alt={foodItem.name}
                    className="manage-catalogue__image"
                  />
                </div>
                <h2 className="manage-catalogue__item-name">{foodItem.name}</h2>
                <p className="manage-catalogue__item-description">
                  {foodItem.description}
                </p>
                <div className="manage-catalogue__item-price">
                  ₹{foodItem.price}
                </div>
                <button
                  onClick={(e) => handleUpdateClick(foodItem, e)}
                  className="manage-catalogue__update-button"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteClick(foodItem._id)}
                  className="manage-catalogue__delete-button"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="manage-catalogue__no-items">No food items found.</p>
        )}
      </div>
      {editingItemId && selectedFoodItem && (
        <div
          className="popup-container"
          style={{ top: popupPosition.top, left: popupPosition.left }}
        >
          <div className="popup-content">
            <button
              onClick={() => setEditingItemId(null)}
              className="popup-content__cancel-button"
            >
              Cancel
            </button>
            <UpdateFoodItem
              foodItem={selectedFoodItem}
              onUpdate={handleUpdate}
              onClose={() => setEditingItemId(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCatalogue;
