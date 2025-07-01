const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: String,
  street: String,
  city: String,
  state: String,
  zip: String,
  phone: String,
}, { timestamps: true });

module.exports = mongoose.model("Address", addressSchema);
