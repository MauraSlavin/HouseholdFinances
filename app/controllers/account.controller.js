const db = require('../models');
const Account = db.accounts;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    Account.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred reading accounts from Accounts table."
        });
    });

};