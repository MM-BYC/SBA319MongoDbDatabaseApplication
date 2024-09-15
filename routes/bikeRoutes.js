const express = require("express");
const router = express.Router();
const Bike = require("../models/bike");

//---> CRUD routes for bikes

router.get("/", async (req, res) => {
  try {
    //   Get all bikes from DB
    const bikes = await Bike.find();
    console.log(`Currently Fetching ALL Bikes`);
    res.json({ bikes: bikes });
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ error: err.message });
  }
});
// ----------------> [READ - all instances of Bike in DB]
router.get("/:id", async (req, res) => {
  // 1.Get id of the url
  const bikeId = req.params.id;
  // 2.FindThatBikeByID
  const thisSpecificBike = await Bike.findById(bikeId);
  res.json({ bike: thisSpecificBike });
});
// -------------{Read - individual instance of Bike in DB [req.params.id]}
// ----------------------{GET}

router.post("/", async (req, res) => {
  const { numOfWheels, color, pedals } = req.body;
  const bike = await Bike.create({
    numOfWheels: numOfWheels,
    color: color,
    pedals: pedals,
  });
  console.log("SuccessfullyMadePOST");
  res.json({ bike: bike });
});
// --------[POST]

router.put("/:id", async (req, res) => {
  const bikeId = req.params.id;
  const { numOfWheels, color, pedals } = req.body;
  const bike = await Bike.findByIdAndUpdate(bikeId, {
    numOfWheels: numOfWheels,
    color: color,
    pedals: pedals,
  });
  //   part2
  //---> find the updated bikeId. Send it to the client side as an object
  const updatedBike = await Bike.findById(bikeId);
  res.json({ bike: updatedBike });
});
// --------[Update]

router.delete("/:id", async (req, res) => {
  // id: is a param in the url.
  const bikeId = req.params.id;
  await Bike.deleteOne({
    _id: bikeId,
    // MongoDB implements _id instead of id
  });
  res.json({ success: "Its Deleted" });
});
// --------[Delete]

module.exports = router;
