const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
// some configuration
dotenv.config();
app.use(express.json());
app.use(cookieParser());
//cors configuration
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
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
const authRouter = require("./routers/authrouter");

// Use Routes
app.use("/", userRouter);
app.use("/", foodItemRouter);
app.use("/", subscriptionRouter);
app.use("/", walletRouter);
app.use("/", orderRouter);
app.use("/", employeeRouter);
app.use("/", inventoryRouter);
app.use("/", authRouter);

// Ping pong route (for testing)
app.get("/ping", (req, res) => {
  res.send("pong");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
