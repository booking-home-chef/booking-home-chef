const isLoggedIn = require("../middleware/isLoggedIn");
const Recipe = require("../models/Recipe.model");

const router = require("express").Router();


router.get("/",(req,res,next)=>{
  Recipe.find()
  .then(recipesArr=>{
    console.log(recipesArr);
    res.render("index",{recipes : recipesArr})
  })
  .catch(e=>console.log("error to find  list of recipes",e))
})


module.exports = router;
