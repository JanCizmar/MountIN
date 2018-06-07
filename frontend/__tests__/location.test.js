import React from 'react';
import renderer from 'react-test-renderer';
import {Location} from "../src/components/Tours/FilterInputs/Location";
//Google maps mock
window.google = {
    maps: {
        places: {
            PlacesServiceStatus: {
                OK: true
            },
            AutocompleteService: class {
            }
        }
    }
};

it('renders correctly', () => {
    const tree = renderer
        .create(<Location value={"Hi"} onValueChange={() => {
        }}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});