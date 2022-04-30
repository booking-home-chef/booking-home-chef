const router = require("express").Router();

const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

//list of all recipe
router.get("/recipe",isLoggedIn,(req,res,next)=>{
  Recipe.find()
  .then(recipesArr=>{
    console.log(recipesArr);
    res.render("recipe/recipe-list",{recipes : recipesArr})
  })
  .catch(e=>console.log("error to find  list of recipes",e))
})



//create new recipe
router.get("/recipe/create-recipe",isLoggedIn, (req, res, next) => {

  res.render("recipe/create-recipe")
})




// CREATE: process form
router.post("/recipe/create-recipe",isLoggedIn, (req, res, next) => {

  const { name, ingredient, description, dietary } = req.body
  console.log( { name, ingredient, description, dietary });

  Recipe.create( { name, ingredient, description, dietary })
    .then((recipeFromDB) => {
      console.log(recipeFromDB);
      res.redirect("/recipe");
    })
    .catch(err => {
      console.log("error creating book on DB", err)
      next(err);
    });

})



// recipe detail
router.get("/recipe/:recipeId",isLoggedIn,(req,res,next)=>{
  const{recipeId} = req.params
  Recipe.findById(recipeId)
  .then(recipeDetail=>{
    console.log(recipeDetail);
    res.render("recipe/recipe-detail",recipeDetail)
  })
  .catch(e=>console.log("error to find detail of recipe",e))
})





//recipe detail


//edite recipe

//edit recipe process


//delete recipe




module.exports = router;