const express = require("express");
const router = express.Router();
const Bike = require("../models/bike");

// destructure folder Controllers
const { bikeControllers } = require("../controllers/bikeControllers");

//---> CRUD routes for bikes

router.get("/", bikeControllers.getAllBikes);
//---> [READ - all instances of Bike in DB]

router.get("/:id", bikeControllers.getBikeById);
//--{Read - individual instance of Bike in DB [req.params.id]}
// ----{GET}

router.post("/", bikeControllers.createBike);
// --------[POST]

router.put("/:id", bikeControllers.updateBike);
// --------[Update]

router.delete("/:id", bikeControllers.deleteBike);
// --------[Delete]

module.exports = router;
