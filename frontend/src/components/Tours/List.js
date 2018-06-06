"use strict";

import React from 'react';

import {Row} from "react-bootstrap";
import TourListItem from "./TourListItem";
import Loading from "../Loading";


export default function List(props) {
    let tours = props.tours.map((tour) => {
        return <TourListItem key={tour.id} {...tour}/>
    });

    return (
        <Row>
            {props.loading && <Loading/>}
            {tours}
        </Row>
    );
}