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
// Update an existing food item
const updateFoodItem = async (req, res) => {
  const { id } = req.params;
  const { name, calories, description, price, category } = req.body;

  try {
    const foodItem = await FoodItem.findByIdAndUpdate(
      id,
      { name, calories, description, price, category },
      { new: true, runValidators: true }
    );

    if (!foodItem) {
      return res.status(404).json({ msg: "Food item not found" });
    }

    res.status(200).json(foodItem);
  } catch (err) {
    console.error(err.message);
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
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
module.exports = {
  getAllFoodItems,
  createFoodItem,
  updateFoodItem,
  deleteFoodItem,
};
