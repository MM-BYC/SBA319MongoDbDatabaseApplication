const express = require("express");
const router = express.Router();

// import the data model
const User = require("../models/user");
//import the controllers or functions
const { userControllers } = require("../controllers/userControllers");

// define all the CRUD routes
router.get("/", userControllers.getAllUsers);
// -> READ all users

router.get("/:id", userControllers.getUserById);
// -> READ individual user

router.post("/", userControllers.createUser);
// -> CREATE new user

router.put("/:id", userControllers.updateUserById);
// -> UPDATE individual user

router.delete("/:id", userControllers.deleteUserById);
// -> DELETE individual user

module.exports = router;
