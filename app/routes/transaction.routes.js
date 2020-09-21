module.exports = app => {
    const transactions = require("../controllers/transaction.controller.js");

    var router = require("express").Router();

    router.get("/registerbalances", transactions.getRegisterBalances);
    router.get("/clearedbalances", transactions.getClearedBalances);
    router.get("/:id", transactions.getAccountTransactions);

    app.use("/api/transactions", router);
};