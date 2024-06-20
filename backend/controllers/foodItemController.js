const FoodItem = require("../models/FoodItem");

// Get all food items
const getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.status(200).json(foodItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Create a new food item
const createFoodItem = async (req, res) => {
  try {
    const { name, calories, description, price, category } = req.body;
    const newFoodItem = new FoodItem({
      name,
      calories,
      description,
      price,
      category,
    });

    const foodItem = await newFoodItem.save();
    res.status(201).json(foodItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllFoodItems,
  createFoodItem,
};
