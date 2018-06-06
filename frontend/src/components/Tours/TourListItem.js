"use strict";

import React from 'react';
import {Col, Panel} from "react-bootstrap";


export default function TourListItem(props) {
    return (
        <Col lg={3}>
            <Panel>
                <Panel.Body>{props.name}</Panel.Body>
            </Panel>
        </Col>
    );
}