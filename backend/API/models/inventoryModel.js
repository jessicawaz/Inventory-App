import mongoose from "mongoose";

const invSchema = new mongoose.Schema({
  itemName: String,
  barcode: String,
  quantity: Number,
  price: Number,
});

export default mongoose.model("inv", invSchema);
