import React, {useState, Component } from "react";
import TransactionDataService from "../services/transaction.service";

export default function AccountTransactions(props) {
    return <h1> Account #: {props.acct_id}</h1>
}