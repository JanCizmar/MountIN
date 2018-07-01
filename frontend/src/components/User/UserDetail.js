"use strict";

import React from 'react';
import Page from '../Page';
import {Button, Col, Row} from "react-bootstrap";
import TourListItem from "../Tours/TourListItem";
import {withRouter} from "react-router-dom";

function UserDetail(props) {
    let tours = props.tours.map((tour) => {
        //console.log(tour)
        return <TourListItem key={tour._id} {...tour}/>
    });
    let toursAttending = props.toursAttending.map((tour) => {
        return <TourListItem key={tour._id} {...tour}/>
    });
    return (
        <Page className="profile-page">
            <Row>
                <Col className="user-details-column text-center" xs={12} sm={4} md={4} lg={3}>
                    <Col sm={12} md={12} lg={12}>
                        <img className="profile-image" width={164} height={164}
                             src="https://image.freepik.com/free-icon/profile-user-silhouette_318-40557.jpg"
                             alt="thumbnail"/>
                    </Col>
                    <Col sm={12} md={12} lg={12}>
                        <div className="user-firstname">{props.firstName} {props.surname}</div>
                    </Col>
                    {props.professional &&
                    <Col sm={12} md={12} lg={12}>
                        <div className="user-type">(PROFESSIONAL INSTRUCTOR)</div>
                    </Col>}
                    <Col sm={12} md={12} lg={12}>
                        <div className="username">
                            <div className="username-tag">Username: &nbsp;</div>
                            <div className="user-username">{props.username}</div>
                        </div>
                    </Col>
                    <Col sm={12} md={12} lg={12}>
                        <div className="phone">
                            <div className="phone-tag">Phone: &nbsp;</div>
                            <div className="user-phone">{props.phone}</div>
                        </div>
                    </Col>
                    <Col sm={12} md={12} lg={12}>
                        <div className="email">
                            <div className="email-tag">Email: &nbsp;</div>
                            <div className="user-email">{props.email}</div>
                        </div>
                    </Col>
                    <Button className="edit-profile" onClick={() => props.history.push('/editProfile')}>Edit
                        Profile</Button>
                    {/*<Button className="edit-profile">Reset Password</Button>*/}
                    {/*<Button className="edit-profile">Delete Account</Button>*/}
                </Col>
                <Col xs={12} sm={8} md={8} lg={9}>
                    <Row>

                        <Col className="tour-heading" xs={12} sm={12} md={12} lg={12}>
                            TOURS ATTENDING:
                        </Col>
                        { toursAttending.length===0 &&
                        <div style={{marginLeft:20,marginBottom:30}}>You are not attending any tours. &nbsp;
                            <a  onClick={() => props.history.push('/list')}>Search for Tours</a>
                        </div>}
                        {toursAttending}
                    </Row>
                    <Row>
                        <Col className="tour-heading" xs={12} sm={12} md={12} lg={12}>
                            TOURS CREATED:
                        </Col>
                        { tours.length===0 &&
                        <div style={{marginLeft:20,marginBottom:30}}>You have not created any tours. &nbsp;
                            <a  onClick={() => props.history.push('/createTour')}>Create a Tour</a>
                        </div>}
                        {tours}
                    </Row>
                </Col>
            </Row>
        </Page>
    );
}

export default withRouter(UserDetail);
