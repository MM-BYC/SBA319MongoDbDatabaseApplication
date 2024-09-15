const express = require("express");
const router = express.Router();

const Country = require("../models/country");

//---> CRUD routes for countries

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
    //--> country: inside res.json means postman will display that as country: or change it to display as countries:
    res.json({ country: country });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// --------[POST]

router.put("/:id", async (req, res) => {
  const countryId = req.params.id;
  const { countryName, capital, population } = req.body;
  const country = await Country.findByIdAndUpdate(countryId, {
    countryName: countryName,
    capital: capital,
    population: population,
  });
  //  part 2
  //---> find the updated countryId. Send it to the client side as an object
  const updateCountry = await Country.findById(countryId);
  res.json({ country: updateCountry });
});
// --------[Update]

router.delete("/:id", async (req, res) => {
  const countryId = req.params.id;
  await Country.deleteOne({
    _id: countryId,
    // MongoDB implements _id instead of id
  });
  res.json({ success: "Its Deleted" });
});

module.exports = router;
