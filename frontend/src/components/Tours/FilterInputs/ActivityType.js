import React from 'react';
import {FormGroup} from "react-bootstrap";
import Select from "react-select";
import PropTypes from 'prop-types';
import {ActivityType as Types} from '../../../constantLists/ActivityType';

const typeOptions = Object.keys(Types.names).map((key) => {
    return {label: Types.names[key], value: key}
});

export const ActivityType = (props) =>
    <FormGroup>
        <Select isMulti={true} options={typeOptions}
                onChange={props.onChange}
                value={props.value}

        />
    </FormGroup>;

ActivityType.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.array.isRequired
};