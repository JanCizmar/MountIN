"use strict";

import React from 'react';
import {Col, FormGroup, Row} from "react-bootstrap";
import {Location} from "./FilterInputs/Location";

import DatePicker from "react-16-bootstrap-date-picker";
import {ActivityType} from "./FilterInputs/ActivityType";
import {Difficulty} from "./FilterInputs/Difficulty";
import {GuideType} from "./FilterInputs/GuideType";
import {Price} from "./FilterInputs/Price";


class Filters extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            locationName: "",
            activityTypes: [],
            difficulties: [],
            guideTypes: [],
            price: [0, 100]
        };
    }

    render() {
        return (
            <div className="filters-wrapper">
                <Row>
                    <Col md={6}>
                        <Location onValueChange={locationName => this.setState({...this.state, locationName})}
                                  onLatLngChange={console.log}
                                  value={this.state.locationName}

                        />
                    </Col>
                    <Col md={3} sm={6}>
                        <FormGroup
                            controlId="dateFrom">
                            <DatePicker
                                //value={this.state.value}
                                placeholder="Date from"
                            />
                        </FormGroup>
                    </Col>
                    <Col md={3} sm={6}>
                        <FormGroup
                            controlId="dateTo">
                            <DatePicker
                                //value={this.state.value}
                                placeholder="Date to"
                            />
                        </FormGroup>
                    </Col>

                </Row>
                <Row>
                    <Col md={3}>
                        <ActivityType onChange={value => this.setState({...this.state, activityTypes: value})}
                                      value={this.state.activityTypes}/>
                    </Col>
                    <Col md={3}>
                        <Difficulty onChange={value => this.setState({...this.state, difficulties: value})}
                                    value={this.state.difficulties}/>
                    </Col>
                    <Col md={3}>
                        <GuideType onChange={value => this.setState({...this.state, guideTypes: value})}
                                   value={this.state.guideTypes}/>
                    </Col>
                    <Col md={3}>
                        <Price onChange={value => this.setState({...this.state, price: value})}
                               value={this.state.price}/>
                    </Col>
                </Row>
            </div>

        );
    }
}

export default Filters;