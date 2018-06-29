import React from 'react';
import Select from "react-select";

export const TourInputSelect = (props) => {
    let onChange = (val) => {
      props.onChange(val.value); // return just values, not labels
    };
    //console.log(props)
    let value = props.options.find(option => option.value === props.value); //convert the value to expected
    return <Select {...props}
                   onChange={onChange}
                   value={value}
    />
};