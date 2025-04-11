import express from "express";
import { router as genres } from "./routes/genres.js";
import { router as customers } from "./routes/customers.js";
import { router as movies } from "./routes/movies.js";
import { router as rentals } from "./routes/rentals.js";
import { router as users } from "./routes/users.js";
import { router as auth } from "./routes/auth.js";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
const port = process.env.port || 3900;

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connect to MongoDB..."))
  .catch((err) => console.log("Cannot connect to mongoDB...", err));

app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
