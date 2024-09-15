const mongoose = require("mongoose");

// create the schema and field validations
const userSchema = new mongoose.Schema({
  userName: String,
  userPassword: String,
  userEmail: String,
});

// create the collection. supplied 3rd argument otherwise defaults to "users"
const User = mongoose.model("Country", userSchema, "usersCollection");

module.exports = User;
