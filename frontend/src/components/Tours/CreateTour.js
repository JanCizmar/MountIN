"use strict";

import React from 'react';
import {withRouter} from 'react-router-dom';

import Page from '../Page';

import List from "./List";
import {CreateTourInputs} from "./TourInputs";

import {connect} from "react-redux";
import * as actions from '../../state/actions/createTour';

class CreateTour extends React.Component {

    onInputChange = value => {
        this.props.dispatch(actions.changeFilters(value));
        console.log(value)
    };


    submit() {
        this.props.dispatch(actions.createTours(this.props.state.toursInput));
    }

    render() {
        return (
            <Page>
                <CreateTourInputs value={this.props.state.toursInput} onChange={this.onInputChange}/>
            </Page>);
    }
}

export default connect(store => {
    return {
        state: store.createTour
    }
})(withRouter(CreateTour));