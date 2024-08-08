const User = require("../models/User");
const bcrypt = require("bcrypt");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const { username, usertype, email, mobile, address, authKey } = req.body;

    // Hash the authKey
    const hashedAuthKey = await bcrypt.hash(authKey, 10);

    const newUser = new User({
      username,
      usertype,
      email,
      mobile,
      address,
      authKey: hashedAuthKey, // Store hashed authKey in the database
    });

    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update an existing user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, mobile, address, authKey } = req.body;

  try {
    const updateData = { username, email, mobile, address };

    // Check if a new authKey is provided and hash it
    if (authKey) {
      const hashedAuthKey = await bcrypt.hash(authKey, 10);
      updateData.authKey = hashedAuthKey;
    }

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
