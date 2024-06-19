const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config();

const app = express();
app.use(express.json());

// Connect to Database
connectDB();

// Importing route files
const userRouter = require("./routers/userRouter");
const foodItemRouter = require("./routers/foodItemRouter");
const subscriptionRouter = require("./routers/subscriptionRouter");
const walletRouter = require("./routers/walletRouter");
const orderRouter = require("./routers/orderRouter");
const employeeRouter = require("./routers/employeeRouter");
const inventoryRouter = require("./routers/inventoryRouter");

// Use Routes with Base API URL
app.use("/users", userRouter);
app.use("/fooditems", foodItemRouter);
app.use("/subscriptions", subscriptionRouter);
app.use("/wallets", walletRouter);
app.use("/orders", orderRouter);
app.use("/employees", employeeRouter);
app.use("/inventory", inventoryRouter);

// Ping pong route (for testing)
app.get("/ping", (req, res) => {
  res.send("pong");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
