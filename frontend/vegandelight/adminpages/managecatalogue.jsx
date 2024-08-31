import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateFoodItem from "../admincomponents/updatefooditem";
import AddFoodItem from "../admincomponents/addFooditem";
import "../styles/manageCatalogue.css";

const ManageCatalogue = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);

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

  const handleUpdateClick = (foodItem) => {
    setSelectedFoodItem(foodItem);
    setEditingItemId(foodItem._id);
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

  const filteredItems = foodItems.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === "" || item.category.toLowerCase() === filter.toLowerCase())
    );
  });

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  return (
    <div className="manage-catalogue">
      <div className="manage-catalogue-controls">
        <div className="search-filter">
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
      </div>
      <div className="manage-catalogue-items">
        {filteredItems.length > 0 ? (
          filteredItems.map((foodItem) => (
            <div key={foodItem._id} className="food-item">
              <img
                src={`http://localhost:3000/uploads/${foodItem.image}`}
                alt={foodItem.name}
                className="food-item-image"
              />
              <h2>{foodItem.name}</h2>
              <p>{foodItem.description}</p>
              <p>Calories: {foodItem.calories}</p>
              <p>Price: ₹{foodItem.price}</p>
              <p>Category: {foodItem.category}</p>
              <button onClick={() => handleUpdateClick(foodItem)}>
                Update
              </button>
              <button onClick={() => handleDeleteClick(foodItem._id)}>
                Delete
              </button>

              {editingItemId === foodItem._id && selectedFoodItem && (
                <div className="update-food-item-container">
                  <UpdateFoodItem
                    foodItem={selectedFoodItem}
                    onClose={() => setEditingItemId(null)}
                    onUpdate={handleUpdate}
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No food items available.</p>
        )}
      </div>
    </div>
  );
};

export default ManageCatalogue;
