import React from "react";
import NavTabs from "./NavTabs";
import Home from "./Home";
import Assets from "./Assets";
import Spending from "./Spending";
import Budget from "./Budget";
import Transactions from "./Transactions";

import { BrowserRouter as Router, Route } from "react-router-dom";

function Header() {
    return (
        <header>
            <div className="row">
                <div className="col-12 text-center text-success">
                    <h1>Household Finances</h1>
                </div>
          

                <div className="col-12" id="nav">
                    <NavTabs />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/budget" component={Budget} />
                    <Route exact path="/assets" component={Assets} />
                    <Route exact path="/spending" component={Spending} />
                    <Route exact path="/account/transactions/:id" component={Transactions} />
                    
                </div>
            </div>
        </header>



    );
}

export default Header;