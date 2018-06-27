"use strict";

import React from 'react';
import {Col} from "react-bootstrap";
import Rating from "../Rating";
import Link from "react-router-dom/es/Link";

export default function TourListItem(props) {
    return (
        <Col xs={12} sm={6} md={3} lg={3}>
        <Col xs={props.xs || 12} sm={props.sm || 12} md={props.md || 12} lg={props.lg || 12}
             className="tour-list-item-wrapper" onClick={props.onClick}>
            <Link to={'/tours/detail/' + props._id} className="">
                <div className="tour-list-item">
                    {props.image &&
                    <div className="image" style={{
                        backgroundImage: "url(" + props.image.thumbnail + ")",
                    }}>
                    </div>}
                    {!props.image &&
                    <div className="image def-image">
                    </div>}
                    <div className="title">{props.name}</div>
                    <div className="date">{props.date}</div>
                    <div className="price">{props.cost > 0 ? props.cost : "Free"}</div>

                    <div className="bottom">
                        <div className="guided">{props.creator.professional ? 'Guided' : ''}</div>
                        <Rating value={props.rating}/>
                    </div>
                </div>
            </Link>
        </Col>
        </Col>
    );
}
