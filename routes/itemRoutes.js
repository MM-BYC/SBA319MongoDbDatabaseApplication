//---> import express.Router()
const express = require("express");
const router = express.Router();

//---> import data model
const Item = require("../models/item");

//----> define all CRUD routes
router.get("/", async (req, res) => {
  //-> get all items from DB
  const items = await Item.find();
  console.log("currently fetching all items");
  res.json({ items: items });
});
// -> READ all items

router.get("/:id", async (req, res) => {
  //-> 1. get if of the url
  const item = req.params.id;
  //-> 2. FindThatItemByID
  const thisSpecificItem = await Item.findById(item);
  res.json({ item: thisSpecificItem });
});
// -> READ individual item

router.post("/", async (req, res) => {
  try {
    //-> destructure the fields value to update the DB with.
    const {
      itemName,
      itemPrice,
      currency,
      itemQuantity,
      photo,
      description,
      category,
    } = req.body;
    //-> create the new item in the DB
    const item = await Item.create({
      itemName: itemName,
      itemPrice: itemPrice,
      currency: currency,
      itemQuantity: itemQuantity,
      photo: photo,
      description: description,
      category: category,
    });
    console.log(`SuccesfullyMadePOST`);
    res.json({ item: item });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e.message });
  }
});
// -> CREATE new item

router.put("/:id", async (req, res) => {
  //-> 1. get id from url
  const itemId = req.params.id;
  //-> 2. destructure the fields value to update the DB with.
  const {
    itemName,
    itemPrice,
    currency,
    itemQuantity,
    photo,
    description,
    category,
  } = req.body;
  // -> 3. update the DB
  await Item.findByIdAndUpdate(itemId, {
    itemName: itemName,
    itemPrice: itemPrice,
    currency: currency,
    itemQuantity: itemQuantity,
    photo: photo,
    description: description,
    category: category,
  });
  // -> 4. part 2 confirm that update was made!
  const updateItem = await Item.findById(itemId);
  res.json({ item: updateItem });
});
// -> UPDATE individual item

router.delete("/:id", async (req, res) => {
  //-> 1. get id from url
  const itemId = req.params.id;
  //-> 2. delete the item
  await Item.deleteOne({
    _id: itemId,
  });
  //-> 3. confirm that update was made!
  res.json({ item: "Its Deleted" });
});
// -> DELETE individual item

module.exports = router;
