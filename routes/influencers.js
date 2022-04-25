var express = require("express");
const req = require("express/lib/request");
const { resource } = require("../app");
var router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const Influencers = require("../models/Influencers.model");
const Review = require("../models/Review.model");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
  });
  
  router.get("/all", isLoggedIn, (req, res) => {
    Influencers.find()
      .populate({
        path: "reviews",
        populate: {
          path: "user",
        },
      })
      .then((allInfluencers) => {
        console.log("all influencers", allInfluencers[0].reviews);
        res.render("all-influencers", { allInfluencers: allInfluencers });
      })
      .catch((err) => {
        console.log("Failed", err.message);
        res.redirect("/");
      });
  });


  router.get("/:id/add-review", isLoggedIn, (req, res) => {
    Influencers.findById(req.params.id)
      .then((foundInfluencers) => {
        res.render("add-review", { foundInfluencers: foundInfluencers });
      })
      .catch(() => {
        res.redirect("/");
      });
  });

  router.post("/:id/add-review", isLoggedIn, (req, res) => {
    Review.create({
        user: req.session.user._id,
        comment: req.body.comment,
      })
        .then((createdReview) => {
            Influencers.findByIdAndUpdate(req.params.id, {
            $push: { reviews: createdReview._id },
          })
            .then((results) => {
              res.redirect("/influencers/all");
            })
            .catch((err) => {
              res.json(err.message);
            });
        })
        .catch((err) => {
          console.log("Failed to create comment", err.message);
          res.json(err.message);
        });
    });
    
    module.exports = router;