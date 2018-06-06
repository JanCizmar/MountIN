"use strict";

import React from 'react';
import {Col, Row} from "react-bootstrap";


class Filters extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }


    render() {
        return (
            <Row>
                <Col lg={12}>
                    <div>Filters</div>
                </Col>
            </Row>
        );
    }
}

export default Filters;