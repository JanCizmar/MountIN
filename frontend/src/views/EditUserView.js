"use strict";

import React from 'react';

import UserEdit from '../components/User/UserEdit';

import UserService from '../services/UserService';


export class EditUserView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    edit(user) {
        user._id = UserService.getCurrentUser().id;
        delete user.password;
        UserService.update(user).then(() => {
            this.props.history.push('/profile');
        }).catch((e) => {
            console.error(e);
            this.setState({
                error: e
            });
        });
    }

    render() {
        return (
            <UserEdit onSubmit={(user) => this.edit(user)} error={this.state.error}/>
        );
    }
}