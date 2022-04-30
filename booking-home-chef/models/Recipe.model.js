const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const recipeSchema = new Schema(
  {
   name: String,
   ingredient:String,
   description : String,
   dietary: {
     type: [String],
     enum:["Lactose intolerance","Gluten intolerance or sensitivity","Vegetarian","Vegan","Kosher","Keto","Diabetes","Dairy-free","Low carb","Food allergies"]
   }
  },
  {
    timestamps: true,
  }
);

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
           