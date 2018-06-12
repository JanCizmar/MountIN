import React from 'react';
import Select from "react-select";

export const FilterSelect = (props) => {
    let onChange = (vals) =>
        props.onChange(vals.map((val) => val.value)); // return just values, not labels

    let value = props.value.map((val) => props.options.find(option => option.value === val)); //convert the value to expected

    return <Select {...props}
                   onChange={onChange}
                   value={value}
    />
};