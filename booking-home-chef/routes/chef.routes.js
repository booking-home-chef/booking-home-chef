const isLoggedIn = require("../middleware/isLoggedIn");
const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");

const router = require("express").Router();


//get chef details
router.get("/:chefId",(req,res,next)=>{
  User.findById(req.params.chefId)
    .then(chefDetails=> {
      console.log(chefDetails);
      res.render("chef/chef-details",{chef:chefDetails})
    })
    .catch()
})


module.exports = router;
