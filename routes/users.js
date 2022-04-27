var express = require('express');
var router = express.Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const bcryptjs = require("bcryptjs");
const res = require('express/lib/response');
const Profile = require('../models/Profile.model');
const saltRounds = 10;
const isLoggedIn = require("../middleware/isLoggedIn");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/profile", function (re, res, next) {
  res.render("profile");
});

router.get("/home", function (re, res, next) {
  res.render("home");
});
router.get("/about", function (re, res, next) {
  res.render("about");
});
router.get("/terms", function (re, res, next) {
  res.render("terms");
});
router.get("/help", function (re, res, next) {
  res.render("help");
});

router.get("/signup", function (re, res, next) {
  res.render("signup");
});

router.post("/signup", function (req, res, next){
  if (!req.body.email || !req.body.password) {
    res.render('signup', {message : "Both fields are required"})
}
User.findOne({email: req.body.email})
.then((foundUser) => {
    if (foundUser) {
        res.render('signup', {message: "This Username is already taken"})
    } else {
        const salt = bcrypt.genSaltSync(saltRounds)
        const hashedPass = bcrypt.hashSync(req.body.password, salt)
        User.create({
            email: req.body.email,
            username: req.body.username,
            password: hashedPass
        })
        .then((createdUser) => {
            res.render('all-influencers', {message: "You have created a new account"})
        })
    }
})
})


router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.render("login", { message: "Please fill out all the fields"});
  }
  User.findOne({username: req.body.username })
  .then((foundUser) => {
    if (!foundUser) {
        res.render('login', {message: "This Username does not exist"})
    } else {
        let correctPassword = bcrypt.compareSync(req.body.password, foundUser.password);
        if(correctPassword) {
            req.session.user = foundUser;
            res.render('profile', {message: "You have logged in"})
        } else {
            res.render('login', {message: "Incorrect Password"})
        }
    }
})
})

router.get("/logout", function (req, res, next) { 
req.session.destroy();
res.redirect("/users/login")
});




// router.get("/create", isLoggedIn, function (req, res, next) {
//   res.render("add-new");
// });

// router.post("/create", isLoggedIn, function (req, res, next) {
//   if (!req.body.name || !req.body.description) {
//     res.render("add-new", { message: "please fill out all fields" });
//   }

//   Profile.create({
//     username: req.body.username,
//     description: req.body.description,
//     owner: req.session.user._id,
//   })
//     .then(() => {
//       res.redirect("/");
//     })
//     .catch((error) => {
//       console.log("Failed");
//       res.render("add-new", {
//         message: "something went wrong",
//       });
//     });
// });

// router.get("/:id/add-new", isLoggedIn, (req, res) => {
//   Profile.findById(req.params.id)
//     .then(() => {
//       res.render("add-review", { users: users });
//     })
//     .catch(() => {
//       res.redirect("/users/profile");
//     });
// });

// router.post("/:id/add-review", isLoggedIn, (req, res) => {
//   Profile.create({
//     user: req.session.user._id,
//     comment: req.body.comment,
//   })
//     .then((createdReview) => {
//       Profile.findByIdAndUpdate(req.params.id, {
//         $push: { reviews: createdReview._id },
//       })
//         .then((results) => {
//           res.redirect("/users/profile");
//         })
//         .catch((err) => {
//           res.json(err.message);
//         });
//     })
//     .catch((err) => {
//       console.log("Failed to create comment", err.message);
//       res.json(err.message);
//     });
// });

module.exports = router;
