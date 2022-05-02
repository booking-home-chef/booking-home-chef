const isLoggedIn = require("../middleware/isLoggedIn");
const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");

const router = require("express").Router();



router.get("/:chefId",(req,res,next)=>{

  User.findById(req.params.chefId)
  .then(chefsDet=>{
    Recipe.find({owner : {_id : req.params.chefId}}) 
    .populate("owner")
    .then((chefsRecipesArr=>{
      res.render("chef/chef-details",{recipes :chefsRecipesArr , chefsDet})
    }))
  })
.catch(e=>console.log((e)))
})












module.exports = router;
