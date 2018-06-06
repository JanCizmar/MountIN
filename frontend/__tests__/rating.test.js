import React from 'react';
import renderer from 'react-test-renderer';
import Rating from "../src/components/Rating";

it('renders correctly', () => {
    const tree = renderer
        .create(<Rating value={2}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
