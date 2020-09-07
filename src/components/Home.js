import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Button from "react-bootstrap/Button";

import "./home.css";

import Account from "./Account";
import accounts from "./accounts.json";

const acctIcons = [
    require('./images/CheckingAcctImage.jpg'),
    require('./images/BigBillsImage.jpg'),
    require('./images/DiscCCImage.jpg'),
    require('./images/BackupCCImage.jpg'),
    require('./images/MikeSpendingImage.jpg'),
    require('./images/MauraSpendingImage.jpg')
];

function Home() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="row">
            <div className="col-10 offset-1 text-left">
                <div className="icons">
                    {accounts.map((account, index) => (
                        <Account
                            nickName={account.nickName}
                            image={acctIcons[index]}
                            alt={account.alt}
                            registerBalance={account.registerBalance}
                            clearedBalance={account.clearedBalance}
                        />
                    ))}
                </div>
            </div>
        </div>

    )

}

export default Home;