import React, { useState, Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AccountDataService from "../services/account.service";
import TransactionDataService from "../services/transaction.service";
// import Button from "react-bootstrap/Button";

import "./home.css";

import Account from "./Account";
// next line is to test AccountTransactions component
// import AccountTransactions from "./AccountTransactions";
// import { getAccountTransactions } from "../../app/controllers/transaction.controller";
// import { Transaction } from "sequelize/types";
// import account from "../../app/models/account";
// import accounts from "./accounts.json";

const acctIcons = [
    require('./images/CheckingAcctImage.png'),
    require('./images/BigBillsImage.png'),
    require('./images/DiscCCImage.png'),
    require('./images/BackupCCImage.png'),
    require('./images/MikeSpendingImage.png'),
    require('./images/MauraSpendingImage.png'),
    require('./images/CashImage.png'),
    require('./images/DefaultAcctImage.png')
];

// function Home() {
export default class Home extends Component {
    constructor(props) {
        super();
        this.retrieveAccountInfo = this.retrieveAccountInfo.bind(this);

        this.state = {
            accounts: []
        };
    }

    componentDidMount() {
        this.retrieveAccountInfo();
    }

    retrieveAccountInfo() {
        var accounts = [];
        var registerBalances = [];
        var clearedBalances = [];

        AccountDataService.getAll()
        .then(response => {
            accounts = response.data
            // console.log("accounts retrieved from table:")
            // console.log(accounts);
        })
        .then(response => {
            TransactionDataService.getRegisterBalances()
            .then(response => {
                registerBalances = response.data;
                const accountIdsWithBalances = registerBalances.map(x => x.account_id);

                accounts.forEach( account => {
                   
                    if (accountIdsWithBalances.includes(account.id)) {
                        // Find index of registerBalances for this account
                        const index = registerBalances.map(e => e.account_id).indexOf(account.id);
                        // Puts ","s in.
                        account.registerBalance = parseFloat(registerBalances[index].balance).toFixed(2).toLocaleString('en');
                    } else {
                        account.registerBalance = "0.00";
                    };
                });
                this.setState({
                    accounts: accounts
                });

            })
            .catch(e => {
                console.log(e);
            });
        })
        .then(response => {
            TransactionDataService.getClearedBalances()
            .then(response => {
                clearedBalances = response.data;
                const accountIdsWithClearedBalances = clearedBalances.map(x => x.account_id);
                
                accounts.forEach( account => {
                    if (accountIdsWithClearedBalances.includes(account.id)) {
                        const index = clearedBalances.map(e => e.account_id).indexOf(account.id);
                        account.clearedBalance = parseFloat(clearedBalances[index].balance).toFixed(2).toLocaleString('en');
                    } else {
                        account.clearedBalance = "0.00";
                    };
                });
                this.setState({
                    accounts: accounts
                });
                
            })
            .catch(e => {
                console.log(e);
            });
        })
        .catch(e => {
            console.log(e);
        });
    }


    render() {
        const { accounts } = this.state;
        return (
            // next line temp to test AccountTransactions component
            <div> 
                <div className="row">
                    <div className="col-11 offset-1 text-left">
                        <div className="icons">
                            {accounts.map((account, index) => (
                                <Account
                                    key={index}
                                    nickName={account.nick_name}
                                    purpose={account.purpose}
                                    image={acctIcons[index]}
                                    alt={account.alt}
                                    registerBalance={account.registerBalance}
                                    clearedBalance={account.clearedBalance}
                                    account_id={account.account_id}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}