import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import Button from "react-bootstrap/Button";

import "./Home.css";


function Spending() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="row">
            <div className="col-10 offset-1 text-left">
                <div>
                    <h1>Spending page under construction.</h1>
                </div>
            </div>
        </div>

    )

}

export default Spending;