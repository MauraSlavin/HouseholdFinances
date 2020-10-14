import React, { useState } from 'react';
import Papa  from 'papaparse';
import TransactionDataService from "../services/transaction.service";
import './Upload.css';


// const Upload = memo(props => {
export default function Upload(props) {
    const [csvfile, setCsvFile] = useState(undefined);
    const [showUploadButton, setShowUploadButton] = useState(false);
    const [showMappings, setShowMappings] = useState(false);
    const [showMappingsDoneButton, setShowMappingsDoneButton] = useState(false);
    const [message, setMessage] = useState("");
    const [fileKeys, setFileKeys] = useState([]);
    const account_id = props.match.params.id;
    const nick_name = props.match.params.nick_name;
    // const transForDB = [];
    const rawTransactions = [];
    const dbKeys = ["account_id", "trans_date", "post_date", "verified", "amount", "to_from", "description", "category", "stmt_date"];
    console.log("--- In Upload");
    
    function handleFileChange(event) {
        console.log("--- In handleFileChange");
        var csvfile = getFileName(event);
        console.log("csvfile in handleFileChange:");
        console.log(csvfile);
        readFileAndUpdateDB(csvfile);
        // console.log("rawTransactions:");
        // console.log(rawTransactions);
        
        
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
            setShowUploadButton(false);
            setMessage("Must be a CSV file.  " + filename + " is not.  Please choose another file.");
        } else {
            setCsvFile(event.target.files[0]);
            setShowMappings(true);
            setMessage("Choose columns from file for each database field.  When done, click 'Done Mapping'.");
        };
        
        return event.target.files[0];
        
    };
    
    function readFileAndUpdateDB(csvfile) {
        console.log("--- In readFile");
        var results = Papa.parse(csvfile, {
            complete: readDataAndUpdateDB,
            header: true
        });
    };
    
    function importCSV() {
        console.log("--- In importCSV");
        console.log("csvfile in importCSV:");
        console.log(csvfile);
        var results = Papa.parse(csvfile, {
            complete: updateData,
            header: true
        });
    };
    
    function readDataAndUpdateDB(result) {
        console.log("--- In readDataAndUpdateDB");
        // go through array in reverse order, so index in result.errors is correct.
        // remove invalid transaction records
        for (var i = result.errors.length-1; i >= 0; i--) {
            result.data.splice(result.errors[i].row, 1);
        };
        
        // const transForDB = result.data.filter(trans => trans.Amount !== "");
        const rawTransactions = result.data.filter(trans => trans.Amount !== "");
        console.log("rawTransactions:");
        console.log(rawTransactions);
        
        var fileKeys = Object.keys(rawTransactions[0]);
        console.log("keys in CSV file:");
        console.log(fileKeys);
        setFileKeys(fileKeys);

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

    function updateData(result) {
        console.log("--- In updateData");
        // go through array in reverse order, so index in result.errors is correct.
        // remove invalid transaction records
        for (var i = result.errors.length-1; i >= 0; i--) {
            result.data.splice(result.errors[i].row, 1);
        };
        
        const rawTransactions = result.data.filter(trans => trans.Amount !== "");
        
        var stmt_date;
        var formatForDB = [];
        
        rawTransactions.forEach(trans => {
            
            stmt_date = new Date(trans["Stmt Date"]);
            
            // var dbKeys = ["account_id", "trans_date", "post_date", "verified", "amount", "to_from", "description", "category", "stmt_date"];
            var DBtrans = {
                account_id: account_id,
                trans_date: new Date(trans.Date),
                post_date: (trans.Date !== "") ? new Date(trans.Date) : null,
                verified: (trans["Stmt Date"] !== null) ? "Yes" : "",
                amount: (trans["Transaction Type"] === 'debit') ? 0-trans.Amount : trans.Amount,
                to_from: trans.Description,
                description: trans.Notes,
                category: trans.Category,
                stmt_date: new Date(stmt_date.getFullYear(), stmt_date.getMonth(), 1),
            }
            formatForDB.push(DBtrans);
        });
        
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
                <div className="col-12 text-center">
                    <input
                        className="csv-input ml-5"
                        type="file"
                        name = "file"
                        placeholder = {null}
                        onChange = {handleFileChange}
                    />
                </div>
            </div>
            <br />

            <div className="row">
                <div className="col-12">
                    { showMappings ?
                        <div className="row text-left mt-2 ml-1">
                            <div className="col-1">
                                <div>
                                    <div className="row left-txt">
                                        <div className="col-12 mapping">
                                            DB Key:
                                        </div>
                                    </div>
                                    <div className="row left-txt">
                                        <div className="col-12">
                                            File Key:
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-11">
                                <div>
                                    <div className="mapping">
                                        <div className="map-block">
                                            {dbKeys.map((dbKey, index) => (
                                                <div>
                                                    <div className="border map-item mx-2" key={index}>
                                                        {dbKey}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mapping">
                                        <div className="map-block">
                                            {dbKeys.map((dbKey, index) => (
                                                <div>
                                                    <div className="border map-item mx-2" key={index}>
                                                        Pick file key for {index[0]}                                                       {dbKey}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null
                    }
                </div>
            </div>
            <br />

            <div className="row">
                <div className="col-12">
                    { showMappingsDoneButton ?
                        <button>Done Mapping</button>
                        :
                        null
                    }
                </div>
            </div>
            <br />

            <div className="row">
                <div className="col-12">
                    { showUploadButton ?
                        <button className="m-5" onClick={importCSV}>Upload transactions</button>
                        : null
                    }
                </div>
            </div>

        </div>
    );
}
