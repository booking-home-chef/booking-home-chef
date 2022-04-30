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


// router.get("/:userId/my-recipes",isLoggedIn,(req,res,next)=>{
//   const  userId  = req.params.userId
//   Recipe.find()
//   .populate("owner")
//   .then(recipesArr=>{
    
//     let myRec = recipesArr.filter(recipe =>{
//       Object.hasOwn(recipe, 'owner') ==true
//     })
//     console.log(myRec);


//     // myRec.forEach(recipe=>{
//     //   if(userId == recipe.owner._id){
//     //     res.render("recipe/recipe-list",{recipes : recipesArr})
//     //   } else{
//     //     res.redirect("user/user-profile")
//     //   }
//     // })


//   })
//   .catch(e=>console.log("error to find  list of recipes",e))
// })









module.exports = router;