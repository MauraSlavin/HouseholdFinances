import React, { useState } from "react";
import "./account.css";

// import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';

export default function Account(props) {
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    console.log("Account - props");
    console.log(props);
    console.log("props.registerBalance");
    console.log(props.registerBalance);
    // console.log("props.registerBalance[1]");
    // console.log(props.registerBalance[1]);

    return (
        <div>

            <div className="account">
                <div className="row">
                    <h4>{props.nick_name}</h4>
                </div>

                <div className="row">
                    <div className="col-4 acct-icon">
                        <img src={props.image} alt={props.alt} />
                    </div>
                    <div className="col-8">
                        <p>
                            <strong>{props.nickName}</strong>
                            <br></br>
                            <span className="small">{props.purpose}</span>
                            <hr></hr>
                            Register Balance:  {props.registerBalance}
                            <br></br>
                            Cleared Balance:  {props.clearedBalance}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}