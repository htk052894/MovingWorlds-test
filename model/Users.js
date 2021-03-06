const mongoose = require("mongoose"),
  Schema = mongoose.Schema

// create schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  urls: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "ShortUrl",
    },
  ],
})

module.exports = User = mongoose.model("users", UserSchema)
