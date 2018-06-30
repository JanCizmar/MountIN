"use strict";

import React from 'react';

import UserLogin from '../components/User/UserLogin';

import UserService from '../services/UserService';


export class UserLoginView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    login(user) {
        UserService.login(user.username, user.password).then(() => {
            this.props.history.push('/');
        }).catch((e) => {
            console.error(e);
            this.setState({
                error: e
            });
        });
    }

    render() {
        return (
            <UserLogin onSubmit={(user) => this.login(user)} error={this.state.error}/>
        );
    }
}