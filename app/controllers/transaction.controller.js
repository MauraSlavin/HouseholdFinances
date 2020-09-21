const db = require('../models');
const Transaction = db.transactions;
// const Op = db.Sequelize.Op;

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

exports.getClearedBalances = (req, res) => {
    Transaction.getClearedBalances()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred retrieving cleared balances."
        });
    });
}