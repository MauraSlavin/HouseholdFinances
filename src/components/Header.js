import React from "react";
import NavTabs from "./NavTabs";
import Home from "./Home";

import { BrowserRouter as Router, Route } from "react-router-dom";

function Header() {
    return (
        <header>
            <div className="row">
                <div className="col-12 text-center text-success">
                    <h1>Household Finances</h1>
                </div>
            </div>

            <div className="col-12" id="nav">
                <NavTabs />
                <Route exact path="/" component={Home} />
                
            </div>
        </header>



    );
}

export default Header;