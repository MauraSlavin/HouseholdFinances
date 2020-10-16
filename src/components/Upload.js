import React, { useState } from 'react';
import Select from 'react-dropdown-select';
import Papa  from 'papaparse';
import TransactionDataService from "../services/transaction.service";
import './Upload.css';


// const Upload = memo(props => {
export default function Upload(props) {
    const [csvfile, setCsvFile] = useState(undefined);
    // const [showUploadButton, setShowUploadButton] = useState(false);
    const [showChooseFile, setShowChooseFile] = useState(true);
    const [showMappings, setShowMappings] = useState(false);
    const [options, setOptions] = useState([]);
    const [message, setMessage] = useState("");
    const [mapKeys, setMapKeys] = useState([]);
    const [rawTransactions, setRawTransactions] = useState([]);
    const account_id = props.match.params.id;
    const nick_name = props.match.params.nick_name;
    // const transForDB = [];
    var fileKeys = [];
    const dbKeys = ["trans_date", "post_date", "verified", "amount", "to_from", "description", "category", "stmt_date", "debit/credit"];
    console.log("--- In Upload");
    
    function handleFileChange(event) {
        console.log("--- In handleFileChange");
        var csvfile = getFileName(event);
        readFile(csvfile);
    };
    
    function getFileName(event) {
        console.log("--- In getFileName");
        var filename = "(None chosen)";
        var fileextension = '';
        
        if (event.target.files !== undefined && event.target.files.length > 0) {
            filename = event.target.files[0].name;
            fileextension = filename.split('.').pop();
        };
        
        if (fileextension !== 'csv') {
            alert("Must be a CSV file.  " + filename + " is not.");
            setCsvFile(undefined);
            // setShowUploadButton(false);
            setMessage("Must be a CSV file.  " + filename + " is not.  Please choose another file.");
        } else {
            setCsvFile(event.target.files[0]);
            setShowMappings(true);
            setShowChooseFile(false);
            setMessage("Choose columns from file for each database field.  When done, click 'Upload Transactions' to write the transactions to the database.");
        };
        
        return event.target.files[0];
        
    };
    
    function readFile(csvfile) {
        console.log("--- In readFile");
        var results = Papa.parse(csvfile, {
            complete: extractKeysAndTransactions,
            header: true
        });
    };
    
    
    function extractKeysAndTransactions(result) {
        console.log("--- In extractKeysAndTransactions");
        // go through array in reverse order, so index in result.errors is correct.
        // remove invalid transaction records
        for (var i = result.errors.length-1; i >= 0; i--) {
            result.data.splice(result.errors[i].row, 1);
        };
        
        // const transForDB = result.data.filter(trans => trans.Amount !== "");
        var transactions = result.data.filter(trans => trans.Amount !== "");
        setRawTransactions(transactions);
        
        fileKeys = Object.keys(transactions[0]);
        
        setMapKeys(fileKeys);
        // length of mapkeys should equal length of dbKeys
        // dbKeys.forEach((key, index) => {
        //     mapKeys[index] = fileKeys[index];
        // });

        var option;
        fileKeys.forEach(fileKey => {
            
            if (fileKey !== "account_id") {
                option = {
                    label: fileKey,
                    value: fileKey
                };

                options.push(option);
            }
            
        });
        options.push( {label: "Null", value: null});  // "null" is always an option
        setOptions(options);

        // var stmt_date;
        // var formatForDB = [];
        
        // transForDB.forEach(trans => {
            
        //     stmt_date = new Date(trans["Stmt Date"]);
            
        //     var DBtrans = {
        //         account_id: account_id,
        //         trans_date: new Date(trans.Date),
        //         post_date: (trans.Date !== "") ? new Date(trans.Date) : null,
        //         verified: (trans["Stmt Date"] !== null) ? "Yes" : "",
        //         amount: (trans["Transaction Type"] === 'debit') ? 0-trans.Amount : trans.Amount,
        //         to_from: trans.Description,
        //         description: trans.Notes,
        //         category: trans.Category,
        //         stmt_date: new Date(stmt_date.getFullYear(), stmt_date.getMonth(), 1),
        //     }
        //     formatForDB.push(DBtrans);
        // });
        
        // TransactionDataService.postTransactions(formatForDB)
        // .then(response => {
        //     setMessage(`${formatForDB.length} transactions uploaded to the database.`);
        // })
        // .catch(e => {
        //     console.log(e);
        // });
    };

    function handleMapChange(index, value) {
        console.log("--- in handleMapChange");
        mapKeys[index] = value[0].value;
        setMapKeys(mapKeys);
    };

    function updateData() {
        console.log("--- In updateData");

        var formatForDB = [];
        var DBtrans = {
            account_id: account_id,
            trans_date: "",
            post_date: "",
            verified: "",
            amount: 0.00,
            to_from: "",
            description: "",
            category: "",
            stmt_date: ""
        };
        
        rawTransactions.forEach(trans => {
            
            // var dbKeys = ["trans_date", "post_date", "verified", "amount", "to_from", "description", "category", "stmt_date", "debit/credit"];
            const transDateIndex = 0;
            const postDateIndex = 1;
            const verifiedIndex = 2;
            const amountIndex = 3;
            const toFromIndex = 4;
            const descriptionIndex = 5;
            const categoryIndex = 6;
            const stmtDateIndex = 7;
            const debitCreditIndex = 8; // used to calculate amount, not actually in database.

            var DBtrans = {
                account_id: account_id,
                trans_date: getDate(trans, transDateIndex),
                post_date: getDate(trans, postDateIndex),
                verified: getVerified(trans, verifiedIndex, stmtDateIndex),
                amount: getAmount(trans, amountIndex, debitCreditIndex),
                to_from: getTextField(trans, toFromIndex),
                description: getTextField(trans, descriptionIndex),
                category: getTextField(trans, categoryIndex),
                stmt_date: getStmtDate(trans, stmtDateIndex),
            };

            formatForDB.push(DBtrans);

            // console.log("formatForDB:");
            // formatForDB.forEach(x => {
            //     console.log("   trans_date: " + x.trans_date);
            //     console.log("   post_date: " + x.post_date);
            //     console.log("   verified: " + x.verified);
            //     console.log("   amount: " + x.amount);
            //     console.log("   to_from: " + x.to_from);
            //     console.log("   description: " + x.description);
            //     console.log("   category: " + x.category);
            //     console.log("   stmt_date: " + x.stmt_date);
            // });
        });
        
        TransactionDataService.postTransactions(formatForDB)
        .then(response => {
            setMessage(`${formatForDB.length} transactions uploaded to the database.`);
        })
        .catch(e => {
            console.log(e);
            setMessage("Writing transactions to Transactions table in database failed.");
        });
    };

    function getDate(transaction, index) {
        if (mapKeys[index] === null) {
            return null;
        } else {
            return new Date(transaction[mapKeys[index]]);
        };
    };
    
    function getVerified(transaction, verifiedIndex, stmtDateIndex) {
        if (mapKeys[verifiedIndex] === null) {
            const stmtDate = getStmtDate(transaction, stmtDateIndex);
            return (stmtDate !== null && Object.prototype.toString.call(stmtDate) === "[object Date]" && !isNaN(stmtDate.getTime())) ? "Yes" : "";
        } else {
            // verified field is 3 characters long
            return transaction[mapKeys[verifiedIndex]].substring(0,3);
        };
    };

    function getAmount(transaction, amtIndex, debitCreditIndex) {
        if (transaction[mapKeys[amtIndex]] === null) {
            return 0;
        } else {
            if (mapKeys[debitCreditIndex] === null || transaction[mapKeys[debitCreditIndex]] === 'credit') {
                return parseFloat(transaction[mapKeys[amtIndex]]);
            } else {
                return 0-parseFloat(transaction[mapKeys[amtIndex]]);
            };
        };
    };

    function getTextField(transaction, index) {
        if (mapKeys[index] === null) {
            return null;
        };

        return transaction[mapKeys[index]];
    };

    function getStmtDate(transaction, index) {
        if (mapKeys[index] === null) {
            return null;
        };

        const stmt_date = new Date(transaction[mapKeys[index]]);
        return new Date(stmt_date.getFullYear(), stmt_date.getMonth(), 1);
        
    };

    return (
        <div>
            <h1 className="text-center">
                Upload transactions for 
            </h1>
            <h1 className="text-center">
                <u className="text-success">{`${nick_name}`}</u> account.
            </h1>
            <p className = "text-center mx-3">Click "Choose file" to choose a CSV file to upload transactions from.  
                After a CSV file has been chosen, choose which columns from the file each database field maps to, then click 'Upload Transactions' to upload the transactions.</p>
            <br />
            <br />
            <p className="text-danger bg-warning text-center"><strong>{message}</strong></p>
            <div className="row">
                <div className="col-12 text-center">
                    { showChooseFile ?
                        <input
                            className="csv-input ml-5"
                            type="file"
                            name = "file"
                            placeholder = {null}
                            onChange = {handleFileChange}
                        />
                    :
                        <h3>Importing from file: {csvfile.name}</h3>
                    }
                </div>
            </div>
            <br />

            <div className="row">
                <div className="col-6">
                    { showMappings ?
                        <div>
                            <div className="row text-right mt-2 ml-1">
                                <div className="col-12 map-height px-4">
                                    <u className="font-weight-bold" >Database Field</u>
                                </div>
                            </div>
                            {dbKeys.map((dbKey, index) => (
                                <div className="row map-height text-right" key={index}>
                                    <div className="col-12" key={index}>                        
                                        <div className="mx-2 px-1" key={index}>
                                            {dbKey}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    : null
                    }
                </div>

                <div className="col-6">
                    { showMappings ?
                        <div>
                            <div className="row text-left mt-2 ml-1">
                                <div className="col-12 file-col-hdr">
                                    <u className="font-weight-bold" >File column</u>
                                </div>
                            </div>
                            {dbKeys.map((dbKey, index) => (
                                <div className="row map-height" key={index}>
                                    <div className="col-12">
                                        <div className="mx-2">
                                            <Select
                                                options={options}
                                                placeholder={mapKeys[index]}
                                                // placeholder={options[index].label}
                                                // placeholder={`Select field for ${dbKey}.`}
                                                onChange={(value) => handleMapChange(index, value)}
                                                closeOnSelect={true}
                                                direction={"auto"}
                                                dropdownPosition={"auto"}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    : null
                    }
                </div>

 
            </div> {/* of row */}
            <br />

            <div className="row">
                <div className="col-12 text-center">
                    { showMappings ?
                        <button className="m-5" onClick={updateData}>Upload transactions</button>
                        : null
                    }
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    { false ?
                        {mapKeys}
                        : null
                    }
                </div>
            </div>

        </div>
    );
}
