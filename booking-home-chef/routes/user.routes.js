const router = require("express").Router();

const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

//create user
router.get("/:userId", (req, res, next) => {
  const { userId } = req.params
  User.findById(userId)
    .then(user => {
      res.render("user/user-profile", user);
    })

});

router.get("/:userId", (req, res, next) => {
  const { userId } = req.params
  User.findById(userId)
    .then(user => {
      res.render("user/user-profile", user);
    })

});











module.exports = router;