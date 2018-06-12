import React from 'react';
import {FormGroup} from "react-bootstrap";
import PropTypes from 'prop-types';
import {ActivityType as Types} from '../../../constantLists/ActivityType';
import {FilterSelect} from "./FilterSelect";

const typeOptions = Object.keys(Types.names).map((key) => {
    return {label: Types.names[key], value: key}
});

export const ActivityType = (props) => {
    return <FormGroup>
        <FilterSelect isMulti={true} options={typeOptions}
                      onChange={props.onChange}
                      value={props.value}
                      placeholder="Activity type"
        />
    </FormGroup>
};

ActivityType.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.array.isRequired
};