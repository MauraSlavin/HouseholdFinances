import React, { Component } from "react";
import NavTabs from "./NavTabs";
import Home from "./Home";
import Assets from "./Assets";
import Spending from "./Spending";
import Budget from "./Budget";
import Upload from "./Upload";
import Transactions from "./Transactions";

import './account.css';


import { BrowserRouter as Router, Route  } from "react-router-dom";

const icon = require('./images/icon.png');

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
                <div className="row">
                    <div className="col-3 offset-1 app-icon">
                        <img src={icon} alt={''} />
                    </div>
                    <div className="col-4 text-center text-success">
                        <h1>Household Finances</h1>
                    </div>
            
                    <div className="col-12" id="nav">
                        <NavTabs />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/budget" component={Budget} />
                        <Route exact path="/assets" component={Assets} />
                        <Route exact path="/spending" component={Spending} />
                        <Route exact path="/account/transactions/upload/:id" component={Upload} />
                        <Route exact path="/account/transactions/:id" component={Transactions} />
                    </div>

                </div>
            </Router>
        );
    }
}

export default HouseFinApp;