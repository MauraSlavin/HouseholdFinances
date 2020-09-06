import React, { useState } from "react";
import { BrowserROuter as Router, Route } from "react-router-dom";
import Account from "./Account";
import Button from "react-bootstrap/Button";

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
                        />
                    ))}
                </div>
            </div>
        </div>

    )

}

export default Home;