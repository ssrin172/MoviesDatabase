import mongoose from "mongoose";

export const genreSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
export const Genre = mongoose.model("Genres", genreSchema);
