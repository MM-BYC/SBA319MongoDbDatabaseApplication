const express = require("express");
const router = express.Router();
bike = require("../models/bike");

//---> CRUD routes for bikes
router.get("/", (req, res) => {
  res.send("the root the root the root is on fyyyaaaa!!");
});

router.get("/", async (req, res) => {
  //   Get all bikes from DB
  const bikes = await Bike.find();
  console.log(`Currently Fetching ALL Bikes`);
  res.json({ bikes: bikes });
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

router.post("/bikes", async (req, res) => {
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

router.put("/bikes/:id", async (req, res) => {
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

router.delete("/bikes/:id", async (req, res) => {
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
