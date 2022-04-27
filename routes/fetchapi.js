var express = require("express");
var router = express.Router();
const axios = require("axios");


router.get("/test-api", (req, res, next) => {

  const options = {
    method: "GET",
    url: "https://instagram29.p.rapidapi.com/user/saschafitness",
    headers: {
      "X-RapidAPI-Host": "instagram29.p.rapidapi.com",
      "X-RapidAPI-Key": "3072f09d45msh854525fc2b692bep13c14ejsn2f8e11f4b962",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res.json(response.data)
    })
    .catch(function (error) {
      console.error(error);
      res.json(error.message)
    });
});

module.exports = router;
