const isLoggedIn = require("../middleware/isLoggedIn");
const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");

const router = require("express").Router();

router.get("/chef-list", (req, res, next) => {
  let chefsPages;


  User.find({ isProfilePublic: true })
    .then(chefArr => {
      res.render("chef/chef-lists", { chefs: chefArr })
    })
    .catch(e => console.log("error to find  list of chefs", e))
})


router.get("/:chefId", (req, res, next) => {

  User.findById(req.params.chefId)
    .then(chefsDet => {
      Recipe.find({ owner: { _id: req.params.chefId } })
        .populate("owner")
        .then((chefsRecipesArr => {
          res.render("chef/chef-details", { recipes: chefsRecipesArr, chefsDet })
        }))
    })
    .catch(e => console.log((e)))
})












module.exports = router;
