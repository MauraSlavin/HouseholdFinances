// import React, { useState, Route, Link, Component } from "react";
import React, { useState, Link } from "react";
import "./account.css";

// import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';

export default function Account(props) {
    // export default class Account extends Component {
        //     constructor(props) {
            //         super();
            
//         this.state = {
    //             thisAccount: {
        //                 account_id: null,
        //                 nickName: "",
        //                 purpose: "",
        //                 image: "",
        //                 alt: ""
        //             }
        //         };
        //     }
        
        //     componentDidMount() {
            //         this.setState({
                //             thisAccount: this.props
                //         });
                //     }
                
                // render() {
                    //     // const { account } = this.state;
                    //     return (
    return (
    

        <div className="border-bottom border-dark mt-2">

            <div className="account">
                <div className="row">
                    <h4><u>{props.nickName}</u></h4>
                    <div><span className="small">{props.purpose}</span></div>
                </div>

                <div className="row">
                    {/* <Link 
                        to={`/account/transactions/${props.account_id}`}
                        className="acct-icon btn-light col-3 p-0">
                        <img className="acct-icon" src={props.image} alt={props.alt} />
                    </Link> */}
                    <Button
                        className="acct-icon btn-light col-3 p-0">
                        <img className="acct-icon" src={props.image} alt={props.alt} />
                    </Button>


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