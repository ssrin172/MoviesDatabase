import express from "express";
export const router = express.Router();
import bcrypt from "bcrypt";

import { User } from "../models/user.js";

router.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) return res.status(400).send("Invalid email or password");

  res.send(true);
});
