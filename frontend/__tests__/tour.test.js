import React from 'react';
import renderer from 'react-test-renderer';
import TourListItem from "../src/components/Tours/TourListItem";
import data from "../src/sampleData/tours";


it('renders correctly', () => {
    const tree = renderer
        .create(<TourListItem {...data[0]}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
