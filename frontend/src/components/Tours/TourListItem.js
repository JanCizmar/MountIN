"use strict";

import React from 'react';
import {Col} from "react-bootstrap";
import Rating from "../Rating";
import Link from "react-router-dom/es/Link";

export default function TourListItem(props) {
    return (
        <Col md={3} sm={6} className="tour-list-item-wrapper" onClick={props.onClick}>
            <Link to={'/tours/detail/' + props._id} className="">
                <div className="tour-list-item">
                    <div className="image" style={{
                        backgroundImage: "url(" + props.image.thumbnail + ")",
                    }}>
                    </div>
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
    );
}