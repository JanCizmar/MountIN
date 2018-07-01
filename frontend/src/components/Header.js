"use strict";

import React from 'react';
import {withRouter} from 'react-router-dom'

import UserMenu from './User/UserMenu';

import {Nav, Navbar, NavItem} from "react-bootstrap";
import headerImage from "../images/mountin.png"

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar className="customNavbar">
                <Navbar.Header className="customNavbarHeading">
                    <Navbar.Brand className="customNavbarBrand">
                        <a href="#" onClick={() => this.props.history.push('/')}><img className="logo" src={headerImage} /></a>
                    </Navbar.Brand>
                    <Navbar.Toggle className="burger-menu"/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} onClick={() => this.props.history.push('/createTour')}>
                            Create tour
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