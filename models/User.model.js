const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required:true,
      unique:true,
    },
    password:{
      type: String,
      required:true,
    },
    name : String,
    specialities: String,
    image_Url:String,
    catchPhrase:String,
    aboutMe: String,
    isProfilePublic : Boolean,
    comments:{
      type: [String]
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
