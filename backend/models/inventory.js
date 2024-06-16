const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  item: { type: String, required: true },
  supplier: { type: String, required: true },
  rate: { type: Number, required: true },
  contact: { type: String, required: true },
  lastOrdered: { type: Date, required: true },
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
