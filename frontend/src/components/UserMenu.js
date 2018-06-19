"use strict";

import React from 'react';
import {withRouter} from 'react-router-dom'

import UserService from '../services/UserService';
import {MenuItem, NavDropdown, NavItem} from "react-bootstrap";


class UserMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    logout() {
        UserService.logout();
        if (this.props.location.pathname !== '/') {
            this.props.history.push('/');
            return;
        }
        window.location.reload();
    }


    render() {
        if (UserService.isAuthenticated())
            return (
                <NavDropdown title={UserService.getCurrentUser().username} id="basic-nav-dropdown">
                    <MenuItem onClick={() => this.props.history.push('/profile')}>Profile</MenuItem>
                    <MenuItem onClick={() => this.logout()}>Logout</MenuItem>
                </NavDropdown>
            );

        return [
            <NavItem key={1} onClick={() => this.props.history.push('/login')}>Login</NavItem>,
            <NavItem key={2} onClick={() => this.props.history.push('/register')}>Register</NavItem>
        ];

    }
}

export default withRouter(UserMenu);