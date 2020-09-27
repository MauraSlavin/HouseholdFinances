import React, { useState, useEffect, memo, useMemo } from "react";
import { useTable } from "react-table";
import TransactionDataService from "../services/transaction.service";

// import "./transaction.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
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
        const doFetch = async () => {
            const response = await fetch(`http://localhost:8080/api/transactions/${account_id}`);
            const transactions = await response.json();
            setData(transactions);
        }
        doFetch()
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
                Header: 'Amount',
                accessor: 'amount',
            },
            {
                Header: 'Verified?',
                accessor: 'verified',
            },
            {
                Header: 'To or from',
                accessor: 'to_from',
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
            <h1>Account Transactions</h1>
            <div>
                <p>Transactions for the account go here.</p>
                <p>For account #: {account_id}</p>

                <table {...getTableProps()}>
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
                </table>
            </div>
        </div>
    );
    
});

export default Transactions;