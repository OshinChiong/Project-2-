const { model, Schema } = requiere("mongoose");

const influencersSchema = new Schema(
  {
    biography: {
      type: String,
    },
    username: {
        type: String,
    },
    follower_count: {
      type: Number,
    },
    following_count: {
      type: Number
    }
  },


);

const Influencers = model("Influencers", influencersSchema);

module.exports = Influencers;