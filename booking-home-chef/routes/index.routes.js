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


router.get("/:recipeId",(req,res,next)=>{
  const{recipeId} = req.params
  Recipe.findById(recipeId)
  .then(recipeDetail=>{
    console.log(recipeDetail);
    res.render("recipe/recipe-detail",recipeDetail)
  })
  .catch(e=>console.log("error to find detail of recipe",e))
})



module.exports = router;
