const mongoose = require("mongoose");

const validateEmail = function (email) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    minlength: 8,
  },
  firstName: {
    type: String,
    minlength: 1,
    maxlength: 30,
  },
  lastName: {
    type: String,
    minlength: 1,
    maxlength: 30,
  },
  dateOfBirth: {
    type: Date,
    required: true,
    trim: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
