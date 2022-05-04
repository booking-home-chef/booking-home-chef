const router = require("express").Router();

const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");
const Favorite = require("../models/Favorite.model");
const uploadUserProfile = require("../upload/uploadUserProfile");


//list of all recipe
router.get("/recipe",(req, res, next) => {
  const userId =req.session.user._id
  Recipe.find()
    .then(recipesArr => {

      res.render("recipe/recipe-list", { recipes: recipesArr,userId })
    })
    .catch(e => console.log("error to find  list of recipes", e))
})


//create new recipe
router.get("/recipe/create-recipe",(req, res, next) => {
  const userId =req.session.user._id
  res.render("recipe/create-recipe",{userId})
})



// CREATE: process form
router.post("/recipe/create-recipe",uploadUserProfile.single('image_Url'),(req, res, next) => {
  const owner = req.session.user._id
  const { name, ingredient, description, dietary } = req.body
  let image_Url;

  if (req.file) {
    image_Url = req.file.path.replace(/\\/g, '/').substring(6)
  } else {
    image_Url = "/images/recipe-placeholder.jpg"
  }

  Recipe.create({ name, ingredient, description, dietary, owner,image_Url })
    .then((recipeFromDB) => {

      res.redirect("/recipe");
    })
    .catch(err => {
      console.log("error creating book on DB", err)
      next(err);
    });

})



// recipe detail
router.get("/recipe/:recipeId", (req, res, next) => {
  const ownerId = req.session.user._id;
  const { recipeId } = req.params;
  let likeIt;

  Favorite.find({ favRecipe: { _id: recipeId } , currentUser: {  _id: ownerId } })
  .then(myFavRecipeArr => {
      if (!myFavRecipeArr.length) {
        likeIt = true
      } else {
        likeIt = false
      }
      Recipe.findById(recipeId)
      .populate("owner")
      .then(recipeDetail => {
        console.log("MMMMMMMMMMMMMMM",recipeDetail);
        const isTheSame = ownerId == recipeDetail.owner._id;
  
        res.render("recipe/recipe-detail", { recipeDetail, isTheSame, ownerId, likeIt})
      })
    })
    .catch(e => console.log("error to find detail of recipe", e))
})





//edit recipe
router.get('/recipe/:recipeId/edit', (req, res, next) => {
  const { recipeId } = req.params;

  Recipe.findById(recipeId)
    .then(recipeDetail => res.render('recipe/edit-recipe', recipeDetail))
    .catch(error => next(error));
});



//edit recipe process
router.post('/recipe/:recipeId/edit',uploadUserProfile.single('image_Url'), (req, res, next) => {
  const { recipeId } = req.params;
  const { name, ingredient, description, dietary } = req.body;
  
  let image_Url;

  if (req.file) {
    image_Url = req.file.path.replace(/\\/g, '/').substring(6)
  } else {
    image_Url = "/images/recipe-placeholder.jpg"
  }


  Recipe.findByIdAndUpdate(recipeId, { name, ingredient, description, dietary,image_Url })
    .then(updatedRecipe => res.redirect(`/recipe/${recipeId}`))
    .catch(error => next(error));

});




// TODO : add middleware to limit Normal user
//delete recipe
router.post('/recipe/:recipeId/delete',(req, res, next) => {
  const { recipeId } = req.params;
  const ownerId = req.session.user._id;
  Recipe.findByIdAndDelete(recipeId)
    .then(() => res.redirect(`/user/${ownerId}/my-recipes`))
    .catch(error => next(error));

});





//Favorite behavior
router.post('/recipe/:recipeId', (req, res, next) => {

  const ownerId = req.session.user._id;
  const newFavorite = {
    currentUser: req.session.user._id,
    favRecipe: req.params.recipeId
  }

  Favorite.find({ favRecipe: { _id: req.params.recipeId }, currentUser: {  _id: ownerId } })
    .then(myFavRecipeArr => {
      if (!myFavRecipeArr.length) {
        return Favorite.create(newFavorite)
      } else return Favorite.findByIdAndDelete(myFavRecipeArr[0]._id)
    })
    .then(() => {
      res.redirect(`/recipe/${req.params.recipeId}`)
    })
    .catch(error => next(error));

});



module.exports = router;