const mongoose = require('mongoose');

const ProductCounterSchema = new mongoose.Schema({
  id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

module.exports =
  mongoose.models.ProductCounter ||
  mongoose.model("ProductCounter", ProductCounterSchema);