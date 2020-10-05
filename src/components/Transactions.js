import React, { useState, useEffect, memo, useMemo } from "react";
import { useTable } from "react-table";
import { Container, Table } from "reactstrap";

// import TransactionDataService from "../services/transaction.service";

// code modelled after thewidlarzgroup.com/react-table-7

import "./account.css";
import 'bootstrap/dist/css/bootstrap.min.css';
// import Button from 'react-bootstrap/Button';

const Transactions = memo(props => {

    const account_id = props.match.params.id;
    const [data, setData] = useState([]);
    
    // useEffect( () => {
    //     console.log("In useEffect");
    //     TransactionDataService.getAccountTransactions(account_id)
    //     .then(response => {
    //         setData(response.data);
    //     })
    //     .catch(e => console.log(e))
    // }, [data]);

    useEffect( () => {
        const doTransFetch = async () => {
            var noSplits = true;
            const response = await fetch(`http://localhost:8080/api/transactions/${account_id}`);
            var transactions = await response.json();
            const copyTransactions = [...transactions];
            transactions = transactions.filter(function( transaction ) {
                return transaction.category !== 'SPLIT';
            });
            copyTransactions.forEach( (copyTransaction, index) => {
                const doSplitFetch = async () => {
                    if (copyTransaction.category === "SPLIT") {
                        noSplits = false;
                        const splitResponse = await fetch(`http://localhost:8080/api/splits/${copyTransaction.id}`);
                        const splits = await splitResponse.json();
                        var newSplit = {};
                        splits.forEach(split => {
                            newSplit = {
                                id: copyTransaction.id,
                                account_id: split.id,
                                trans_date: copyTransaction.trans_date,
                                post_date: copyTransaction.post_date,
                                verified: copyTransaction.verified,
                                amount: split.amount,
                                to_from: copyTransaction.to_from,
                                description: `SPLIT -- Tot: $${copyTransaction.amount};  ${copyTransaction.description}; ${split.description}`,
                                category: split.category,
                                stmt_date: copyTransaction.stmt_date
                            }; // end newSplit object
                            transactions.push(newSplit);
                        });  // end of splits.forEach
                        setData(transactions);
                    }; // end of if category = SPLIT
                }  // asynch doSplitFetch
                doSplitFetch();
            });  // transactions.forEach
            if (noSplits) setData(transactions);
        }
        doTransFetch()
    }, [])


    const columns = useMemo(
        () => [
            {
                Header: 'Trans date',
                accessor: 'trans_date',
            },
            {
                Header: 'Post date',
                accessor: 'post_date',
            },
            {
                Header: 'To or from',
                accessor: 'to_from',
            },
            {
                Header: 'Amount',
                accessor: 'amount',
            },
            {
                Header: 'Description',
                accessor: 'description',
            },
            {
                Header: 'Category',
                accessor: 'category',
            },
            {
                Header: 'Verified?',
                accessor: 'verified',
            },
            {
                Header: 'Statement date',
                accessor: 'stmt_date',
            },
    ],
    []
)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return(
        <div className="border-bottom mt-2">
            <h1 className="text-center">Account Transactions</h1>
            <div>
                <p className="text-center">For account#: {account_id}</p>
                <Container style={{ martinTop: 100 }}>
                    {/* <table {...getTableProps()}> */}
                    <Table bordered hover {...getTableProps()}>
                        <thead>
                            {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                                ))}
                            </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                })}
                                </tr>
                            );
                            })}
                        </tbody>
                    {/* </table> */}
                    </Table>
                </Container>
            </div>
        </div>
    );
    
});

export default Transactions;