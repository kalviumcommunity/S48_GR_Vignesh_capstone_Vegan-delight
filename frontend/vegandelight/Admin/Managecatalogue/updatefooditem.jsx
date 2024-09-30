import React, { useState } from "react";
import "./catalogueStyles.css";
const UpdateFoodItem = ({ foodItem, onUpdate, onClose }) => {
  const [name, setName] = useState(foodItem.name || "");
  const [description, setDescription] = useState(foodItem.description || "");
  const [price, setPrice] = useState(foodItem.price || "");
  const [image, setImage] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedItem = {
      name,
      description,
      price,
      image: image ? image.name : foodItem.image, // Use the existing image if no new one is uploaded
    };

    try {
      const response = await fetch(
        `http://localhost:3000/updatefooditem/${foodItem._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedItem),
        }
      );

      if (response.ok) {
        const result = await response.json();
        onUpdate(result); // Call the parent onUpdate function
        onClose(); // Close the popup after successful update
      } else {
        console.error("Error updating food item:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating food item:", error);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="update-food-item__form">
      <h2 className="update-food-item__title">Update Food Item</h2>

      <div className="update-food-item__group">
        <label className="update-food-item__label">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="update-food-item__input"
          required
        />
      </div>

      <div className="update-food-item__group">
        <label className="update-food-item__label">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="update-food-item__textarea"
          required
        />
      </div>

      <div className="update-food-item__group">
        <label className="update-food-item__label">Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="update-food-item__input"
          required
        />
      </div>

      <div className="update-food-item__group">
        <label className="update-food-item__label">
          Upload New Image (optional):
        </label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="update-food-item__file-input"
        />
      </div>

      <button type="submit" className="update-food-item__submit-button">
        Update Item
      </button>
    </form>
  );
};

export default UpdateFoodItem;
