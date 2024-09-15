const express = require("express");
const router = express.Router();

const countries = require("./countryRoutes");

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
    const thisSpecificCountry = await findById(countryId);
    res.json({ country: thisSpecificCountry });
 });



module.exports = router;
