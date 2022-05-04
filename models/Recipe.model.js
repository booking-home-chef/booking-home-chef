const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const recipeSchema = new Schema(
  {
    name: String,
    type: {
        type: [String],
        enum: ["starter", "main dish", "dessert", "cocktail piece"],
    },
    ingredient: String,
    description: String,
    dietary: {
      type: [String],
      enum: ["lactose intolerance", "gluten intolerance or sensitivity", "vegetarian", "vegan", "kosher", "keto", "diabetes", "dairy-free", "low carb", "food allergies","ask the chef"],
      default:"ask the chef"
    },
    image_Url: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comments:{
      type: [String]
    }
  },
  {
    timestamps: true,
  }
);

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;

