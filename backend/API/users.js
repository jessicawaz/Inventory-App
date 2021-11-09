import express from "express";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const router = express.Router();
router.use(express.json());
dotenv.config();

import userModel from "./models/userModel.js";

// New User
router.post("/users", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (!name || !email || !password) {
    res.status(400).json({ message: "Please enter all fields." });
  }

  userModel.findOne({ email }).then((user) => {
    if (user) {
      res.status(400).json({ message: "Email already registered to a user." });
    } else {
      const newUser = new userModel({
        name: name,
        email: email,
        password: password,
      });

      // Create hash for user-entered password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            res.status(500).json({ message: "Internal Service Error" });
          }
          newUser.password = hash;
          newUser.save().then((user) => {
            // payload
            jwt.sign({ id: user.id }, process.env.JWTSECRET, (err, token) => {
              if (err) {
                res.status(500).json({ message: "Internal Service Error" });
              }
              res.json({
                token: token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            });
          });
        });
      });
    }
  });
});

export default router;
