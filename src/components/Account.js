// import React, { useState, Route, Link, Component } from "react";
import React, { useState, Link } from "react";
import LinkButton from './LinkButton';

import "./account.css";

import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';

export default function Account(props) {
    return (    

        <div className="border-bottom border-dark mt-2">

            <div className="account">
                <div className="row">
                    <div className="col-8 p-0">
                        <LinkButton className="acct-name-btn p-0" to={"account/transactions/" + props.account_id}>
                            <h5><u>{props.nickName}</u></h5>
                        </LinkButton>
                    </div>
                    <div className="col-4 text-right pl-0">
                        <LinkButton className="upload-btn" to={"account/transactions/upload/" + props.account_id}>
                            Upload
                        </LinkButton>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <span className="small">{props.purpose}</span>
                    </div>
                </div>

                <div className="row">
                    <LinkButton className="acct-icon-btn" to={"account/transactions/" + props.account_id}>
                        <img className="acct-icon mt-2" src={props.image} alt={props.alt} />
                    </LinkButton>


                    <div className="col-9">
                        <div className="row">
                            <div className="col-5">
                                <br></br>
                                Register:
                                Cleared:
                                ID:
                            </div>
                            <div className="col-7 right mx-0">
                                <br></br>
                                <strong>$ {props.registerBalance}</strong>
                                <br></br>
                                <strong>$ {props.clearedBalance}</strong>
                                <br></br>
                                <strong>{props.account_id}</strong>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}