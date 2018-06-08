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
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#" onClick={() => this.props.history.push('/')}>{this.props.title}</a>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} onClick={() => this.props.history.push('/')}>
                            Home
                        </NavItem>
                        <NavItem eventKey={2} onClick={() => this.props.history.push('/list')}>
                            List
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