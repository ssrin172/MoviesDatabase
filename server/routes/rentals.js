import { Rental } from "../models/rental.js";
import { Movie } from "../models/movie.js";
import { Customer } from "../models/customer.js";
import express from "express";
export const router = express.Router();
import mongoose from "mongoose";

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut"); //sort in descending order of date
  res.send(rentals);
});

router.post("/", async (req, res) => {
  if (!mongoose.isValidObjectId(req.body.customerId))
    return res.status(400).send("Invalid customer ID format.");

  if (!mongoose.isValidObjectId(req.body.movieId))
    return res.status(400).send("Invalid movie ID format.");
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie.");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock.");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  // rental = await rental.save();

  // movie.numberInStock--;
  // movie.save();
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await rental.save({ session });

    movie.numberInStock--;
    await movie.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.send(rental);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).send("Transaction failed: " + err.message);
  }
});

router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental)
    return res.status(404).send("The rental with the given ID was not found.");

  res.send(rental);
});
