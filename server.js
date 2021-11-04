import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// connect to MongoDB
dotenv.config();
mongoose
  .connect(
    "mongodb+srv://jesswaz24:oatMilk11@cluster0.jko7e.mongodb.net/Inventory?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log(`Connection Error: ${err.message}`);
  });

// require API
import getInventory from "./API/inventory.js";
import postInventory from "./API/inventory.js";

// Use API
app.use("/", getInventory);
app.use("/", postInventory);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// Active port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

export default app;
