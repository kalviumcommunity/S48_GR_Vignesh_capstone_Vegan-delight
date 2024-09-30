import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./admincomponentstyles.css";

const UpdateFoodItem = ({ foodItemId, onUpdateSuccess }) => {
  const [foodItem, setFoodItem] = useState({
    name: "",
    calories: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  const [message, setMessage] = useState("");

  // Fetch the existing food item details to pre-fill the form
  useEffect(() => {
    const fetchFoodItem = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/fooditems/${foodItemId}`
        );
        setFoodItem(response.data);
      } catch (error) {
        console.error("Error fetching food item:", error.message);
      }
    };

    fetchFoodItem();
  }, [foodItemId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodItem((prevFoodItem) => ({
      ...prevFoodItem,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFoodItem((prevFoodItem) => ({
      ...prevFoodItem,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (foodItem.name) formData.append("name", foodItem.name);
    if (foodItem.calories) formData.append("calories", foodItem.calories);
    if (foodItem.description)
      formData.append("description", foodItem.description);
    if (foodItem.price) formData.append("price", foodItem.price);
    if (foodItem.category) formData.append("category", foodItem.category);
    if (foodItem.image) formData.append("file", foodItem.image);

    try {
      const response = await axios.put(
        `http://localhost:3000/updatefooditem/${foodItemId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Food item updated successfully!");
      if (onUpdateSuccess) {
        onUpdateSuccess(response.data);
      }
    } catch (error) {
      console.error("Error updating food item:", error.message);
      setMessage("Failed to update food item.");
    }
  };

  return (
    <div className="adminforms">
      <h2>Update Food Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={foodItem.name}
            onChange={handleChange}
            placeholder="Enter new name"
          />
        </div>
        <div>
          <label>Calories:</label>
          <input
            type="number"
            name="calories"
            value={foodItem.calories}
            onChange={handleChange}
            placeholder="Enter new calories"
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={foodItem.description}
            onChange={handleChange}
            placeholder="Enter new description"
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={foodItem.price}
            onChange={handleChange}
            placeholder="Enter new price"
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={foodItem.category}
            onChange={handleChange}
            placeholder="Enter new category"
          />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" name="file" onChange={handleFileChange} />
        </div>
        <button type="submit">Update Food Item</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateFoodItem;
