const router = require("express").Router();

const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const Favorite = require("../models/Favorite.model");



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
 
    res.render("recipe/recipe-list",{recipes : recipesArr})
  })
  .catch(e=>console.log("error to find  list of recipes",e))
})




// //add to my favorite recipe
router.get('/:userId/my-favorite-recipes',isLoggedIn, (req, res, next) => {
Favorite.find()
.populate("favRecipe")
.then((favRecipesArr)=>{
  console.log(favRecipesArr);
  res.render("recipe/favorite-recipe-list",{recipes : favRecipesArr})
})
.catch(error => next(error));

})





// router.post('/:userId/my-favorite-recipes',isLoggedIn, (req, res, next) => {

//   const newFavorite={
//     currentUser : req.params.userId,
//     favRecipe : req.body.favRecipe
//   }



//   Favorite.find( {favRecipe: {_id: req.body.favRecipe}})
//   .then(myFavRecipeArr =>{
//     // console.log(myFavRecipeArr);
//     if(!myFavRecipeArr.length){
//       return Favorite.create(newFavorite)
//     }else{
//       console.log(myFavRecipeArr[0]._id);
//       return Favorite.findByIdAndDelete(myFavRecipeArr[0]._id)
//     }
//   })
//   .then(()=>{
//     res.redirect(`/recipe`)
//   })
//     .catch(error => next(error));

// });





module.exports = router;