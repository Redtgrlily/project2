var express = require("express");

// Sets up the Express App
// =============================================================
var app = express();
var bodyParser = require ("body-parser");
var session = require ("express-session");
var passport = require ("./config/passport");
var PORT = process.env.PORT || 5000;

// Requiring our models for syncing
var db = require("./models");

app.use(bodyParser.urlencoded({ extended: false })); //For body parser
app.use(bodyParser.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
