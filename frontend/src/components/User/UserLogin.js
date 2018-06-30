"use strict";

import React from 'react';
import {Link} from 'react-router-dom';

import {AlertMessage} from '../AlertMessage';
import Page from '../Page';
import {Button, Col, ControlLabel, FormControl, FormGroup, Row} from "react-bootstrap";


class UserLogin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this)

    }


    handleFormChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            changed: true
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        let user = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.onSubmit(user);
    }

    render() {
        return (
            <Page className="login-page">
                <Row>
                    <Col className="login-container" xs={10} md={4} sm={6} lg={4} xsOffset={1} mdOffset={4} smOffset={3}
                         lgOffset={4}>
                        <div className="login-heading">LOGIN</div>
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup
                                controlId="username"
                                validationState={this.state.changed && this.state.username.length ? this.state.username.length < 5 || this.state.username.length > 200 ? 'error' : 'success' : null}
                            >
                                <ControlLabel>Username</ControlLabel>
                                <FormControl
                                    type="text"
                                    name="username"
                                    value={this.state.username}
                                    placeholder="Username"
                                    onChange={this.handleFormChange}
                                />
                            </FormGroup>
                            <FormGroup
                                controlId="password"
                                validationState={this.state.changed && this.state.password.length ? this.state.password.length < 5 || this.state.password.length > 200 ? 'error' : 'success' : null}
                            >
                                <ControlLabel>Password</ControlLabel>
                                <FormControl
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    placeholder="Password"
                                    onChange={this.handleFormChange}
                                />
                            </FormGroup>

                            <Button className="login-button" id="submit" type="submit"
                                    disabled={this.state.username === undefined || this.state.username === '' || this.state.password === undefined || this.state.password === ''}
                            >Login</Button>

                            <AlertMessage
                                className="md-row md-full-width">{this.props.error ? `${this.props.error}` : ''}</AlertMessage>
                        </form>
                        <div className="register-link">
                            Not registered yet?<br/><Link to={'/register'} className=""> &nbsp;Click
                            Here&nbsp;</Link> to Register!
                        </div>
                    </Col>
                </Row>
            </Page>
        );
    }
}

export default UserLogin;