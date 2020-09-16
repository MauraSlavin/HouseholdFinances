const db = require('../models');
// const Account = db.accounts;
const Account = db.accounts;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    // const nick_name = req.query.nick_name;
    // console.log("Account (in account.controller.js, findAll) before findAll:");
    // console.log(Account);
    console.log("keys of 'res' (in account.controller.js, findAll) before findAll:");
    console.log(Object.keys(res));
    console.log("keys of 'req' (in account.controller.js, findAll) before findAll:");
    console.log(Object.keys(req));
    console.log("req.query' (in account.controller.js, findAll) before findAll:");
    console.log(req.query);
    // console.log("req");
    // console.log(req);
    // console.log("'res.data' (in account.controller.js, findAll) before findAll:");
    // console.log(res.data);
    console.log("'res.outputData' (in account.controller.js, findAll) before findAll:");
    console.log(res.outputData);
    Account.findAll()
    .then(data => {
        console.log("data:");
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred reading accounts from Accounts table."
        });
    });
};