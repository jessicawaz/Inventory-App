import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// require API
import getInventory from "./API/inventory.js";
import postInventory from "./API/inventory.js";

// Use API
app.use("/", getInventory);
app.use("/", postInventory);

// Active port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

export default app;
