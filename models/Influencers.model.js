const { model, Schema } = require("mongoose");

const influencersSchema = new Schema(
  {
    biography: {
      type: String,
    },
    username: {
        type: String,
    },
    fullname: {
      type: String,
  },
    follower_count: {
      type: Number,
    },
    following_count: {
      type: Number
    },
    profile_pic_url: {
      type: String,
      default: "https://instagram.fvno3-1.fna.fbcdn.net/v/t51.2885-19/263570976_273354718170504_5597971410410838789_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fvno3-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=Kjqkwe8ifK4AX8sTL46&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT9cPQpIcOUhptaxpj7IOqWbK2RwyoRyWIQ0PhVp9ttdTA&oe=626CE978&_nc_sid=7bff83",
    },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }]
  },


);

const Influencers = model("Influencers", influencersSchema);

module.exports = Influencers;