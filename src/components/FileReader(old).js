import React, { useState } from 'react';
import Papa  from 'papaparse';

export default function FileReader() {
    const [csvfile, setCsvFile] = useState(undefined);
    const [showUploadButton, setShowUploadButton] = useState();
    const [message, setMessage] = useState("");

    function handleFileChange(event) {
        var filename = "(None chosen)";
        var fileextension = '';

        if (event.target.files !== undefined) {
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
            setMessage("");
        };
    };

    function importCSV() {
        var results = Papa.parse(csvfile, {
            complete: updateData,
            header: true
        });
    };

    function updateData(result) {
        // go through array in reverse order, so index in result.errors is correct.
        // remove invalid transaction records
        for (var i = result.errors.length-1; i >= 0; i--) {
            result.data.splice(result.errors[i].row, 1);
        };

        const transForDB = result.data.filter(trans => trans.Amount !== "");
        console.log("transForDB:");
        console.log(transForDB);

        // LEFT OFF HERE
        // To do - write files to database
        // Set message (in state, using setMessage() ) to number of records uploaded and written to DB.
    };

    return(
        <div>
            <h3 className = "text-center">Import CSV File!!</h3>
            <p className="text-danger bg-warning"><strong>{message}</strong></p>
            <input
                className="csv-input"
                type="file"
                name = "file"
                placeholder = {null}
                onChange = {handleFileChange}
            />
            { showUploadButton ?
                <button onClick={importCSV}>Upload transactions</button>
                : null
            }
        </div>
    )

}
