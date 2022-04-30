const router = require("express").Router();

const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");


//create user
router.get("/:userId", (req, res, next) => {
  const{userId} = req.params
  User.findById(userId)
  .then(user =>{
    res.render("user/user-profile",user);
  })
  
});



module.exports = router;