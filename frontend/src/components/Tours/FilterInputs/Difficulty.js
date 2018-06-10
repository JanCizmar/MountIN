import React from 'react';
import {FormGroup} from "react-bootstrap";
import Select from "react-select";
import PropTypes from 'prop-types';
import {Difficulities as Types} from '../../../constantLists/Difficulities';

const typeOptions = Object.keys(Types.names).map((key) => {
    return {label: Types.names[key], value: key}
});

export const Difficulty = (props) =>
    <FormGroup>
        <Select isMulti={true} options={typeOptions}
                onChange={props.onChange}
                value={props.value}/>
    </FormGroup>;

Difficulty.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.array.isRequired
};