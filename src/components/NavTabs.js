import React from "react";
import {Link} from "react-router-dom";

function NavTabs() {
    return(
        <div>
            <ul className="nav nav-tabs m-2">
                <li className = "nav-item m-1">
                    <Link
                        to="/home"
                        className="nav-link"
                    >Home</Link>
                </li>

                <li className = "nav-item m-1 ml-auto">
                    <Link
                        to="/assets"
                        className="nav-link"
                    >Assets</Link>
                </li>

                <li className = "nav-item m-1">
                    <Link
                        to="/spending"
                        className="nav-link"
                    >Spending</Link>
                </li>

                <li className = "nav-item m-1">
                    <Link
                        to="/budget"
                        className="nav-link"
                    >Budget</Link>
                </li>

            </ul>
        </div>
    )
}

export default NavTabs;