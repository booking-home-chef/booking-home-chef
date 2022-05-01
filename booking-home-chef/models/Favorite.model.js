const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const favoriteSchema = new Schema(
  {
   favRecipe:{
    type : Schema.Types.ObjectId,
    ref: "Recipe"
  },
  currentUser:{
    type : Schema.Types.ObjectId,
    ref: "User"
  }
  },
  {
    timestamps: true,
  }
);

const Favorite = model("Favorite", favoriteSchema);

module.exports = Favorite;

