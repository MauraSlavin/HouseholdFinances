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
                    ><strong>Home</strong></Link>
                </li>

                <li className = "nav-item m-1 ml-auto">
                    <Link
                        to="/assets"
                        className="nav-link"
                    ><strong>Assets</strong></Link>
                </li>

                <li className = "nav-item m-1">
                    <Link
                        to="/spending"
                        className="nav-link"
                    ><strong>Spending</strong></Link>
                </li>

                <li className = "nav-item m-1">
                    <Link
                        to="/budget"
                        className="nav-link"
                    ><strong>Budget</strong></Link>
                </li>

            </ul>
        </div>
    )
}

export default NavTabs;