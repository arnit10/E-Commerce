const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cartItems: [
    {
      title: String,
      price: Number,
      quantity: Number,
      image: String,
      brand: String,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    name: String,
    street: String,
    city: String,
    state: String,
    zip: String,
    phone: String,
  },
  orderedAt: {
    type: Date,
    default: Date.now,
  },
  fulfilled: {
    type: Boolean,
    default: false,
  },
  fulfilledAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Order", orderSchema);
