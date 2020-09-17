import React, { useState } from "react";
import "./account.css";

// import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';

export default function Account(props) {
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    return (
        <div className>

            <div className="account">
                <div className="row">
                    <h4>{props.nickName}</h4>
                </div>

                <div className="row">
                    <div className="col-4 acct-icon">
                        <img src={props.image} alt={props.alt} />
                    </div>
                    <div className="col-8">
                        <p>
                            Register Balance: 
                            <br></br>
                            <pre>     {props.registerBalance}</pre>
                            Cleared Balance: 
                            <br></br>
                            <pre>     {props.clearedBalance}</pre>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}