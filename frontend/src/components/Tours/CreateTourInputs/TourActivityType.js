import React from 'react';
import {FormGroup} from "react-bootstrap";
import PropTypes from 'prop-types';
import {ActivityType as Types} from '../../../constantLists/ActivityType';
import {TourInputSelect} from "./TourInputSelect";

const typeOptions = Object.keys(Types.names).map((key) => {
    return {label: Types.names[key], value: key}
});

export const TourActivityType = (props) => {
    return <FormGroup>
        <TourInputSelect isMulti={false} options={typeOptions}
                         onChange={props.onChange}
                         value={props.value}
                         placeholder="Activity type"
        />
    </FormGroup>
};

TourActivityType.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
};