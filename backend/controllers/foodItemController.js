const FoodItem = require("../models/fooditem");

// Get all food items
const getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.status(200).json(foodItems);
  } catch (err) {
    console.error("Error fetching food items:", err.message);
    res.status(500).send("Server Error");
  }
};

// Create a new food item
const createFoodItem = async (req, res) => {
  const { name, calories, description, price, category } = req.body;
  const image = req.file ? req.file.filename : "";

  try {
    const newFoodItem = new FoodItem({
      image,
      name,
      calories,
      description,
      price,
      category,
    });
    const savedFoodItem = await newFoodItem.save();
    res.status(201).json(savedFoodItem);
  } catch (err) {
    console.error("Error creating food item:", err.message);
    res.status(500).send("Server Error");
  }
};

// Update an existing food item
const updateFoodItem = async (req, res) => {
  const { id } = req.params;
  const { name, calories, description, price, category } = req.body;
  const image = req.file ? req.file.filename : "";

  try {
    const foodItem = await FoodItem.findByIdAndUpdate(
      id,
      { image, name, calories, description, price, category },
      { new: true, runValidators: true }
    );

    if (!foodItem) {
      return res.status(404).json({ msg: "Food item not found" });
    }

    res.status(200).json(foodItem);
  } catch (err) {
    console.error("Error updating food item:", err.message);
    res.status(500).send("Server Error");
  }
};

// Delete a food item
const deleteFoodItem = async (req, res) => {
  const { id } = req.params;

  try {
    const foodItem = await FoodItem.findByIdAndDelete(id);

    if (!foodItem) {
      return res.status(404).json({ msg: "Food item not found" });
    }

    res.status(200).json({ msg: "Food item deleted" });
  } catch (err) {
    console.error("Error deleting food item:", err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllFoodItems,
  createFoodItem,
  updateFoodItem,
  deleteFoodItem,
};
