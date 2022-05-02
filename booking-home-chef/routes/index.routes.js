const isLoggedIn = require("../middleware/isLoggedIn");
const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");

const router = require("express").Router();


router.get("/",(req,res,next)=>{
  let chefs;
  User.find({isProfilePublic : true})
    .then(userArr=> {
      chefs = userArr
      return Recipe.find()
    })
    .then(recipesArr=>{
      console.log(chefs);
      res.render("index",{recipes : recipesArr,chefs})
    })
  .catch(e=>console.log("error to find  list of recipes",e))
})


module.exports = router;
