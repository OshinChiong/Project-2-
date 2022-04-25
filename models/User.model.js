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
    }
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;