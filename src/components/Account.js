import React, { useState } from "react";
import "./account.css";

// import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';

export default function Account(props) {
    return (
        <div className="border-bottom mt-2">

            <div className="account">
                <div className="row">
                    <h4><u>{props.nickName}</u></h4>
                    <div><span className="small">{props.purpose}</span></div>
                </div>

                <div className="row">
                    <div className="acct-icon col-3 p-0">
                        <img src={props.image} alt={props.alt} />
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <div className="col-7">
                                <br></br>
                                Register Bal:
                                Cleared Bal:
                            </div>
                            <div className="col-5 right mx-0">
                                <br></br>
                                $ {props.registerBalance}
                                <br></br>
                                $ {props.clearedBalance}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}