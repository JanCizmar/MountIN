"use strict";

import React from 'react';

import {Row} from "react-bootstrap";
import TourListItem from "./TourListItem";
import Loading from "../Loading";
import InfiniteScroll from 'react-infinite-scroll-component';
import propTypes from "prop-types";

export default function List(props) {
    let sizes = {
        xs: 12,
        sm: props.mapView ? 12 : 6,
        md: props.mapView ? 6 : 3,
        lg: props.mapView ? 6 : 3,
    };


    let tours = props.tours.map((tour) => {
        return <TourListItem key={tour._id} {...tour} {...sizes}
                             onClick={() => (props.onTourClick && props.onTourClick(tour._id))}/>
    });

    return (
        <Row>
            {props.loading && !tours.length && <Loading/> ||
            <InfiniteScroll
                dataLength={tours.length}
                next={props.loadMore}
                loader={<Loading/>}
                hasMore={props.hasMore}
                endMessage={
                    <div style={{textAlign: 'center'}}>
                        <b>No more tours :(</b>
                    </div>
                }
            >
                {tours}
            </InfiniteScroll>}
        </Row>
    );
}

List.propTypes = {
    loadMore: propTypes.func.isRequired,
    hasMore: propTypes.bool.isRequired,
    mapView: propTypes.bool,
    onTourClick: propTypes.func

};