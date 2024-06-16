const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true, enum: ["weekly", "monthly", "yearly"] },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  products: [
    { type: mongoose.Schema.Types.ObjectId, ref: "FoodItem", required: true },
  ],
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;
