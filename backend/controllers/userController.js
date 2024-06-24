const User = require("../models/User");

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

// Create a new user
const createUser = async (req, res) => {
  try {
    const { username, usertype, email, mobile, address, authKey } = req.body;
    const newUser = new User({
      username,
      usertype,
      email,
      mobile,
      address,
      authKey,
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
  const { username, usertype, email, mobile, address, authKey } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { username, usertype, email, mobile, address, authKey },
      { new: true, runValidators: true }
    );

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
  createUser,
  updateUser,
  deleteUser,
};
