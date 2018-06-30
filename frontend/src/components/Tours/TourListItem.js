"use strict";

import React from 'react';
import {Col} from "react-bootstrap";
import Rating from "../Rating";
import {withRouter} from 'react-router-dom';

function TourListItem(props) {
    return (
        <Col xs={props.xs || 12} sm={props.sm || 6} md={props.md || 3} lg={props.lg || 3}
             className="tour-list-item-wrapper" onClick={props.onClick}>
            {/*<Link to={'/tours/detail/' + props._id} className="">*/}
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
                <div className="date">  {new Intl.DateTimeFormat('en-GB', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                }).format(new Date(props.date))}</div>

                <div className="price">{props.cost > 0 ? props.cost + " €" : "Free"}</div>

                <div className="type">
                    {props.type === 1 &&
                    <div className="other">Other</div>
                    }
                    {props.type ===2 &&
                    <div className="hiking">Hiking</div>
                    }
                    {props.type ===3 &&
                    <div className="skiing">Skiing</div>
                    }
                    {props.type === 4 &&
                    <div className="biking">Biking</div>
                    }
                </div>
                <div className="difficulty">
                    {props.difficulty === 1 &&
                    <div className="easy">Easy</div>
                    }
                    {props.difficulty === 2 &&
                    <div className="med">Intermediate</div>
                    }
                    {props.difficulty ===3 &&
                    <div className="hard">Expert</div>
                    }
                </div>
                <a className="redirect" onClick={() => props.history.push('/tours/detail/' + props._id)}>Click here for more details</a>
                <div className="bottom">
                    <div className="guided">{props.creator.professional ? 'Guided' : ''}</div>
                    <Rating value={props.rating}/>
                </div>
            </div>
            {/*</Link>*/}
        </Col>
    );
}

export default withRouter(TourListItem)
