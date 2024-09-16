//---> import mongoose
const mongoose = require("mongoose");

//---> define schema & validations
const countrySchema = new mongoose.Schema({
  countryName: String,
  capital: String,
  population: Number,
});

//---> create the collection.
const Country = mongoose.model("Country", countrySchema);

//---> export collection
module.exports = Country;
