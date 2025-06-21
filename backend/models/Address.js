// const mongoose = require("mongoose");

// const addressSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   name: { type: String, required: true },
//   street: { type: String, required: true },
//   city: { type: String, required: true },
//   state: { type: String, required: true },
//   zip: { type: String, required: true },
//   phone: { type: String, required: true },
// }, { timestamps: true });

// module.exports = mongoose.model("Address", addressSchema);


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
