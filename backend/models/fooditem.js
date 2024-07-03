const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    calories: { type: Number, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
  },
{ collection: "fooditems" }
);

const FoodItem = mongoose.model("FoodItems", foodItemSchema);

module.exports = FoodItem;
