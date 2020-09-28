// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
const cors = require("cors");
// const bodyParser = require('body-parser');

// Sets up the Express App
// =============================================================
var app = express();

// Avoid CORS errors
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./app/models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));


// Routes
require("./app/routes/account.routes.js")(app);
require("./app/routes/transaction.routes.js")(app);
require("./app/routes/split.routes")(app);


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});