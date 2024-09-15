// ??????????????
// Schema to define our data => BIKE
const mongoose = require("mongoose");
// ------> why?

const bikeSchema = new mongoose.Schema({
  // whats a bike?
  numOfWheels: Number,
  color: String,
  pedals: Number,
});
// ---> because i need to create a Bike
// ---> ok, i created your bike... but now what???
const Bike = mongoose.model("Bike", bikeSchema);

module.exports = Bike;
