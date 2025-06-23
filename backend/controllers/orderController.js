const Order = require("../models/Order");

const createOrder = async (req, res) => {
  const { userId, cartItems, totalAmount, shippingAddress } = req.body;

  if (!userId || !cartItems || !totalAmount || !shippingAddress) {
    return res.status(400).json({ message: "Missing order data" });
  }

  try {
    const newOrder = new Order({ userId, cartItems, totalAmount, shippingAddress });
    await newOrder.save();
    res.status(201).json({ message: "Order placed", order: newOrder });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "name username email")
    .sort({ orderedAt: -1 })
    res.status(200).json(orders);
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const fulfillOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.fulfilled = true;
    order.fulfilledAt = new Date();
    await order.save();

    res.status(200).json({ message: "Order marked as fulfilled", order });
  } catch (error) {
    console.error("Fulfill order error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId }).sort({ orderedAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("User orders error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  fulfillOrder,
  getUserOrders,
};
