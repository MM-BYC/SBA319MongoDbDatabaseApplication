// Schema to define our data => country
const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  // whats a country?
  country: String,
  capital: String,
  population: mongoose.Schema.Types.BigInt,
});
// --->create a country
const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
