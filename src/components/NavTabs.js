import React from "react";
import {Link} from "react-router-dom";

function NavTabs() {
    return(
        <container fluid>
            <ul className="nav nav-tabs m-2">
                <li className = "nav-item m-1">
                    <Link
                        to="/home"
                        classname="nav-link"
                    >Home</Link>
                </li>

                <li className = "nav-item m-1 ml-auto">
                    <Link
                        to="/assets"
                        classname="nav-link"
                    >Assets</Link>
                </li>

                <li className = "nav-item m-1">
                    <Link
                        to="/spending"
                        classname="nav-link"
                    >Spending</Link>
                </li>

                <li className = "nav-item m-1">
                    <Link
                        to="/budget"
                        classname="nav-link"
                    >Budget</Link>
                </li>

            </ul>
        </container>
    )
}

export default NavTabs;