import React, { useState, Component } from "react";
import TransactionDataService from "../services/transaction.service";

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
            // account_id: this.props.match.params.id
        };
    }

    componentDidMount() {
        this.retrieveTransactions(this.props.match.params.id);
        console.log("in componentDidMount... this.state.transactions:");
        console.log(this.state.transactions);
        console.log("in componentDidMount... this.state:");
        console.log(this.state);
    }

    retrieveTransactions(account_id) {
        console.log("In retrieveTransactions - account_id:");
        console.log(account_id);
        var transactions = [];

        TransactionDataService.getAccountTransactions(account_id)
        .then(response => {
            console.log("response.data:");
            console.log(response.data);
            transactions = response.data;
            this.setState({
                transactions: transactions
            });
        })
        .catch(e => {
            console.log(e);
        });
        // const transactions = [
        //     {
        //         id: "1",
        //         account_id: "1",
        //         trans_date: "08/01/2020",
        //         post_date: "08/02/2020",
        //         verified: true,
        //         amount: 100.00,
        //         to_from: "Start",
        //         description: "Beginning balance",
        //         category: "Misc",
        //         stmt_date: "08/01/2020"
        //     },
        //     {
        //         id: "2",
        //         account_id: "1",
        //         trans_date: "08/15/2020",
        //         post_date: "08/15/2020",
        //         verified: true,
        //         amount: 33.33,
        //         to_from: "Eversource",
        //         description: "Electric bill",
        //         category: "Utilities",
        //         stmt_date: "08/01/2020"
        //     }
        // ];

        
        // this.setState({
        //     transactions: transactions
        // });
    }


    render() {
        const { transactions } = this.state;
        console.log("transactions:");
        console.log(transactions);
        console.log("this.props:");
        console.log(this.props);
        var Amount, TransDate, PostDate, Verified, ToFrom, Description, Category, StmtDate;
        // if (this.state.transactions.length > this.props.match.params.id) {
        //     TransDate = this.state.transactions[this.props.match.params.id].trans_date;
        //     PostDate = this.state.transactions[this.props.match.params.id].post_date;
        //     Verified = this.state.transactions[this.props.match.params.id].verified.toString();
        //     ToFrom = this.state.transactions[this.props.match.params.id].to_from;
        //     Description = this.state.transactions[this.props.match.params.id].description;
        //     Category = this.state.transactions[this.props.match.params.id].category;
        //     StmtDate = this.state.transactions[this.props.match.params.id].stmt_date;
        // } else {
        //     TransDate = new Date(1900, 0, 1).toString();
        //     PostDate = new Date(1900, 0, 1).toString();
        //     Verified = false.toString();
        //     ToFrom = "";
        //     Description = "";
        //     Category = "";
        //     StmtDate = new Date(1900, 0, 1).toString();
        // };
        if (this.state.transactions.length > 1) {
            Amount = this.state.transactions[1].amount.toString();
            TransDate = this.state.transactions[1].trans_date;
            PostDate = this.state.transactions[1].post_date;
            Verified = this.state.transactions[1].verified.toString();
            ToFrom = this.state.transactions[1].to_from;
            Description = this.state.transactions[1].description;
            Category = this.state.transactions[1].category;
            StmtDate = this.state.transactions[1].stmt_date;
        } else {
            Amount = "0.00";
            TransDate = new Date(1900, 0, 1).toString();
            PostDate = new Date(1900, 0, 1).toString();
            Verified = false.toString();
            ToFrom = "";
            Description = "";
            Category = "";
            StmtDate = new Date(1900, 0, 1).toString();
        
        };

        return (

            <div className="border-bottom mt-2">
                <h1> Account Transactions</h1>
                <div>
                    <p>Transactions for the account go here.</p>
                    <p>For account #: {this.props.match.params.id}</p>
                    <p>Amount: {Amount}</p>
                    <p>Transaction Date: {TransDate}</p>
                    <p>Post Date: {PostDate}</p>
                    <p>Verified: {Verified}</p>
                    <p>To or From: {ToFrom}</p>
                    <p>Description: {Description}</p>
                    <p>Category: {Category}</p>
                    <p>Statement Date: {StmtDate}</p>

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