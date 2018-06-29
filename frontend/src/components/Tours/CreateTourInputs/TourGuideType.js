import React from 'react';
import {FormGroup} from "react-bootstrap";
import PropTypes from 'prop-types';
import {GuideType as Types} from '../../../constantLists/GuideType';
import {TourInputSelect} from "./TourInputSelect";

const typeOptions = Object.keys(Types.names).map((key) => {
    return {label: Types.names[key], value: key}
});

export const TourGuideType = (props) =>
    <FormGroup>
        <TourInputSelect isMulti={false} options={typeOptions}
                         onChange={props.onChange}
                         value={props.value}
                         placeholder='Guide type'
        />
    </FormGroup>;

TourGuideType.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
};