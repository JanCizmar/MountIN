"use strict";

import React from 'react';
import Page from '../Page';
import propTypes from "prop-types";
import {Map} from './../Map';
import {Button, Col, Row} from "react-bootstrap";
import Sticky from 'react-sticky-el';
import MessageBoard from "../MessageBoard/MessageBoard";
import ImageUploadService from "../../services/ImageUploadService";
import {withRouter} from 'react-router-dom';

function TourDetailPage (props)  {
    let messageBoardElements;
    let participantsId = props.participants.map(participant => participant._id);

    // Only show the messageBoard if the current user is a participant or the creator
    if (props.userId !== undefined && (props.userId === props.creator._id || participantsId.includes(props.userId))) {
        messageBoardElements =
            <Col className="margin-20 text-justify" xs={12} md={12} lg={12}>
                <div className="head detail-head">
                    MESSAGE BOARD:
                </div>
                <MessageBoard userId={props.userId} tourId={props._id} username={props.username}/>
            </Col>
    }

    return (
        <Page className="tour-detail">
            <Row>
                <Col xs={12} md={6} lg={6}>
                        <div className="tour-name">
                            {props.name} </div>
                        <Col xs={12} md={6} lg={6}>
                           <div className="tour">
                               {props.image &&
                               <img className="tour-image" src={ImageUploadService.getImageURL(props.image.large)}/>}
                            </div>
                        </Col>
                        <Col xs={12} md={6} lg={6}>
                            <div className="head"> Date and Time of Tour:</div>
                            <div className="tour-date">
                                {new Intl.DateTimeFormat('en-GB', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit'
                                }).format(new Date(props.date))} </div>
                            <div className="difficulty head detail-head">
                                Level ofDifficulty: {props.difficulty === 0 &&
                                <div className="easy">EASY</div>
                                }
                                {props.difficulty === 1 &&
                                <div className="med">INTERMEDIATE</div>
                                }
                                {props.difficulty ===2 &&
                                <div className="hard">EXPERT</div>
                                }
                            </div>
                            <div className="head detail-head">
                                Tour Type:
                                {props.type === 0 &&
                                <div className="other">OTHER</div>
                                }
                                {props.type ===1 &&
                                <div className="hiking">HIKING</div>
                                }
                                {props.type ===2 &&
                                <div className="skiing">SKIING</div>
                                }
                                {props.type === 3 &&
                                <div className="biking">BIKING</div>
                                }
                            </div>
                            <div className="head detail-head">
                                TourCost:{props.cost === 0 &&
                                <div className="free">FREE</div>
                            } {!props.cost === 0 &&
                                <div className="cost">{props.cost} €</div>
                                }
                            </div>
                            <div className="head detail-head">
                                Tour Created By:
                                <div className="creator"> {props.creator && props.creator.username}</div>
                            </div>
                            <div className="head detail-head">
                                Number ofParticipants:
                                <div className="creator">{props.participants && props.participants.length} </div>
                            </div>
                        </Col>
                        <Col className="margin-20 text-justify" xs={12} md={12} lg={12}>
                            {props.description}
                        </Col>
                        {messageBoardElements}
                    </Col>

                <Col xs={12} md={6} lg={6}>
                    <Sticky mode="top">
                        <Map waypoints={props.route} draggable={false} center={props.mapCenter}/>
                        {props.userId!==props.creator._id &&
                        <Button className="join-button"
                                onClick={props.onJoinTourToggle}>{!props.joined ? 'JOIN' : 'LEAVE TOUR'}</Button>}
                        {props.userId===props.creator._id &&
                        <Button className="delete-button"
                               onClick={props.onDeleteTourToggle} >DELETE TOUR</Button>
                        }
                        {props.userId===props.creator._id &&
                        <Button className="edit-button"
                                onClick={() => props.history.push('/tours/edit/'+props._id)}>EDIT TOUR</Button>
                        }
                    </Sticky>
                </Col>
            </Row>
            {props.children}
        </Page>);
}
TourDetailPage.propTypes = {
    userId: propTypes.string,
    onJoinTourToggle: propTypes.func.isRequired,
    onDeleteTourToggle: propTypes.func.isRequired
};
export default withRouter(TourDetailPage);
