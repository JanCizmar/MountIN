"use strict";

import React from 'react';
import {withRouter} from 'react-router-dom';

import {AlertMessage} from './AlertMessage';
import Page from './Page';
import {Button, Col, ControlLabel, FormControl, FormGroup} from "react-bootstrap";


class UserSignup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            passwordRepeat: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
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
            password: this.state.password,

        };

        this.props.onSubmit(user);
    }

    getValidState(inputName) {
        return this.getFormValidStates()[inputName];
    }

    getFormValidStates() {
        return {
            username: this.state.username.length < 5 || this.state.username.length > 200 ? 'error' : 'success',
            password: this.state.password.length < 5 || this.state.password.length > 200 ? 'error' : 'success',
            passwordRepeat: this.state.password !== this.state.passwordRepeat ? 'error' : 'success'
        };
    }

    isFormValid() {
        for (let state of Object.values(this.getFormValidStates())) {
            if (state === 'error') return false;
        }
        return true;
    };


    render() {
        return (
            <Page>
                <Col lg={4} lgOffset={4}>
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup
                            controlId="username"
                            validationState={this.getValidState('username')}
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
                            validationState={this.getValidState('password')}
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
                        <FormGroup
                            controlId="passwordRepeat"
                            validationState={this.getValidState('passwordRepeat')}
                        >
                            <ControlLabel>Passowrd repeat</ControlLabel>
                            <FormControl
                                name="passwordRepeat"
                                type="password"
                                value={this.state.passwordRepeat}
                                placeholder="Password again"
                                onChange={this.handleFormChange}
                            />
                        </FormGroup>

                        <Button id="submit" type="submit"
                                disabled={!this.isFormValid()}
                        >Register</Button>
                        <AlertMessage
                            className="md-row md-full-width">{this.props.error ? `${this.props.error}` : ''}</AlertMessage>
                    </form>
                </Col>
            </Page>
        );
    }
}

export default withRouter(UserSignup);