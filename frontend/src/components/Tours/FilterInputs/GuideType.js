import React from 'react';
import {FormGroup} from "react-bootstrap";
import Select from "react-select";
import PropTypes from 'prop-types';
import {GuideType as Types} from '../../../constantLists/GuideType';

const typeOptions = Object.keys(Types.names).map((key) => {
    return {label: Types.names[key], value: key}
});

export const GuideType = (props) =>
    <FormGroup>
        <Select isMulti={true} options={typeOptions}
                onChange={props.onChange}
                value={props.value}/>
    </FormGroup>;

GuideType.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.array.isRequired
};