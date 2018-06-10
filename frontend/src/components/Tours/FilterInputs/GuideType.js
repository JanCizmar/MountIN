import React from 'react';
import {FormGroup} from "react-bootstrap";
import PropTypes from 'prop-types';
import {GuideType as Types} from '../../../constantLists/GuideType';
import {FilterSelect} from "./FilterSelect";

const typeOptions = Object.keys(Types.names).map((key) => {
    return {label: Types.names[key], value: key}
});

export const GuideType = (props) =>
    <FormGroup>
        <FilterSelect isMulti={true} options={typeOptions}
                      onChange={props.onChange}
                      value={props.value}
                      placeholder='Guide type'
        />
    </FormGroup>;

GuideType.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.array.isRequired
};