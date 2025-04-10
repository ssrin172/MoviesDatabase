import express from "express";
export const router = express.Router();
import _ from "lodash";

import { User } from "../models/user.js";

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post("/", async (req, res) => {
  let newUser = await User.findOne({ email: req.body.email });

  if (newUser) return res.status(400).send("User already registered");

  //   newUser = new User({
  //     name: req.body.name,
  //     email: req.body.email,
  //     password: req.body.password,
  //   });
  newUser = new User(_.pick(req.body, ["name", "email", "password"]));

  try {
    const result = await newUser.save();
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
  res.send(_.pick(newUser, ["name", "email"]));
});
