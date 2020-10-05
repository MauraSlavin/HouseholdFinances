module.exports = app => {
    const transactions = require("../controllers/transaction.controller.js");
    console.log("--- In transaction.routes.js --- ");
    var router = require("express").Router();

    router.get("/registerbalances", transactions.getRegisterBalances);
    router.get("/clearedbalances", transactions.getClearedBalances);
    router.get("/:id", transactions.getAccountTransactions);
    router.post("/upload", transactions.postTransactions);

    app.use("/api/transactions", router);
};