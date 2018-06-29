"use strict";

import React from 'react';
import {Col, Row} from "react-bootstrap";
import ContentEditable from 'react-sane-contenteditable';

export default function Message(props) {
    console.log(props);
    return (
        <Row>
            <Col md={3} sm={6}>
                <div className="message-username">{props.creator}</div>
            </Col>
            <Col md={3} sm={6}>
                <div className="message-data">
                    <ContentEditable
                        tagName="h1"
                        className="my-class"
                        content={props.data}
                        editable={false}
                        maxLength={140}
                        multiLine={true}
                    />
                </div>
            </Col>
        </Row>
    );
}
