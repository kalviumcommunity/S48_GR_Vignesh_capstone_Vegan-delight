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
// Update an existing inventory item
const updateInventory = async (req, res) => {
  const { id } = req.params;
  const { item, supplier, rate, contact, lastOrdered } = req.body;

  try {
    const inventory = await Inventory.findByIdAndUpdate(
      id,
      { item, supplier, rate, contact, lastOrdered },
      { new: true, runValidators: true }
    );

    if (!inventory) {
      return res.status(404).json({ msg: "Inventory item not found" });
    }

    res.status(200).json(inventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete an inventory item
const deleteInventory = async (req, res) => {
  const { id } = req.params;

  try {
    const inventory = await Inventory.findByIdAndDelete(id);

    if (!inventory) {
      return res.status(404).json({ msg: "Inventory item not found" });
    }

    res.status(200).json({ msg: "Inventory item deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllInventory,
  addToInventory,
  updateInventory,
  deleteInventory,
};
