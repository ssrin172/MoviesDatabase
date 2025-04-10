import express from "express";
import Joi from "joi";
export const router = express.Router();
import mongoose from "mongoose";

import { Genre } from "../models/genre.js";
// const genres = [
//   { id: 1, name: "Action" },
//   { id: 2, name: "Horror" },
//   { id: 3, name: "Romance" },
// ];

//CRUD operations

//Read all genres
router.get("/", async (req, res) => {
  // res.send(genres);
  const genres = await Genre.find();
  res.send(genres);
});

//get a particular genre
router.get("/:id", async (req, res) => {
  // const genre = genres.find((g) => g.id === parseInt(req.params.id));
  // if (!genre) return res.status(400).send("Genre not found");
  // res.send(genre);

  const genre = await Genre.find({ _id: req.params.id });
  res.send(genre);
});

//Create a genre
router.post("/", async (req, res) => {
  //validate genre name
  const { error } = validateGenreName(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //genreName validated
  let newGenre = new Genre({ name: req.body.name });
  newGenre = await newGenre.save();
  res.send(newGenre);
});

//updating a genre
router.put("/:id", async (req, res) => {
  // const genre = genres.find((c) => c.id === parseInt(req.params.id));
  // if (!genre)
  //   return res.status(404).send("The genre with the given ID was not found.");

  // const { error } = validateGenreName(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  // genre.name = req.body.name;
  const updatedGenre = await Genre.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        name: req.body.name,
      },
    }
  )
    .then()
    .catch((err) => console.log(err.message));

  res.send(updatedGenre);
});

//deleting a genre
router.delete("/:id", async (req, res) => {
  // const genre = genres.find((c) => c.id === parseInt(req.params.id));
  // if (!genre)
  //   return res.status(404).send("The genre with the given ID was not found.");

  // const index = genres.indexOf(genre);
  // genres.splice(index, 1);
  const deletedGenre = await Genre.deleteOne({
    _id: req.params.id,
  })
    .then()
    .catch((err) => console.log(err.message));
  res.send(deletedGenre);
});

function validateGenreName(genre) {
  //use Joi for validation

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
}
