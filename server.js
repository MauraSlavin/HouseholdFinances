// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
console.log("1");
// Sets up the Express App
// =============================================================
var app = express();
console.log("2");
var PORT = process.env.PORT || 8080;
console.log("3");

// Requiring our models for syncing
var db = require("./models");
console.log("4");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
console.log("5");

// Static directory
app.use(express.static("public"));
console.log("6");

// Routes
// =============================================================
// require("./routes/html-routes.js")(app);
// require("./routes/author-api-routes.js")(app);
// require("./routes/post-api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});