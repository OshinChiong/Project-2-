const { model, Schema } = require("mongoose");

const profileSchema = new Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
  },

  });

const Profile = model("Profile", profileSchema);

module.exports = Profile;