// Schema to define our data => country
const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  // whats a country?
  countryName: String,
  capital: String,
  population: Number,
});
// --->create a country
const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
