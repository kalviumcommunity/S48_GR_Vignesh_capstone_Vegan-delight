const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login a user
const loginUser = async (req, res) => {
  const { username, authKey } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isAuthKeyValid = await bcrypt.compare(authKey, user.authKey);
    if (!isAuthKeyValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, usertype: user.usertype },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set the token in an HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "Login successful",
      userId: user._id,
      usertype: user.usertype,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Logout a user
const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};

module.exports = {
  loginUser,
  logoutUser,
};
