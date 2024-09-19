//---> import express.Router()
const express = require("express");
const router = express.Router();

//---> import data model
const Item = require("../models/item");
const { itemControllers } = require("../controllers/itemControllers");

//----> define all CRUD routes
router.get("/", itemControllers.getAllItems);
// -> READ all items

router.get("/:id", itemControllers.getItemById);
// -> READ individual item

router.post("/", itemControllers.createItem);
// -> CREATE new item

router.put("/:id", itemControllers.updateItemById);
// -> UPDATE individual item

router.delete("/:id", itemControllers.deleteItemById);
// -> DELETE individual item

module.exports = router;
