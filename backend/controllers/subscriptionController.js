const Subscription = require("../models/subscription");

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
// Update an existing subscription
const updateSubscription = async (req, res) => {
  const { id } = req.params;
  const { userId, type, startDate, endDate, products } = req.body;

  try {
    const subscription = await Subscription.findByIdAndUpdate(
      id,
      { userId, type, startDate, endDate, products },
      { new: true, runValidators: true }
    );

    if (!subscription) {
      return res.status(404).json({ msg: "Subscription not found" });
    }

    res.status(200).json(subscription);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete a subscription
const deleteSubscription = async (req, res) => {
  const { id } = req.params;

  try {
    const subscription = await Subscription.findByIdAndDelete(id);

    if (!subscription) {
      return res.status(404).json({ msg: "Subscription not found" });
    }

    res.status(200).json({ msg: "Subscription deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
module.exports = {
  getAllSubscriptions,
  createSubscription,
  updateSubscription,
  deleteSubscription,
};
