import express from "express";
export const router = express.Router();

import { Movie } from "../models/movie.js";
import { Genre } from "../models/genre.js";

//CRUD operations

//get all movies
router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

//get movie by id
router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.send(movie);
});

//add a movie
router.post("/", async (req, res) => {
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  let newMovie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre.id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  newMovie = await newMovie.save();
  res.send(newMovie);
});

//updating a movie  //we are only changing the name of a movie
router.put("/:id", async (req, res) => {
  let movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).send("Movie not found");

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  movie.title = req.body.title;
  movie.dailyRentalRate = req.body.dailyRentalRate || movie.dailyRentalRate;
  movie.numberInStock = req.body.numberInStock || movie.numberInStock;
  movie.genre = {
    _id: genre._id,
    name: genre.name,
  };

  const updatedMovie = await movie.save();
  res.send(updatedMovie);
});
//deleting a movie
router.delete("/:id", async (req, res) => {
  const deletedMovie = await Movie.findByIdAndDelete(req.params.id)
    .then()
    .catch((err) => {
      console.log(err.messsage);
    });
  res.send(deletedMovie);
});
