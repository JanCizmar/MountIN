import React from 'react';
import {FormGroup} from "react-bootstrap";
import PropTypes from 'prop-types';
import Slider from 'rc-slider/lib/Slider';

export const TourPrice = (props) =>
    <div className={props.clname}>
        <FormGroup className="price">
            <Slider min={0} max={150} value={props.value} onChange={props.onChange} tipFormatter={props.value}/>
            <div className="value">{props.value}&nbsp;€</div>
        </FormGroup>
    </div>;

TourPrice.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired,
    clname: PropTypes.string
};//"price-wrapper" >