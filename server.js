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
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Slavin Household Finances."});
});

require("./app/routes/account.routes.js")(app);
// =============================================================
// require("./routes/html-routes.js")(app);
// require("./routes/author-api-routes.js")(app);
// require("./routes/post-api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});