var db = require("../models");

module.exports = function(app) {
    app.get("/api/accounts", function(req, res) {
        db.Account.findAll()
        .then(function(dbAccount) {
            res.json(dbAccount);
        });
    });
// var router = require("express").Router();

// router.get("/", accounts.findAll);



// app.use("api/accounts", router);
};