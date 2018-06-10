import React from 'react';
import {FormGroup} from "react-bootstrap";
import PropTypes from 'prop-types';
import {Difficulities as Types} from '../../../constantLists/Difficulities';
import {FilterSelect} from "./FilterSelect";

const typeOptions = Object.keys(Types.names).map((key) => {
    return {label: Types.names[key], value: key}
});

export const Difficulty = (props) =>
    <FormGroup>
        <FilterSelect isMulti={true} options={typeOptions}
                      onChange={props.onChange}
                      value={props.value}
                      placeholder='Difficulty'
        />
    </FormGroup>;

Difficulty.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.array.isRequired
};