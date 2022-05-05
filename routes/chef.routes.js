// const isLoggedIn = require("../middleware/isLoggedIn");
const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");

const router = require("express").Router();

router.get("/chef-list", (req, res, next) => {
  User.find({ isProfilePublic: true })
    .then(chefArr => {
      res.render("chef/chef-lists", { chefs: chefArr })
    })
    .catch(e => console.log("error to find  list of chefs", e))
})


router.get("/:chefId", (req, res, next) => {
  let member = true;
  
  if (req.session.user === undefined){

  User.findById(req.params.chefId)
  .then(chefsDet => {
    chefsDet.comments = chefsDet.comments.reverse();
    Recipe.find({ owner: { _id: req.params.chefId } })
      .populate("owner")
      .then((chefsRecipesArr => {
        res.render("chef/chef-details", { recipes: chefsRecipesArr, chefsDet})
      }))
  })
  .catch(e => console.log((e)))
  } else {
    User.findById(req.params.chefId)
  .then(chefsDet => {
    chefsDet.comments = chefsDet.comments.reverse();
    Recipe.find({ owner: { _id: req.params.chefId } })
      .populate("owner")
      .then((chefsRecipesArr => {
        res.render("chef/chef-details", { recipes: chefsRecipesArr, chefsDet, member})
      }))
  })
  .catch(e => console.log((e)))
  }
})


//Recipe comment section
router.post("/:chefId", (req, res, next)=>{
  const chefId = req.params.chefId
  const comment = `${req.session.user.name}: ${req.body.comments}`

  User.findByIdAndUpdate(chefId, {$push: {comments:comment}})
    .then(chefCommented => {
      res.redirect(`/chef/${req.params.chefId}`)
    })
    .catch(e => console.log("error not added to the DB", e))
})









module.exports = router;
