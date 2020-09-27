import React, { useState, useEffect, memo, useMemo } from "react";
import { useTable } from "react-table";
import { Container, Table } from "reactstrap";

import TransactionDataService from "../services/transaction.service";

// code modelled after thewidlarzgroup.com/react-table-7

import "./account.css";
import 'bootstrap/dist/css/bootstrap.min.css';
// import Button from 'react-bootstrap/Button';

const Transactions = memo(props => {

    const account_id = props.match.params.id;
    const nick_name = props.match.params.nickName;

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