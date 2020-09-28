const db = require('../models');
const Split = db.splits;
// const Op = db.Sequelize.Op;

exports.getSplits = (req, res) => {
    const id = req.params.id;
    console.log("In split.controller.js - getSplits");
    
    Split.getSplits(id)
    .then(data => {
        console.log("data:");
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || `Error occurred retrieving splits for transaction with id of ${id}.`
        });
    });
}