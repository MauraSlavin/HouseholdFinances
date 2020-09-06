import React, { Component } from "react";
import Header from './Header';


import { BrowserRouter as Router, Route  } from "react-router-dom";

class HouseFinApp extends Component {
    state = {
        currentPage: "Home"
    }


    handlePageChange = page => {
        this.setState({ currentPage: page });
    };

    render() {
        return (
            <Router>
                <Header />
                <div>

                </div>
            </Router>
        );
    }
}

export default HouseFinApp;