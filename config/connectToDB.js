require("dotenv").config();
const mongoose = require("mongoose");

//MONGO_URI from .env
const connectToDB = async () => {
  // Attempting to connect to db
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`Connected to DB`);
};

module.exports = connectToDB;
