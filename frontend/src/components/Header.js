"use strict";

import React from 'react';
import {withRouter} from 'react-router-dom'

import UserMenu from './UserMenu';

import {Nav, Navbar, NavItem} from "react-bootstrap";


class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar className="customNavbar">
                <Navbar.Header className="customNavbarHeading">
                    <Navbar.Brand className="customNavbarBrand">
                        <a href="#" onClick={() => this.props.history.push('/')}>{this.props.title}</a>
                    </Navbar.Brand>
                    <Navbar.Toggle className="burger-menu"/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} onClick={() => this.props.history.push('/')}>
                            Home
                        </NavItem>
                    </Nav>
                    <Nav pullRight>
                        <UserMenu/>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default withRouter(Header);