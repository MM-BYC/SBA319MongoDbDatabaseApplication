//---> import mongoose
const mongoose = require("mongoose");

//---> define schema & validations
const userSchema = new mongoose.Schema({
  userName: String,
  userPassword: String,
  userEmail: String,
});
//---> create the collection (Supply 3rd argument otherwise defaults to plural "users")
const User = mongoose.model("User", userSchema, "usersCollection");

//---> export collection
module.exports = User;
