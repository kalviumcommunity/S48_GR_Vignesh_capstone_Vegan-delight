const Subscription = require("../models/Subscription");

// Get all subscriptions
const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json(subscriptions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Create a new subscription
const createSubscription = async (req, res) => {
  try {
    const { userId, type, startDate, endDate, products } = req.body;
    const newSubscription = new Subscription({
      userId,
      type,
      startDate,
      endDate,
      products,
    });

    const subscription = await newSubscription.save();
    res.status(201).json(subscription);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllSubscriptions,
  createSubscription,
};
