import React, { Component } from 'react';
import Papa  from 'papaparse';

export default class FileReader extends Component {
    constructor() {
        super();
        this.state = {
            csvfile: undefined
        };
        this.updateData = this.updateData.bind(this);
    }

    handleChange = event => {
        this.setState({
            csvfile: event.target.files[0]
        });
    };

    importCSV = () => {
        const { csvfile } = this.state;
        const fileName = csvfile.name;
        console.log("-- csvfile:");
        console.log(csvfile);
        console.log("-- csvfile.name:");
        console.log(csvfile.name);
        console.log("fileName:");
        console.log(fileName);
        console.log("this.updateData:");
        console.log(this.updateData);
        Papa.parse(csvfile, {
            complete: this.updateData,
            header: true
        });
    };

    updateData(result) {
        var data = result.data;
        console.log(data);
    }

    render() {
        console.log("this.state.csvfile:");
        console.log(this.state.csvfile);
        return(
            <div>
                <h2>Import CSV File!!</h2>
                <input
                    className="csv-input"
                    type="file"
                    ref={input => {
                        this.filesInput = input;
                    }}
                    name = "file"
                    placeholder = {null}
                    onChange = {this.handleChange}
                />
                <button onClick={this.importCSV}>Upload now!</button>
            </div>
        );
    }

}