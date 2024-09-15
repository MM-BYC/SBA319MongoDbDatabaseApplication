require("dotenv").config();
// ---> Init() our ENV file
const express = require("express");
// ---> Imported Express
const app = express();
// ---> Initialize Express
const PORT = process.env.PORT || 3000;
const Bike = require("./models/bike");

// ---> Connect to MongoDB
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

//---> {Middleware *optional* }
// in order to determine routes, we FIRST must determine the capability of our data

//---> import routes
const bikeRoutes = require("./routes/bikeRoutes");
const countryRoutes = require("./routes/countryRoutes");
const userRoutes = require("./routes/userRoutes");

//---> General route
app.get("/", (req, res) => {
  try {
    res.send("the root the root the root is on fyyyaaaa!!");
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ error: err.message });
  }
});

//---> Use routes
app.use("/bikes", bikeRoutes);
app.use("/countries", countryRoutes);
app.use("/users", userRoutes);

//--> server listening to port. Type: npm run dev
app.listen(PORT, () => {
  console.log(`Connected to Server from PORT ${PORT}`);
});
