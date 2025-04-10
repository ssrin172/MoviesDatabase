import express from "express";
import Joi from "joi";
import mongoose from "mongoose";
export const router = express.Router();

import { Customer } from "../models/customer.js";

router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.send(customer);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
router.post("/", async (req, res) => {
  const newCustomer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  try {
    const result = await newCustomer.save();
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
  res.send(newCustomer);
});

router.put("/:id", async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
      },
      { new: true, runValidators: true } //Returns the updated document
    );

    if (!updatedCustomer) {
      return res.status(404).send("Customer not found");
    }

    res.send(updatedCustomer);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    res.send(deletedCustomer);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
