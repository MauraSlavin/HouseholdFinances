const db = require('../models');
const Transaction = db.transactions;
// const DbFunctions = db.dbFunctions;
const Op = db.Sequelize.Op;

exports.getRegisterBalances = (req, res) => {
    Transaction.getRegisterBalances()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred retrieving register balances."
        });
    });
};