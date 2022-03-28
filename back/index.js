const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to mongoDB"));

app.use(express.json());

// ROUTES
// Home
app.get("/", (_req, res) => {
  res.send("Welcome");
});

// ERROR
app.get("*", (req, res) => {
  res.status(404).send("Page not found - 404");
});

// Listen
app.listen(8000, () => {
  console.log("Listening on port 8000"); // localhost:8000
});
