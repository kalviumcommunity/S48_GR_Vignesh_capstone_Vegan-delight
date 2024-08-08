const express = require("express");
const path = require("path"); // Ensure path is imported
const foodItemRouter = express.Router();
const foodItemController = require("../controllers/foodItemController");
const upload = require("../controllers/filecontroller");

// Define route to upload a file
foodItemRouter.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file selected");
  }
  res.json({ path: req.file.path });
});

// Define routes for CRUD operations
foodItemRouter.get("/fooditems", foodItemController.getAllFoodItems);
foodItemRouter.post(
  "/createfooditem",
  upload.single("file"),
  foodItemController.createFoodItem
);
foodItemRouter.put(
  "/updatefooditem/:id",
  upload.single("file"),
  foodItemController.updateFoodItem
);
foodItemRouter.delete("/deletefooditem/:id", foodItemController.deleteFoodItem);

// Serve uploaded images
const uploadsPath = path.join(__dirname, "../uploads");
console.log(`Serving static files from: ${uploadsPath}`);
foodItemRouter.use("/uploads", express.static(uploadsPath));

module.exports = foodItemRouter;
