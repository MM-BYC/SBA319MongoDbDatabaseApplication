// ??????????????
// Schema to define our data => country
const mongoose = require("mongoose");
// ------> why?

const countrySchema = new mongoose.Schema({
  // whats a country?
  country: String,
  capital: String,
  population: Number,
});
// ---> because i need to create a country
// ---> ok, i created your country... but now what???
const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
