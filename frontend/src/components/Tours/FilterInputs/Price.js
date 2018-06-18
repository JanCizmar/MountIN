import React from 'react';
import {FormGroup} from "react-bootstrap";
import PropTypes from 'prop-types';
import Range from 'rc-slider/lib/Range';

export const Price = (props) =>
    <div className="price-wrapper">
        <FormGroup className="price">
            <div className="value min">{props.value[0] ? props.value[0] : 'Free'}</div>
            <Range min={0} max={500} value={props.value} onChange={props.onChange}/>
            <div className="value max">{props.value[1]}&nbsp;€</div>
        </FormGroup>
    </div>;

Price.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.array.isRequired
};