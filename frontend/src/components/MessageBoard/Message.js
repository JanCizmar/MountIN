"use strict";

import React from 'react';
import {Col, Row} from "react-bootstrap";

export default function Message(props) {
    return (
        <Row>
            <Col md={3} sm={6}>>
                <div className="message-username">{props.creator}</div>
            </Col>
            <Col md={3} sm={6}>>
                <div className="message-data">{props.data}</div>
            </Col>
        </Row>
    );
}
