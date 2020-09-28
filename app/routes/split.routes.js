module.exports = app => {
    const splits = require("../controllers/split.controller.js");

    var router = require("express").Router();

    router.get("/:id", splits.getSplits);

    app.use("/api/splits", router);
};