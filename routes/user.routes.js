const router = require("express").Router();

const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");
const Favorite = require("../models/Favorite.model");
const uploadUserProfile = require("../upload/uploadUserProfile");




//Set the user as a Chef
router.get("/:userId/settings", (req, res, next) => {
  if (req.session.user.userId === req.params.userId){
  const { userId } = req.params
  console.log(userId);
  User.findById(userId)
    .then(userInfo => {
      console.log(userInfo)
      res.render("user/user-profile-settings", userInfo)
    })
    .catch(err => console.log(`Error is ${err}`))
  } else {
    res.redirect("/")
  }
});


//Set the user as a Chef proccess
router.post("/:userId/settings", uploadUserProfile.single('image_Url'), (req, res, next) => {
  const { userId } = req.params
  const { name, specialities, aboutMe , catchPhrase} = req.body;

  let image_Url;

  if (req.file) {
    image_Url = req.file.path.replace(/\\/g, '/').substring(6)
  } else {
    image_Url = "/images/placeholder.png"
  }


  User.findByIdAndUpdate(userId, { name, specialities, aboutMe, catchPhrase, image_Url })
    .then(userInfo => {
      req.session.user.image_Url = image_Url;
      console.log(userInfo)
      res.redirect(`/user/${userId}`)
    })
    .catch(err => console.log(`Error is ${err}`))
})




// TODO : add middleware to limit Normal user
//my recipes
router.get("/:userId/my-recipes", (req, res, next) => {
  const userId = req.params.userId;
  Recipe.find({ owner: { _id: userId } })
    .then(recipesArr => res.render("recipe/my-recipe-list", { recipes: recipesArr, userId }))
    .catch(e => console.log("error to find  list of recipes", e))
})



//add to my favorite recipe
router.get('/:userId/my-favorite-recipes', (req, res, next) => {
  if (req.session.user.userId === req.params.userId){
  const userId = req.params.userId
  Favorite.find({ currentUser: { _id: userId } })
    .populate("favRecipe")
    .then((favRecipesArr) => {
      res.render("recipe/favorite-recipe-list", { favRecipesArr: favRecipesArr, userId })
    })
    .catch(error => next(error));
  } else {
    res.redirect("/")
  }
})




//create user
router.get("/:userId", (req, res, next) => {
  if (req.session.user.userId === req.params.userId){
  const { userId } = req.params;
  User.findById(userId)
    .then(user => {
      console.log(user);
      res.render("user/user-profile", user);
    })
  } else {
    res.redirect("/")
  }
});







module.exports = router;