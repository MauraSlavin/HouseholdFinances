import React, { useState } from "react";
import "./account.css";

// import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';

export default function Account(props) {
    return (
        <div>

            <div className="account">
                <div className="row">
                    <h4>{props.nickName}</h4>
                </div>

                <div className="row">
                    <div className="acct-icon col-3 p-0">
                        <img src={props.image} alt={props.alt} />
                    </div>
                    <div className="col-9">
                        <p>
                            <span className="small">{props.purpose}</span>
                            <hr></hr>
                            <div className="row">
                                <div className="col-7">
                                    Register Bal:
                                    Cleared Bal:
                                </div>
                                <div className="col-5 right mx-0">
                                    $ {props.registerBalance}
                                    <br></br>
                                    $ {props.clearedBalance}
                                </div>
                            </div>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}