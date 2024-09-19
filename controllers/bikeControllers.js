const Bike = require("../models/bike");

// place all CRUD functions as key:value pairs in an object
// to bikeControllers. Accessible via chaining methods
// .e.g. bikeControllers.getAllBikes

const bikeControllers = {
  getAllBikes: async (req, res) => {
    try {
      //   Get all bikes from DB
      const bikes = await Bike.find();
      console.log(`Currently Fetching ALL Bikes`);
      res.json({ bikes: bikes });
    } catch (err) {
      console.log("Error: ", err);
      res.status(500).json({ error: err.message });
    }
  },

  getBikeById: async (req, res) => {
    // 1.Get id of the url
    const bikeId = req.params.id;
    // 2.FindThatBikeByID
    const thisSpecificBike = await Bike.findById(bikeId);
    res.json({ bike: thisSpecificBike });
  },

  createBike: async (req, res) => {
    const { numOfWheels, color, pedals } = req.body;
    const bike = await Bike.create({
      numOfWheels: numOfWheels,
      color: color,
      pedals: pedals,
    });
    console.log("SuccessfullyMadePOST");
    res.json({ bike: bike });
  },

  updateBike: async (req, res) => {
    const bikeId = req.params.id;
    const { numOfWheels, color, pedals } = req.body;
    const bike = await Bike.findByIdAndUpdate(bikeId, {
      numOfWheels: numOfWheels,
      color: color,
      pedals: pedals,
    });
    //   part2
    //---> find the updated bikeId. Send back as json object
    const updatedBike = await Bike.findById(bikeId);
    res.json({ bike: updatedBike });
  },

  deleteBike: async (req, res) => {
    // id: is a param in the url.
    const bikeId = req.params.id;
    await Bike.deleteOne({
      _id: bikeId,
      // MongoDB implements _id instead of id
    });
    res.json({ success: "Its Deleted" });
  },
};

module.exports = { bikeControllers };
