const express = require("express");
const router = express.Router();

const { countryControllers } = require("../controllers/countryControllers");

//---> CRUD routes for countries

router.get("/", countryControllers.getAllCountries);
//---> [READ - all instances of Country in DB]

router.get("/:id", countryControllers.getCountryById);
//---{Read - individual instance of Country in DB [req.params.id]}
//---{GET}

router.post("/", countryControllers.createCountry);
//---[POST]

router.put("/:id", countryControllers.updateCountryById);
//---[Update]

router.delete("/:id", countryControllers.deleteCountryById);

module.exports = router;
