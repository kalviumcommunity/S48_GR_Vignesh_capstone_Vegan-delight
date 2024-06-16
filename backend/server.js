const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config();
const app = express();
app.use(express.json());
connectDB();

//ping pong route
app.get("/ping", (req, res) => {
  res.send("pong");
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
