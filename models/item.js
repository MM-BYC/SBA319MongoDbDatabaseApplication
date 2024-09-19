//---> import mongoose
const mongoose = require("mongoose");
//---> import currency plugin
// const currency = require("mongoose-currency");

//---> define schema & validations
const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    unique: true,
    required: true,
  },
  //--->  2 decimal places
  itemPrice: {
    type: Number,
    default: 0.0,
    required: true,
    validate: {
      validator: function (v) {
        return /^(\d{1,9}(\.\d{1,2})?)$/.test(v.toString());
      },
      message: "Please enter a valid price with up to 2 decimal places",
    },
  },
  currency: {
    type: String,
    required: true,
    default: "USD",
  },
  //---> itemQuantity must be whole numbers
  itemQuantity: {
    type: Number,
    default: 0,
    validate: {
      validator: function (v) {
        return v % 1 === 0; // checks if the value is an integer
      },
      message: "Quantity must be a whole number",
    },
  },
  photo: {
    type: String, // url path
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

itemSchema.index({ category: 1 });
itemSchema.index({ itemName: 1 });
itemSchema.index({ itemName: 1 });
itemSchema.index({ category: 1, itemPrice: -1 }); // -1 means descending

//---> create the collection
const Item = mongoose.model("Item", itemSchema, "itemsCollection");
//---> export collection

module.exports = Item;
