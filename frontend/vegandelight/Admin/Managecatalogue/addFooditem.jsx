import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./catalogueStyles.css";
const AddFoodItem = () => {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("calories", calories);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    if (image) formData.append("file", image);

    try {
      const response = await axios.post(
        "http://localhost:3000/createfooditem",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Food item created:", response.data);
      navigate("/adminhome");
    } catch (error) {
      console.error("Error creating food item:", error);
      alert("Failed to create food item. Please try again.");
    }
  };

  return (
    <div className="add-food-item">
      <h1 className="add-food-item__title">Add Food Item</h1>
      <form onSubmit={handleSubmit} className="add-food-item__form">
        <div className="add-food-item__group">
          <label className="add-food-item__label">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="add-food-item__input"
          />
        </div>
        <div className="add-food-item__group">
          <label className="add-food-item__label">Calories:</label>
          <input
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            required
            className="add-food-item__input"
          />
        </div>
        <div className="add-food-item__group">
          <label className="add-food-item__label">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="add-food-item__textarea"
          ></textarea>
        </div>
        <div className="add-food-item__group">
          <label className="add-food-item__label">Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="add-food-item__input"
          />
        </div>
        <div className="add-food-item__group">
          <label className="add-food-item__label">Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="add-food-item__input"
          />
        </div>
        <div className="add-food-item__group">
          <label className="add-food-item__label">Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="add-food-item__file-input"
          />
        </div>
        <button type="submit" className="add-food-item__submit-button">
          Add Food Item
        </button>
      </form>
    </div>
  );
};

export default AddFoodItem;
