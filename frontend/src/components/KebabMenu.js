"use strict";

import React from 'react';
import {withRouter} from 'react-router-dom'

import UserService from '../services/UserService';
import {MenuItem, NavDropdown} from "react-bootstrap";


class KebabMenu extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                <MenuItems {...this.props}/>
            </NavDropdown>
        );
    }
}

function MenuItems(props) {
    function logout() {
        UserService.logout();
        if (props.location.pathname !== '/') {
            props.history.push('/');
            return;
        }
        window.location.reload();
    }


    return UserService.isAuthenticated() ? [
            <MenuItem key={1}>{UserService.getCurrentUser().username}</MenuItem>,
            <MenuItem key={2} onClick={() => logout()}>Logout</MenuItem>]
        :
        [
            <MenuItem key={1} onClick={() => props.history.push('/login')}>Login</MenuItem>
        ];
}

export default withRouter(KebabMenu);