import React, { useState } from "react";

// import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';

export default function Account(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className = "acct">

            <div className="account">
                <img src={props.image} alt={props.alt} />
                <h3><strong>{props.nickName}</strong></h3>
            </div>
        </div>
    )
}