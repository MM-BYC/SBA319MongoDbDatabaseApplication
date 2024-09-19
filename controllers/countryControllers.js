// import the data model template
const Country = require("../models/country");

// place all CRUD functions as key:value pairs in an object
// to countryControllers. Accessible via chaining methods
// .e.g. countryControllers.getAllCountry

const countryControllers = {
  getAllCountries: async (req, res) => {
    //   Get all countries from DB
    const countries = await Country.find();
    console.log(`currently fetching all countries`);
    res.json({ countries: countries });
  },

  getCountryById: async (req, res) => {
    // 1. Get id of the url
    const countryId = req.params.id;
    // 2. FindThatCountryByID
    const thisSpecificCountry = await Country.findById(countryId);
    res.json({ country: thisSpecificCountry });
  },

  createCountry: async (req, res) => {
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
  },

  updateCountryById: async (req, res) => {
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
  },
  deleteCountryById: async (req, res) => {
    const countryId = req.params.id;
    await Country.deleteOne({
      _id: countryId,
      // MongoDB implements _id instead of id
    });
    res.json({ success: "Its Deleted" });
  },
};

module.exports = { countryControllers };
