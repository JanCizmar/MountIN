import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import toJson from 'enzyme-to-json';


import UserLogin from "../src/components/User/UserLogin";

configure({adapter: new Adapter()});

describe('<UserLogin />', () => {
    it('User login renders correctly', () => {
        const options = new ReactRouterEnzymeContext();
        const tree = shallow(
            <UserLogin/>,
            options.get());
        expect(toJson(tree)).toMatchSnapshot();
    });
});

describe('<UserSignup />', () => {
    it('User signup renders correctly', () => {
        const options = new ReactRouterEnzymeContext();
        const tree = shallow(
            <UserLogin/>,
            options.get());
        expect(toJson(tree)).toMatchSnapshot();
    });
});
