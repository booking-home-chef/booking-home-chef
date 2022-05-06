// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();
const isLoggedIn = require("./middleware/isLoggedIn");
const multer = require('multer')

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalized = require("./utils/capitalized");
const projectName = "booking-home-chef";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;
app.use((req, res, next) => {
  res.locals.session = req.session; // allow access to session data from layout.hbs
  req.app.locals.userDetails = req.session.user
  next()
});


// 👇 Start handling routes here
app.use("/", require("./routes/index.routes"));
app.use("/auth", require("./routes/auth.routes"));
app.use("/user",isLoggedIn, require("./routes/user.routes"))
app.use("/chef", require("./routes/chef.routes")) //,isLoggedIn, require("./routes/chef.routes"))
app.use("/recipe",isLoggedIn, require("./routes/recipe.routes"))

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
