import React, { useState, Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AccountDataService from"../services/account.service";
import TransactionDataService from"../services/transaction.service";
import Button from "react-bootstrap/Button";

import "./home.css";

import Account from "./Account";
// import account from "../../app/models/account";
// import accounts from "./accounts.json";

const acctIcons = [
    require('./images/CheckingAcctImage.jpg'),
    require('./images/BigBillsImage.jpg'),
    require('./images/DiscCCImage.jpg'),
    require('./images/BackupCCImage.jpg'),
    require('./images/MikeSpendingImage.jpg'),
    require('./images/MauraSpendingImage.jpg')
];

// function Home() {
export default class Home extends Component {
    constructor(props) {
        super(props);
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
        // var clearedBalances = [];
        AccountDataService.getAll()
        .then(response => {
            accounts = response.data
            console.log("accounts retrieved from table:")
            console.log(accounts);
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
                        account.registerBalance = "$ " + parseFloat(registerBalances[index].balance).toLocaleString('en');
                        // account.clearedBalance = clearedBalances[account.id].clearedBalance;
                        account.clearedBalance = "$ 0.00";
                    } else {
                        account.registerBalance = "$ 0.00";
                        account.clearedBalance = "$ 0.00";
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
            <div className="row">
                <div className="col-10 offset-1 text-left">
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
                            />
                        ))}
                    </div>
                </div>
            </div>

        );
    }
}