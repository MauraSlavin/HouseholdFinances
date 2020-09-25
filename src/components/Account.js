// import React, { useState, Route, Link, Component } from "react";
import React, { useState, Link } from "react";
import LinkButton from './LinkButton';

import "./account.css";

// import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';

export default function Account(props) {
    return (    

        <div className="border-bottom border-dark mt-2">

            <div className="account">
                <div className="row">
                    <h4><u>{props.nickName}</u></h4>
                    <div><span className="small">{props.purpose}</span></div>
                </div>

                <div className="row">
                    <LinkButton className="acct-btn" to={"account/transactions/" + props.accountId}>
                        <img className="acct-icon" src={props.image} alt={props.alt} />
                    </LinkButton>


                    <div className="col-9">
                        <div className="row">
                            <div className="col-5">
                                <br></br>
                                Register:
                                Cleared:
                            </div>
                            <div className="col-7 right mx-0">
                                <br></br>
                                <strong>$ {props.registerBalance}</strong>
                                <br></br>
                                <strong>$ {props.clearedBalance}</strong>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}