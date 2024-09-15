require("dotenv").config();
// ----> Init() our ENV file
const express = require("express");
// -----> Imported Express
const app = express();
// ----> Initialize Express
const PORT = process.env.PORT || 3000;
const Bike = require("./models/bike");
const connectToDB = require("./config/connectToDB");
connectToDB();

app.use(express.json());
// --->allows us to do things with c/s relationship [json]

app.use(express.static("public"));
//---> middleware uses third party package
// ----------------------------------> {Setup}

app.use((req, res, next) => {
  //--->  a req/res needs to be INTERCEPTED and changed.
  console.log("Custom_Middleware_Hit! ");
  next();
});
//---> middleware customized implementation uses arrow function

// -----> {Middleware *optional* }
// in order to determine routes, we FIRST must determine the capability of our data

//---> ---> ---> ---> Routing [Bikes]
app.get("/", (req, res) => {
  res.send("the root the root the root is on fyyyaaaa!!");
});

app.get("/bikes", async (req, res) => {
  //   Get all bikes from DB
  const bikes = await Bike.find();
  console.log(`Currently Fetching ALL Bikes`);
  res.json({ bikes: bikes });
});
// ----------------> [READ - all instances of Bike in DB]
app.get("/bikes/:id", async (req, res) => {
  // 1.Get id of the url
  const bikeId = req.params.id;
  // 2.FindThatBikeByID
  const thisSpecificBike = await Bike.findById(bikeId);
  res.json({ bike: thisSpecificBike });
});
// -------------{Read - individual instance of Bike in DB [req.params.id]}
// ----------------------{GET}

app.post("/bikes", async (req, res) => {
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

app.put("/bikes/:id", async (req, res) => {
  const bikeId = req.params.id;
  const { numOfWheels, color, pedals } = req.body;
  const bike = await Bike.findByIdAndUpdate(bikeId, {
    numOfWheels: numOfWheels,
    color: color,
    pedals: pedals,
  });
  //   part2
  const updatedBike = await Bike.findById(bikeId);
  res.json({ bike: updatedBike });
});
// --------[Update]

app.delete("/bikes/:id", async (req, res) => {
  const bikeId = req.params.id;
  await Bike.deleteOne({
    id: bikeId,
  });
  res.json({ success: "Its Deleted" });
});
// --------[Delete]

app.listen(PORT, () => {
  console.log(`Connected to Server from PORT ${PORT}`);
});
