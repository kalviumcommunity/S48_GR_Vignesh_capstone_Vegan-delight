const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to verify token and get user info
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.userId = decoded.userId;
    req.username = decoded.username;
    req.usertype = decoded.usertype;

    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = user;
      next();
    } catch (err) {
      return res.status(500).json({ message: "Server error" });
    }
  });
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.usertype === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
};

module.exports = {
  verifyToken,
  isAdmin,
};
