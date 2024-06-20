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

module.exports = {
  getAllUsers,
  createUser,
};
