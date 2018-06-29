import React from 'react';
import {FormGroup} from "react-bootstrap";
import PropTypes from 'prop-types';
import {Difficulities as Types} from '../../../constantLists/Difficulities';
import {TourInputSelect} from "./TourInputSelect";

const typeOptions = Object.keys(Types.names).map((key) => {
    return {label: Types.names[key], value: key}
});

export const TourDifficulty = (props) =>
    <FormGroup>
        <TourInputSelect isMulti={false} options={typeOptions}
                         onChange={props.onChange}
                         value={props.value}
                         placeholder='Difficulty'
        />
    </FormGroup>;

TourDifficulty.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
};