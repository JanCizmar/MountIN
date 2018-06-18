"use strict";

import React from 'react';

import {Row} from "react-bootstrap";
import TourListItem from "./TourListItem";
import Loading from "../Loading";
import InfiniteScroll from 'react-infinite-scroll-component';
import propTypes from "prop-types";

export default function List(props) {
    let tours = props.tours.map((tour) => {
        return <TourListItem key={tour._id} {...tour}/>
    });

    return (
        <Row>
            <InfiniteScroll
                dataLength={tours.length}
                next={props.loadMore}
                loader={<Loading/>}
                hasMore={props.hasMore}
                endMessage={
                    <p style={{textAlign: 'center'}}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                {tours}
            </InfiniteScroll>
        </Row>
    )
        ;
}

List.propTypes = {
    loadMore: propTypes.func.isRequired,
    hasMore: propTypes.bool.isRequired
};