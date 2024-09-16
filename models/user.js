//---> import mongoose
const mongoose = require("mongoose");

//---> define schema & validations
const userSchema = new mongoose.Schema({
  userName: String,
  userPassword: String,
  userEmail: {
    type: String,
    required: true,
    unique: true,
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

//--> indexed by userEmail, unique: true will ensure that email is unique
userSchema.index({ userEmail: 1 }, { unique: true });

//---> create the collection (Supply 3rd argument otherwise defaults to plural "users")
const User = mongoose.model("User", userSchema, "usersCollection");

//---> export collection
module.exports = User;
