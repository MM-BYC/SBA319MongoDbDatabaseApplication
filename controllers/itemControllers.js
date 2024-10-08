const Item = require("../models/item");

// place all CRUD functions as key:value pairs in an object
// to itemControllers. Accessible via chaining methods
// .e.g. itemControllers.getAllItems

const itemControllers = {
  getAllItems: async (req, res) => {
    //-> get all items from DB
    const items = await Item.find();
    console.log("currently fetching all items");
    res.json({ items: items });
  },
  getItemById: async (req, res) => {
    //-> 1. get if of the url
    const item = req.params.id;
    //-> 2. FindThatItemByID
    const thisSpecificItem = await Item.findById(item);
    res.json({ item: thisSpecificItem });
  },
  createItem: async (req, res) => {
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
  },

  updateItemById: async (req, res) => {
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
  },
  deleteItemById: async (req, res) => {
    //-> 1. get id from url
    const itemId = req.params.id;
    //-> 2. delete the item
    await Item.deleteOne({
      _id: itemId,
    });
    //-> 3. confirm that update was made!
    res.json({ item: "Its Deleted" });
  },
};

module.exports = { itemControllers };
