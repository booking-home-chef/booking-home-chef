const router = require("express").Router();

const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");
const Favorite = require("../models/Favorite.model");
const uploadUserProfile = require("../upload/uploadUserProfile");
const { redirect } = require("express/lib/response");


//list of all recipe
router.get("/", (req, res, next) => {
  const userId = req.session.user._id
  Recipe.find()
    .then(recipesArr => {

      res.render("recipe/recipe-list", { recipes: recipesArr, userId })
    })
    .catch(e => console.log("error to find  list of recipes", e))
})


//create new recipe
router.get("/create-recipe", (req, res, next) => {
  const userId = req.session.user._id
  if(req.session.user.isProfilePublic){
    res.render("recipe/create-recipe", { userId })
  } else {
    res.redirect("/")
  }
})



// CREATE: process form
router.post("/create-recipe", uploadUserProfile.single('image_Url'), (req, res, next) => {
  const owner = req.session.user._id
  const { name, ingredient, description, dietary } = req.body
  let image_Url;

  if (req.file) {
    image_Url = req.file.path.replace(/\\/g, '/').substring(6)
  } else {
    image_Url = "/images/recipe-placeholder.jpg"
  }

  Recipe.create({ name, ingredient, description, dietary, owner, image_Url })
    .then((recipeFromDB) => {

      res.redirect(`/user/${owner}/my-recipes`);
    })
    .catch(err => {
      console.log("error creating book on DB", err)
      next(err);
    });

})



// recipe detail
router.get("/:recipeId", (req, res, next) => {
  const ownerId = req.session.user._id;
  const { recipeId } = req.params;
  let likeIt;

  Favorite.find({ favRecipe: { _id: recipeId }, currentUser: { _id: ownerId } })
    .then(myFavRecipeArr => {
      if (!myFavRecipeArr.length) {
        likeIt = true
      } else {
        likeIt = false
      }
      Recipe.findById(recipeId)
        .populate("owner")
        .then(recipeDetail => {
          console.log("MMMMMMMMMMMMMMM", recipeDetail);
          const isTheSame = ownerId == recipeDetail.owner._id;

          res.render("recipe/recipe-detail", { recipeDetail, isTheSame, ownerId, likeIt })
        })
    })
    .catch(e => console.log("error to find detail of recipe", e))
})


// //Recipe comment section
// router.post("/:recipeId", (req, res, next)=>{
//   const recipeId = req.params.recipeId
//   const comment = `${req.session.user.name}: ${req.body.comments}`

//   Recipe.findByIdAndUpdate(recipeId, {$push: {comments:comment}})
//     .then(recipeCommented => {
//       res.redirect(`/recipe/${req.params.recipeId}`)
//     })
//     .catch(e => console.log("error not added to the DB", e))
// })




//edit recipe
router.get('/:recipeId/edit', (req, res, next) => {
  const { recipeId } = req.params;
  
  Recipe.findById(recipeId)
    .then(recipeDetail => {
      if (recipeDetail.owner !== req.session.user._id){
        res.redirect(`/recipe/${recipeId}`)
      }else{
        res.render('recipe/edit-recipe', recipeDetail)
      }
  })
    .catch(error => next(error));
});



//edit recipe process
router.post('/:recipeId/edit', uploadUserProfile.single('image_Url'), (req, res, next) => {
  const { recipeId } = req.params;
  const { name, ingredient, description, dietary } = req.body;

  let image_Url;

  if (req.file) {
    image_Url = req.file.path.replace(/\\/g, '/').substring(6)
  } else {
    image_Url = "/images/recipe-placeholder.jpg"
  }


  Recipe.findByIdAndUpdate(recipeId, { name, ingredient, description, dietary, image_Url })
    .then(updatedRecipe => res.redirect(`/recipe/${recipeId}`))
    .catch(error => next(error));

});




// TODO : add middleware to limit Normal user
//delete recipe
router.post('/:recipeId/delete', (req, res, next) => {
  const { recipeId } = req.params;
  const ownerId = req.session.user._id;
  Recipe.findByIdAndDelete(recipeId)
    .then(() => res.redirect(`/user/${ownerId}/my-recipes`))
    .catch(error => next(error));

});





//Favorite behavior
router.post('/:recipeId', (req, res, next) => {

  const ownerId = req.session.user._id;
  const newFavorite = {
    currentUser: req.session.user._id,
    favRecipe: req.params.recipeId
  }

  Favorite.find({ favRecipe: { _id: req.params.recipeId }, currentUser: { _id: ownerId } })
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

router.get("/search/:diatery", (req, res, next) => {
  const dietary = req.params.diatery
  Recipe.find()
    .then(recipesArr => {
const dieteryArr = ["lactose intolerance", "gluten intolerance or sensitivity", "vegetarian", "vegan", "kosher", "keto", "diabetes", "dairy-free", "low carb", "food allergies"]


      let recipesFiltered = recipesArr.filter((recipes) => {
        return recipes.dietary.includes(dietary) }) //dietary.substring(0, 1).toUpperCase() + dietary.substring(1)
    res.render("recipe/recipe-search", { recipes: recipesFiltered ,dietary,dieteryArr})
    })
  .catch(error => {
    console.log("error getting a result from DB", error);
  })
})



module.exports = router;