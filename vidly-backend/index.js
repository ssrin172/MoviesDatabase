import express from "express";
import { router as genres } from "./routes/genres.js";
import { router as customers } from "./routes/customers.js";
import { router as movies } from "./routes/movies.js";
import { router as rentals } from "./routes/rentals.js";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
const port = process.env.port || 3000;

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connect to MongoDB..."))
  .catch((err) => console.log("Cannot connect to mongoDB...", err));

app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
