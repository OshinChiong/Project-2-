const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: String,
    username: {
        type: String,
        unique: true
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    imageUrl: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;