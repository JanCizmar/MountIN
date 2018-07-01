"use strict";

import React from 'react';

import TourEdit from '../components/Tours/TourEdit';

import UserService from '../services/UserService';


export class EditTourView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    edit(tour) {
        user._id = UserService.getCurrentUser().id


        UserService.update(tour).then(() => {
            this.props.history.push('/tours/detail/' + tour._id);
        }).catch((e) => {
            console.error(e);
            this.setState({
                error: e
            });
        });
    }

    render() {
        return (
            <TourEdit onSubmit={(tour) => this.edit(tour)} error={this.state.error}/>
        );
    }
}