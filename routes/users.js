var express = require('express');
var router = express.Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const bcryptjs = require("bcryptjs");
const res = require('express/lib/response');
const Profile = require('../models/Profile.model');
const saltRounds = 10;
const isLoggedIn = require("../middleware/isLoggedIn");

//This will be middleware
// const fileUploader = require("../config/cloudinary.config");

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



// router.get("/new-post", function (req, res, next) {
//   res.render("create-user");
// });

// //This is where we create new posts
// router.post(
//   "/new-post",
//   fileUploader.single("imageUrl"),
//   function (req, res, next) {
//     //POST form creates req.body
//     //Dyamic URL creates req.params
//     //GET creates req.query
//     //Sessions create req.session
//     //fileUploader creates req.file

//     console.log("This is our file", req.file);

//     Post.create({
//       title: req.body.title,
//       content: req.body.content,
//       creatorId: "625edd8321e64121b31a16f0",
//       imageUrl: req.file.path,
//     })
//       .then((createdPost) => {
//         console.log("Post created", createdPost);
//         res.redirect("/");
//       })
//       .catch((error) => {
//         console.log("Failed to create post", error.message);
//       });
//   }
// );

// router.get("/all-posts", function (req, res, next) {
//   Post.find()
//     .populate("creatorId")
//     .then((allPosts) => {
//       res.render("all-posts", { allPosts: allPosts });
//     })
//     .catch((err) => {
//       console.log("Something went wrong", err.message);
//     });
// });

// //Get user and profile, option 1
// router.get("/profile/:userId", function (req, res, next) {
//   User.findById(req.params.userId)
//     .then((foundUser) => {
//       Post.find({ creatorId: req.params.userId }).then((allPosts) => {
//         res.render("profile", { user: foundUser, allPosts: allPosts });
//       });
//     })
//     .catch((err) => {
//       console.log("Something went wrong", err.message);
//     });
// });

// //Get user and profile, option 2
// // router.get("/profile/:userId", function (req, res, next) {
// //   Post.find({ creatorId: req.params.userId })
// //     .populate("creatorId")
// //     .then((allPosts) => {
// //       res.render("profile", {
// //         user: allPosts[0].creatorId,
// //         allPosts: allPosts,
// //       });
// //     })
// //     .catch((err) => {
// //       console.log("Something went wrong", err.message);
// //     });
// // });

// router.get("/secret", (req, res) => {
//   if (req.session.user) {
//     res.render("secret");
//   } else {
//     res.render("index", {
//       title: "Express",
//       message: "You can only see this if you are logged in",
//     });
//   }
// });

module.exports = router;

