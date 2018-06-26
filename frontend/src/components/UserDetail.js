"use strict";

import React from 'react';

//import {AlertMessage} from './AlertMessage';
import Page from './Page';
//import {Button, Col, ControlLabel, FormControl, FormGroup, Row, Grid, Media, Checkbox} from "react-bootstrap";
import {Col, Row, Media, Checkbox} from "react-bootstrap";
import TourListItem from "./Tours/TourListItem";


//import {Link} from 'react-router-dom';
//import {AlertMessage} from './AlertMessage';
//import Page from './Page';



function UserDetail(props){
    let tours = props.tours.map((tour) => {
        //console.log(tour)
        return <TourListItem key={tour._id} {...tour}/>
    })
    let toursAttending = props.toursAttending.map((tour) => {
        //console.log(tour)
        return <TourListItem key={tour._id} {...tour}/>
    })
        return (
            <Page>

                <Media>
                    <Media.Body>
                        <Media.Heading>{props.username}</Media.Heading>
                            <Row>s
                            </Row>
                            <Row> s
                            </Row>
                            <Row className="show-grid">
                            <Col xs={3} md={5}>
                                Name:
                            </Col>
                            <Col xs={6} md={4}>
                                {props.firstName}
                            </Col>
                            </Row>
                            <Row className="show-grid">
                            <Col xs={3} md={5}>
                                Surname:
                            </Col>
                            <Col xs={6} md={4}>
                                {props.surname}
                            </Col>
                            </Row>
                            <Row className="show-grid">
                            <Col xs={3} md={5}>
                                Phone Number:
                            </Col>
                            <Col xs={6} md={4}>
                                {props.phone}
                            </Col>
                            </Row>

                            <Checkbox checked={props.professional ? 'checked' : ''} readOnly>
                                Professional account
                            </Checkbox>

                            Picture (to be done): {props.picture}

                    </Media.Body>
                    <Media.Right>
                        <img width={64} height={64} src="https://image.freepik.com/free-icon/profile-user-silhouette_318-40557.jpg" alt="thumbnail" />
                    </Media.Right>
                </Media>

                <Row>
                    Attending Tours:
                </Row>
                <Row>
                    {toursAttending}
                </Row>
                <Row>
                    Own Tours:
                </Row>
                    {tours}

            </Page>
        );
    }

export default UserDetail;
