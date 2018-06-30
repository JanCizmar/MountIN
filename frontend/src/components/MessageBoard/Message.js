"use strict";

import React from 'react';
import {Col, Row} from "react-bootstrap";
import ContentEditable from 'react-contenteditable';

export default function Message(props) {
    return (
        <div className="message">


                <span className="message-username">{props.username}</span>

                <span className="message-data">
                    <ContentEditable
                        html={props.data}
                        disabled={true}
                    />
                </span>
                <span className="msg-date">
                    {new Intl.DateTimeFormat('en-GB', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    }).format(props.createAt)}
                   </span>
        </div>
    );
}
