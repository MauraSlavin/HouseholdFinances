import React, { useState, Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AccountDataService from"../services/account.service";
import Button from "react-bootstrap/Button";

import "./home.css";

import Account from "./Account";
import accounts from "./accounts.json";

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
        // this.accounts = this.accounts.bind(this);
        this.retrieveAccounts = this.retrieveAccounts.bind(this);
        // const [show, setShow] = useState(false);
        // const handleClose = () => setShow(false);
        // const handleShow = () => setShow(true);

        this.state = {
            accounts: []
        };
    }

    componentDidMount() {
        this.retrieveAccounts();
    }

    retrieveAccounts() {
        AccountDataService.getAll()
        .then(response => {
            this.setState({
                accounts: response.data
            });
            console.log(response.data);
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
                                nickName={account.nickName}
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