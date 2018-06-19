"use strict";

import React from 'react';

//import {AlertMessage} from './AlertMessage';
import Page from './Page';
import {Button, Col, ControlLabel, FormControl, FormGroup, Row, Grid, Media} from "react-bootstrap";


//import {Link} from 'react-router-dom';
//import {AlertMessage} from './AlertMessage';
//import Page from './Page';


function UserDetail(props){
        return (
            <Page>

                <Media>
                    <Media.Body>
                        <Media.Heading>{props.username} - {props.firstName} {props.surname}</Media.Heading>
                            <Row className="show-grid">
                            <Col xs={2} md={8}>
                                Phone Number:
                            </Col>
                            <Col xs={6} md={4}>
                                {props.phone}
                            </Col>
                            </Row>


                            Picture: {props.picture}
                            {props.professional}
                            {props.tours}
                    </Media.Body>
                    <Media.Right>
                        <img width={64} height={64} src="https://image.freepik.com/free-icon/profile-user-silhouette_318-40557.jpg" alt="thumbnail" />
                    </Media.Right>
                </Media>


                <Row className="show-grid">
                    <Row className="show-grid">
                    <Col xs={1} md={1}> {props.username}</Col>
                    <Col xs={1} md={1}> {props.surname}</Col></Row>
                    <Col xs={2} md={2}> Image</Col>
                </Row>


                <Row>
                    Attending Tours:
                </Row>
                //todo:Tour element
                <Row>
                    Own Tours:
                </Row>
                //todo:Tour element

            </Page>
        );
    }

export default UserDetail;
