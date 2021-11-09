import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// connect to MongoDB
dotenv.config();
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log(`Connection Error: ${err.message}`);
  });

// require API
import getInventory from "./API/inventory.js";
import postInventory from "./API/inventory.js";
import user from "./API/users.js";
import auth from "./API/auth.js";

// Use API
app.use("/", getInventory);
app.use("/", postInventory);
app.use("/", user);
app.use("/", auth);

// Active port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

export default app;
