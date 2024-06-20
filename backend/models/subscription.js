const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["weekly", "monthly", "yearly"],
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    products: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  { collection: "subscriptions" }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;
