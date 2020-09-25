import React, { useState, Component } from "react";
// import TransactionDataService from "../services/transaction.service";

// import "./transaction.css";

// import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
// import { renderIntoDocument } from "react-dom/test-utils";

export default class Transactions extends Component {
    constructor(props) {
        super();
        this.retrieveTransactions = this.retrieveTransactions.bind(this);

        this.state = {
            transactions: []
        };
    }

    componentDidMount() {
        this.retrieveTransactions();
    }

    retrieveTransactions() {
        const transactions = [
            {
                id: "1",
                account_id: "1",
                trans_date: "08/01/2020",
                post_date: "08/02/2020",
                verified: true,
                amount: 100.00,
                to_from: "Start",
                description: "Beginning balance",
                category: "Misc",
                stmt_date: "08/01/2020"
            },
            {
                id: "2",
                account_id: "1",
                trans_date: "08/15/2020",
                post_date: "08/15/2020",
                verified: true,
                amount: 33.33,
                to_from: "Eversource",
                description: "Electric bill",
                category: "Utilities",
                stmt_date: "08/01/2020"
            }
        ];

        
        this.setState({
            transactions: transactions
        });
    }


    render() {
        const { transactions } = this.state;

        return (

            <div className="border-bottom mt-2">
                <h1> Account Transactions</h1>
                <div>
                    <p>Transactions for the account go here.</p>

                    {/* <div className="row">
                        <h4><u>{props.nickName}</u></h4>
                        <div><span className="small">{props.purpose}</span></div>
                    </div>

                    <div className="row">
                        <button className="acct-icon btn col-3 p-0"
                            onClick={renderTransactionsPage} >
                            <img className="acct-icon" src={props.image} alt={props.alt} />
                        </button>
                        <div className="col-9">
                            <div className="row">
                                <div className="col-7">
                                    <br></br>
                                    Register Bal:
                                    Cleared Bal:
                                </div>
                                <div className="col-5 right mx-0">
                                    <br></br>
                                    $ {props.registerBalance}
                                    <br></br>
                                    $ {props.clearedBalance}
                                </div>
                            </div>
                        </div> */}

                    {/* </div> */}
                </div>
            </div>

        );
    }
}