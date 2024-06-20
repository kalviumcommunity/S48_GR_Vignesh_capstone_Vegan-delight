const Inventory = require("../models/Inventory");

// Get all inventory items
const getAllInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.status(200).json(inventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Create a new inventory item
const addToInventory = async (req, res) => {
  try {
    const { item, supplier, rate, contact, lastOrdered } = req.body;
    const newInventory = new Inventory({
      item,
      supplier,
      rate,
      contact,
      lastOrdered,
    });

    const inventory = await newInventory.save();
    res.status(201).json(inventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllInventory,
  addToInventory,
};
