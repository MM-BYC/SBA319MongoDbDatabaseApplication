const express = require("express");
const router = express.Router();

// import the data model
const User = require("../models/user");

// define all the CRUD routes
router.get("/", async (req, res) => {
  // get all users from DB
  const users = await User.find();
  console.log(`currently fetching all users`);
  res.json({ users: users });
});
// -> READ all users

router.get("/:id", async (req, res) => {
  // 1. get id of the url
  const userId = req.params.id;
  // 2. FindThatUserByID
  const thisSpecificUser = await User.findById(userId);
  res.json({ user: thisSpecificUser });
});
// -> READ individual user

router.post("/", async (req, res) => {
  try {
    // get all the arguments to create a new user
    const { userName, userPassword, userEmail } = req.body;
    // create the new user in the DB
    const user = await User.create({
      userName: userName,
      userPassword: userPassword,
      userEmail: userEmail,
    });
    console.log("SuccesfullyMadePOST");
    // response json to the client side
    res.json({ user: user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});
// -> CREATE new user

router.put("/:id", async (req, res) => {
  // get id from url
  const userId = req.params.id;
  // destructure the fields value to update the DB with.
  const { userName, userPassword, userEmail } = req.body;
  // update the DB
  // Model.findOneAndUpdate(filter, update, options, callback)
  const user = await User.findByIdAndUpdate(userId, {
    userName: userName,
    userPassword: userPassword,
    userEmail: userEmail,
  });
  // part 2 confirm that update was made!
  const updateUser = await User.findById(userId);
  res.json({ user: updateUser });
});
// -> UPDATE individual user

router.delete("/:id", async (req, res) => {
  // get id from url
  const userId = req.params.id;
  // delete the user
  await User.deleteOne({
    _id: userId,
  });

  res.json({ user: "Its Deleted" });
});
// -> DELETE individual user

module.exports = router;
