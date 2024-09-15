const express = require("express");
const router = express.Router();

const Country = require("../models/country");

//---> CRUD routes for countries
router.get("/", (req, res) => {
  res.send("countries root root root");
});

router.get("/", async (req, res) => {
  //   Get all countries from DB
  const countries = await Country.find();
  console.log(`currently fetching all countries`);
  res.json({ countries: countries });
});

//---> [READ - all instances of Country in DB]
router.get("/:id", async (req, res) => {
  // 1. Get id of the url
  const countryId = req.params.id;
  // 2. FindThatCountryByID
  const thisSpecificCountry = await Country.findById(countryId);
  res.json({ country: thisSpecificCountry });
});
//--------------------------{Read - individual instance of Country in DB [req.params.id]}
// ----------------------{GET}

router.post("/", async (req, res) => {
  try {
    // ensure names matches that of the Schema in the model file
    const { countryName, capital, population } = req.body;
    const country = await Country.create({
      countryName: countryName,
      capital: capital,
      population: population,
    });
    console.log(`SuccesfullyMadePOST`);
    res.json({ country: country });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
