import React, { useState } from 'react';
import Papa  from 'papaparse';
import TransactionDataService from "../services/transaction.service";
import Mapping from "./Mappings";

export default function Upload(props) {
    const [csvfile, setCsvFile] = useState(undefined);
    const [showUploadButton, setShowUploadButton] = useState();
    const [message, setMessage] = useState("");
    const [fileKeys, setFileKeys] = useState([]);
    const account_id = props.match.params.id;
    const nick_name = props.match.params.nick_name;
    
    function handleFileChange(event) {
        var csvfile = getFileName(event);
        var formatForDB = importCSV(csvfile);
    };
    
    function getFileName(event) {
        var filename = "(None chosen)";
        var fileextension = '';
        
        if (event.target.files !== undefined && event.target.files.length > 0) {
            filename = event.target.files[0].name;
            fileextension = filename.split('.').pop();
        };
        
        if (fileextension !== 'csv') {
            alert("Must be a CSV file.  " + filename + " is not.");
            setCsvFile(undefined);
            setShowUploadButton(false);
            setMessage("Must be a CSV file.  " + filename + " is not.  Please choose another file.");
        } else {
            setCsvFile(event.target.files[0]);
            setShowUploadButton(true);
            setMessage("Choose columns from file for each database field.  When done, click 'Upload Transactions'.");
        };

        return csvfile;
    };

    function importCSV(csvfile) {
        var formatForDB = [];
        var results = Papa.parse(csvfile, {
            complete: updateData,
            header: true
        });
        return formatForDB;
    };
    
    function updateData(result) {
        // go through array in reverse order, so index in result.errors is correct.
        // remove invalid transaction records
        for (var i = result.errors.length-1; i >= 0; i--) {
            result.data.splice(result.errors[i].row, 1);
        };
        
        const transForDB = result.data.filter(trans => trans.Amount !== "");

        var stmt_date;
        var formatForDB = [];
        console.log("transForDB:");
        console.log(transForDB);
        var fileKeys = Object.keys(transForDB[0]);
        console.log("keys in CSV file:");
        console.log(fileKeys);
        setFileKeys(fileKeys);

        
        transForDB.forEach(trans => {

            stmt_date = new Date(trans["Stmt Date"]);

            var DBtrans = {
                account_id: account_id,
                trans_date: new Date(trans.Date),
                post_date: (trans.Date != "") ? new Date(trans.Date) : null,
                verified: (trans["Stmt Date"] != null) ? "Yes" : "",
                amount: (trans["Transaction Type"] == 'debit') ? 0-trans.Amount : trans.Amount,
                to_from: trans.Description,
                description: trans.Notes,
                category: trans.Category,
                stmt_date: new Date(stmt_date.getFullYear(), stmt_date.getMonth(), 1),
            }
            formatForDB.push(DBtrans);
        });

        return formatForDB;
    };

    function writeToTransactions(formatForDB) {
        TransactionDataService.postTransactions(formatForDB)
        .then(response => {
            setMessage(`${formatForDB.length} transactions uploaded to the database.`);
        })
        .catch(e => {
            console.log(e);
        });
    };

    return (
        <div>
        <h1 className="text-center">
            Upload transactions for <u className="text-success">{`${nick_name}`}</u>
        </h1>
        <h3 className = "text-center">Click "Choose file" to choose a CSV file to upload transactions from.  
            After a CSV file has been chosen, an 'Upload files' button will appear to allow you to upload transactions.</h3>
        <br />
        <br />
        <p className="text-danger bg-warning text-center"><strong>{message}</strong></p>
        <div className="row">
            <div className="col-2 offset-4">
                <input
                    className="csv-input ml-5"
                    type="file"
                    name = "file"
                    placeholder = {null}
                    onChange = {handleFileChange}
                />
                <br />

                { showUploadButton ?
                    <div>
                        <Mapping
                            fileKeys={fileKeys} 
                        />
                        <button className="m-5" onClick={importCSV}>Upload transactions</button>
                    </div>
                    : null
                }

            </div>
        </div>
        </div>
    );
}