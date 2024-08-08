import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import "../styles/menu.css";

const Menu = ({ searchTerm, filter }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/fooditems");
        setFoodItems(response.data);
      } catch (error) {
        setError("Failed to load food items. Please try again.");
        console.error("Error fetching food items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, []);

  const addToCart = (foodItem) => {
    const currentCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const updatedCart = [...currentCart, foodItem];
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const filteredItems = foodItems.filter((item) => {
    if (searchTerm) {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    if (filter) {
      return item.category.toLowerCase() === filter.toLowerCase();
    }
    return true;
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="menu-container">
      <ul className="menu-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((foodItem) => (
            <li key={foodItem._id} className="menu-item">
              <img
                src={`http://localhost:3000/uploads/${foodItem.image}`}
                alt={foodItem.name}
                className="menu-image"
              />
              <h2>{foodItem.name}</h2>
              <p>{foodItem.description}</p>
              <p>Calories: {foodItem.calories}</p>
              <p>Price: ₹{foodItem.price}</p>
              <p>Category: {foodItem.category}</p>
              <button onClick={() => addToCart(foodItem)}>
                <FaPlus />
              </button>
            </li>
          ))
        ) : (
          <p>No food items available.</p>
        )}
      </ul>
    </div>
  );
};

export default Menu;
