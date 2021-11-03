import express from "express";
import mongodb from "mongodb";
const MongoClient = mongodb.MongoClient;

const router = express.Router();
router.use(express.json());

import invModel from "./models/inventoryModel.js";

// GET
router.get("/getInventory", async (req, res) => {
  try {
    const getInventory = await invModel.find();
    res.status(200).json(getInventory);
  } catch (err) {
    res.status(404).json({ message: err.massage });
  }
});

// POST
router.post("/newInventory", (req, res) => {
  const newInv = new invModel({
    itemName: req.body.itemName,
    barcode: req.body.barcode,
    quantity: req.body.quantity,
    price: req.body.price,
  });

  newInv.save().then((inv) => res.json(inv));
});

// DELETE
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await invModel.findByIdAndDelete(id).exec();
});

export default router;