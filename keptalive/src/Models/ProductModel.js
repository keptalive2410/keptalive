const mongoose = require('mongoose');
const ProductCounter = require('./ProductCounter');

const ProductSchema = new mongoose.Schema({
    productID: {
        type: Number,
        unique: true,
        index: true
    },
    productName: {
      type: String,
      required: true,
    },

    productSellingPrice: {
      type: Number,
      required: true,
    },
   
    productOriginalPrice: {
      type: Number,
    },

    productCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    productSize: {
      type: [String],
      required: true,
    },

    productColour: {
      type: [String],
      default: [],
    },

    productDescription: {           // To be changed
      type: String,
    },

    productImages: [
      {
        url: {
          type: String,
          required: true
        },
        public_id: {
          type: String,
          required: true
        }
      }
    ],

    productStock: {
      type: Map,
      of: {
        type: Map,
        of: Number,
      },
      required: true,
    },

    displayAt: {
      type: String,
      enum: ["none", "home", "trending", "new-arrivals", "sale"],
      default: "none",
    },

    exchangePolicy: {
      type: Boolean,
      default: false,
    },
});

ProductSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await ProductCounter.findOneAndUpdate(
      { id: "productID" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.productID = counter.seq;
  }
  next();
});

module.exports =
  mongoose.models.Products ||
  mongoose.model("Products", ProductSchema);