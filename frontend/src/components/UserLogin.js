"use strict";

import React from 'react';
import {Link, withRouter} from 'react-router-dom';

import {AlertMessage} from './AlertMessage';
import Page from './Page';
import {Button, Col, ControlLabel, FormControl, FormGroup} from "react-bootstrap";


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
            [event.target.name]: event.target.value
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
            <Page>
                <Row>
                    <Col lg={4} lgOffset={4}>
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup
                                controlId="username"
                                validationState={this.state.username.length < 5 || this.state.username.length > 200 ? 'error' : 'success'}
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
                                validationState={this.state.password.length < 5 || this.state.password.length > 200 ? 'error' : 'success'}
                            >
                                <ControlLabel>Passowrd</ControlLabel>
                                <FormControl
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    placeholder="Password"
                                    onChange={this.handleFormChange}
                                />
                            </FormGroup>

                            <Button id="submit" type="submit"
                                    disabled={this.state.username === undefined || this.state.username === '' || this.state.password === undefined || this.state.password === ''}
                            >Login</Button>
                            <Link to={'/register'} className="md-cell">Not registered yet?</Link>
                            <AlertMessage
                                className="md-row md-full-width">{this.props.error ? `${this.props.error}` : ''}</AlertMessage>
                        </form>
                    </Col>
                </Row>
            </Page>
        );
    }
}

export default withRouter(UserLogin);