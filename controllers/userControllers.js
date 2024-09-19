const User = require("../models/user");

// place all CRUD functions as key:value pairs in an object
// to userControllers. Accessible via chaining methods
// .e.g. userControllers.getAllUsers

const userControllers = {
  getAllUsers: async (req, res) => {
    // get all users from DB
    const users = await User.find();
    console.log(`currently fetching all users`);
    res.json({ users: users });
  },
  getUserById: async (req, res) => {
    // 1. get id of the url
    const userId = req.params.id;
    // 2. FindThatUserByID
    const thisSpecificUser = await User.findById(userId);
    res.json({ user: thisSpecificUser });
  },
  createUser: async (req, res) => {
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
  },

  updateUserById: async (req, res) => {
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
  },

  deleteUserById: async (req, res) => {
    // get id from url
    const userId = req.params.id;
    // delete the user
    await User.deleteOne({
      _id: userId,
    });

    res.json({ user: "Its Deleted" });
  },
};

module.exports = { userControllers };
