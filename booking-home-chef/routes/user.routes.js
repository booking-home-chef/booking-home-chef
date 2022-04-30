const router = require("express").Router();

const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");


//create user
router.get("/user-profile", (req, res, next) => {
  res.render("user/user-profile");
});



module.exports = router;