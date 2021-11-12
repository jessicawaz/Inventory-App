import express from "express";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";

const router = express.Router();
router.use(express.json());
dotenv.config();

import userModel from "./models/userModel.js";

// New User
router.post("/auth", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields." });
  }

  userModel
    .findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "User does not exist." });
      }

      // Validate Password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(400).json({ message: "Invalid Password." });
        } else {
          jwt.sign({ id: user.id }, process.env.JWTSECRET, (err, token) => {
            if (err) {
              return res
                .status(500)
                .json({ message: "Internal Service Error" });
            } else {
              return res.json({
                token: token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/user", auth, (req, res) => {
  userModel
    .findById(req.user.id)
    .select("-password")
    .then((user) => {
      return res.json(user);
    });
});

export default router;
