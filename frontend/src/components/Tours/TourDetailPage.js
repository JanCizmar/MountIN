"use strict";

import React from 'react';
import Page from '../Page';
import propTypes from "prop-types";
import Grid from "react-bootstrap/es/Grid";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import MessageBoard from "../MessageBoard/MessageBoard";

export const TourDetailPage = props => {
    return (
        <Page>
            <Grid>
                <Row>
                    <Col md={12}>
                        Name: {props.name} <br/>
                        Description: {props.description} <br/>
                        Date: {props.date} <br/>
                        Difficulty: {props.difficulty} <br/>
                        Created at: {props.createdAt} needed? <br/>
                        Creator: {props.creator && props.creator.username} <br/>
                        Cost: {props.cost} <br/>
                        Type: {props.type} <br/>
                        Participants:{props.participants && props.participants.length} <br/>
                        } <br/>
                        Image: {props.image && props.image.thumbnail} <br/>
                        Rating: {props.rating} <br/>

                        <MessageBoard userId={props.userId} tourId={props.id}/>
                    </Col>
                </Row>
            </Grid>
        </Page>);
};

TourDetailPage.propTypes = {
    userId: propTypes.string
};
