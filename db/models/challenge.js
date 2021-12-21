const mongoose = require("mongoose");

const challenge = new mongoose.Schema({
  disc: { type: String, required: true },
  title: { type: String, required: true },
  point: { type: Number, required: true },
  level: { type: Number, required: true },
  input: { type: Array, required: true },
  output: { type: Array, required: true },
  active: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Challenge", challenge);
