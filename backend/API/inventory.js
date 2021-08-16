import express from "express";
import mongodb from "mongodb";
const MongoClient = mongodb.MongoClient;

const router = express.Router();
router.use(express.json());

import invModel from "./models/inventoryModel.js";

// GET
router.get("/getInventory", (req, res) => {
  const uri =
    "mongodb+srv://jesswaz24:#####@cluster0.jko7e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect((err) => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object

    MongoClient.connect(uri, function (err, db) {
      if (err) throw err;
      var dbo = db.db("Inventory");
      dbo
        .collection("inventory")
        .find({})
        .toArray(function (err, res) {
          if (err) throw err;
          console.log(res);
          db.close();
        });
    });
  });
});

// POST
router.post("/newInventory", (req, res) => {
  const itemName = req.body.itemName;
  const barcode = req.body.barcode;
  const quantity = req.body.quantity;
  const price = req.body.price;

  const newInv = new invModel({
    itemName: itemName,
    barcode: barcode,
    quantity: quantity,
    price: price,
  });

  const uri =
    "mongodb+srv://jesswaz24:oatMilk11@cluster0.jko7e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect((err) => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object

    MongoClient.connect(uri, { useUnifiedTopology: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("Inventory");
      dbo.createCollection("inventory", function (req, res) {
        if (err) throw err;
        console.log("created db inventory");
        dbo.collection("inventory").insertOne(newInv, function (err, res) {
          if (err) throw err;
          console.log("inserted into Inventory");
          db.close();
        });
      });
    });
    client.close();
  });
});

// DELETE

// UPDATE

export default router;
