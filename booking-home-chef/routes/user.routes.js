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
      console.log(req.session.user);
      res.render("user/user-profile", user);
    })

});


//my recipes /////issue!!!


router.get("/:userId/my-recipes",isLoggedIn,(req,res,next)=>{
  const  userId  = req.params.userId
  Recipe.find( {owner: {_id: userId}} )
  .then(recipesArr=>{
    console.log(recipesArr);
    res.render("recipe/recipe-list",{recipes : recipesArr})
  })
  .catch(e=>console.log("error to find  list of recipes",e))
})








module.exports = router;