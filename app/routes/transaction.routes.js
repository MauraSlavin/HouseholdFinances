module.exports = app => {
    const transactions = require("../controllers/transaction.controller.js");

    var router = require("express").Router();

    router.get("/registerbalances", transactions.getRegisterBalances);

    app.use("/api/transactions", router);
};