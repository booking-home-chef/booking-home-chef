const router = require("express").Router();

const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");
const Favorite = require("../models/Favorite.model");




//Set the user as a Chef
router.get("/:userId/settings",(req, res, next)=>{
  const {userId} = req.params
  console.log(userId);
  User.findById(userId)
    .then(userInfo=> {
      console.log(userInfo)
      res.render("user/user-profile-settings", userInfo)
    })
    .catch(err=>console.log(`Error is ${err}`))
})

// let image_Url = req.body.image_Url ? req.body.image_Url : "/image/placeholder.png";

//Set the user as a Chef proccess
router.post("/:userId/settings",(req, res, next)=>{
  let image_Url = req.body.image_Url || "/images/placeholder.png";
  const {userId} = req.params
  const {name,specialities,aboutMe} = req.body;

  User.findByIdAndUpdate(userId,{name,specialities,aboutMe,image_Url})
    .then(userInfo=> {
      console.log(userInfo)
      res.redirect(`/user/${userId}`)
    })
    .catch(err=>console.log(`Error is ${err}`))
})




// TODO : add middleware to limit Normal user
//my recipes
router.get("/:userId/my-recipes",(req,res,next)=>{
  const  userId  = req.params.userId;
  Recipe.find( {owner: {_id: userId}} )
  .then(recipesArr=> res.render("recipe/recipe-list",{recipes : recipesArr,userId}))
  .catch(e=>console.log("error to find  list of recipes",e))
})



 //add to my favorite recipe
router.get('/:userId/my-favorite-recipes',(req, res, next) => {
  const userId = req.params.userId
Favorite.find({ currentUser: {  _id: userId } })
.populate("favRecipe")
.then((favRecipesArr)=>{
  
  res.render("recipe/favorite-recipe-list",{recipes : favRecipesArr,userId})
})
.catch(error => next(error));

})




//create user
router.get("/:userId", (req, res, next) => {
  const { userId } = req.params;
  
  User.findById(userId)
    .then(user => {
      console.log(user);
      res.render("user/user-profile", user);
    })

});







module.exports = router;