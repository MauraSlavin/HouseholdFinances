module.exports = app => {
    const accounts = require("../controllers/account.controller.js");

    var router = require("express").Router();

    router.get("/", accounts.findAll);



    app.use("/api/accounts", router);
};