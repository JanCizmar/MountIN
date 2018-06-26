"use strict";

import React from 'react';

import UserService from '../services/UserService';

import UserDetail from '../components/UserDetail';


export class UserDetailView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: {
                tours: [],
                toursAttending: []
            }};
    }

    getuserdetails(){
            UserService.getUserDetails(UserService.getCurrentUser().id).then((data) => {
                //this.value.username = 'sdfg'
                this.setState({...this.state, value: data});
            }).catch((e) => {
                console.error(e);
                this.setState({
                    error: e
                });
            });
    }

    componentDidMount(){
        this.getuserdetails();
    }

    render() {
        return (
            <UserDetail {...this.state.value}/>
        );
    }
}