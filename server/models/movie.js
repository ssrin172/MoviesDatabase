import mongoose from "mongoose";
import { genreSchema } from "./genre.js";

export const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    default: 0,
    min: 0,
    max: 255,
  },
  dailyRentalRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 255,
  },
});
export const Movie = mongoose.model("Movies", movieSchema);
