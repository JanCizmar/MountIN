import React from 'react';
import TourListItem from "../src/components/Tours/TourListItem";
import data from "../src/sampleData/tours";
import ReactRouterEnzymeContext from "react-router-enzyme-context";
import toJson from "enzyme-to-json";
import {configure, shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16/build/index";

configure({adapter: new Adapter()});


it('renders correctly', () => {
    const options = new ReactRouterEnzymeContext();
    const tree = shallow(
        <TourListItem {...data}/>,
        options.get());
    expect(toJson(tree)).toMatchSnapshot();
});
