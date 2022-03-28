const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
// Models
const User = require("./models/userModel");

// Connexion to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to mongoDB"));

// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// ROUTES
// Home
app.get("/", async (_req, res) => {
  let users;
  try {
    users = await User.find().select("-__v");
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: `Error occured: ${err}`,
    });
  }
  res.json(users);
});

// Signup
app.post("/signup", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  try {
    await User.create({
      email: req.body.email,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
    });
  } catch (err) {
    return res.status(400).json({
      message: "This account already exists",
    });
  }
  res.status(201).json({
    message: `User ${req.body.firstName} ${req.body.lastName} created`,
  });
});

// Login
app.get("/login", (_req, res) => {
  res.send("Welcome");
});

// Admin
app.get("/admin", (_req, res) => {
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
