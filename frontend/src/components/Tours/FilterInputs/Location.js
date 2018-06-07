import React from 'react';
import {FormControl, FormGroup} from "react-bootstrap";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import {compose, withHandlers} from "recompose";
import PropTypes from 'prop-types';

export const Location = compose(
    withHandlers({
        onSelect: props => address => {
            props.onValueChange(address);
            if ((props.onLatLngChange) !== undefined) {
                props.onLatLngLoadingStarts && props.onLatLngLoadingStarts();
                geocodeByAddress(address).then(results => {
                    getLatLng(results[0]).then(res => {
                      props.onLatLngChange(res);
                      props.onLatLngLoadingFinished && props.onLatLngLoadingFinished();
                    });
                });
            }
        }
    })
)((props) =>
    <FormGroup className="location"
        controlId="location">
        <PlacesAutocomplete onChange={props.onValueChange} value={props.value} onSelect={props.onSelect}>
            {({getInputProps, suggestions, getSuggestionItemProps}) => (
                <div>
                    <FormControl
                        {...getInputProps({
                            placeholder: 'Search Places ...',
                            className: 'location-search-input'
                        })}
                    />
                    <div className={suggestions.length && 'autocomplete-dropdown-container'}>
                        {suggestions.map(suggestion => {
                            const className = suggestion.active ? 'suggestion-item active' : 'suggestion-item';
                            return (
                                <div {...getSuggestionItemProps(suggestion, {className})}>
                                    <span>{suggestion.description}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    </FormGroup>
);

Location.propTypes = {
    onLatLngChange: PropTypes.func,
    onValueChange: PropTypes.func.isRequired,
    onLatLngLoadingStarts: PropTypes.func,
    onLatLngLoadingFinished: PropTypes.func,
    value: PropTypes.string.isRequired
};