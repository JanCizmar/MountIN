"use strict";

import React from 'react';
import {Col, FormGroup, Row} from "react-bootstrap";
import {Location} from "./FilterInputs/Location";

import DatePicker from "react-16-bootstrap-date-picker";

class Filters extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            locationName: "",
        };
    }


    render() {
        return (
            <div className="filters-wrapper">
                <Row>
                    <Col lg={6}>
                        <Location onValueChange={locationName => this.setState({...this.state, locationName})}
                                  onLatLngChange={console.log}
                                  value={this.state.locationName}

                        />
                    </Col>
                </Row>
                <Row>
                    <Col lg={3}>
                        <FormGroup
                            controlId="dateFrom">
                            <DatePicker
                                //value={this.state.value}
                                placeholder="Date from"
                            />
                        </FormGroup>
                    </Col>
                    <Col lg={3}>
                        <FormGroup
                            controlId="dateTo">
                            <DatePicker
                                //value={this.state.value}
                                placeholder="Date to"
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </div>

        );
    }
}

export default Filters;