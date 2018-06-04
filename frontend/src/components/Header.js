"use strict";

import React from 'react';
import {withRouter} from 'react-router-dom'

import KebabMenu from './KebabMenu';

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
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} onClick={() => this.props.history.push('/')}>
                        Home
                    </NavItem>
                    <NavItem eventKey={2} onClick={() => this.props.history.push('/list')}>
                        List
                    </NavItem>
                   <KebabMenu />
                </Nav>
            </Navbar>
        );
    }
}

export default withRouter(Header);