"use strict";

import React from 'react';

import {AlertMessage} from './AlertMessage';
import Page from './Page';
import {Button, Checkbox, Col, ControlLabel, FormControl, FormGroup, Row} from "react-bootstrap";


class UserSignup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            passwordRepeat: '',
            email: '',
            firstName: '',
            surname: '',
            phone: '',
            isInstructor: false
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
            email: this.state.email,
            firstName: this.state.firstName,
            surname: this.state.surname,
            phone: this.state.phone,
            professional: this.state.isInstructor
        };

        this.props.onSubmit(user);
    }

    getValidState(inputName) {
        return this.getFormValidStates()[inputName];
    }
    //Form checking: TODO when time - change feedback: https://react-bootstrap.github.io/components/forms/
    getFormValidStates() {
        return {
            username: this.state.username.length < 5 || this.state.username.length > 200 ? 'error' : 'success',
            password: this.state.password.length < 5 || this.state.password.length > 200 ? 'error' : 'success',
            passwordRepeat: this.state.password !== this.state.passwordRepeat || this.state.passwordRepeat.length < 5 ? 'error' : 'success',
            email: this.state.email.indexOf('@') < 1 || this.state.email.indexOf('.') < 3 ? 'error' : 'success',
            firstName: this.state.firstName.length < 3 || this.state.firstName.length > 200 ? 'error' : 'success',
            surname: this.state.surname.length < 3 || this.state.surname.length > 200 ? 'error' : 'success',
            phone: this.state.phone.match('[^+0-9]') ? 'error' : 'success'
        };
    }

    isFormValid() {
        for (let state of Object.values(this.getFormValidStates())) {
            if (state === 'error') return false;
        }
        return true;
    }

    onInstructorChange() {
        console.log(`calling`);
        this.setState({...this.state, isInstructor: !this.state.isInstructor});
    };


    render() {
        return (
            <Page>
                <Row>
                    <Col md={4} sm={6} mdOffset={4} smOffset={3}>
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
                                <ControlLabel>Password</ControlLabel>
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
                                <ControlLabel>Repeat Password</ControlLabel>
                                <FormControl
                                    name="passwordRepeat"
                                    type="password"
                                    value={this.state.passwordRepeat}
                                    placeholder="Password again"
                                    onChange={this.handleFormChange}
                                />
                            </FormGroup>
                            <FormGroup
                                controlId="email"
                                validationState={this.getValidState('email')}
                            >
                                <ControlLabel>E-Mail</ControlLabel>
                                <FormControl
                                    name="email"
                                    type="text"
                                    value={this.state.email}
                                    placeholder="Email"
                                    onChange={this.handleFormChange}
                                />
                            </FormGroup>
                            <FormGroup
                                controlId="firstName"
                                validationState={this.getValidState('firstName')}
                            >
                                <ControlLabel>First Name</ControlLabel>
                                <FormControl
                                    name="firstName"
                                    type="text"
                                    value={this.state.firstName}
                                    placeholder="First Name"
                                    onChange={this.handleFormChange}
                                />
                            </FormGroup>
                            <FormGroup
                                controlId="surname"
                                validationState={this.getValidState('surname')}
                            >
                                <ControlLabel>Surname</ControlLabel>
                                <FormControl
                                    name="surname"
                                    type="text"
                                    value={this.state.surname}
                                    placeholder="Surname"
                                    onChange={this.handleFormChange}
                                />
                            </FormGroup>
                            <FormGroup
                                controlId="phone"
                                validationState={this.getValidState('phone')}
                            >
                                <ControlLabel>Phone</ControlLabel>
                                <FormControl
                                    name="phone"
                                    type="text"
                                    value={this.state.phone}
                                    placeholder="Phone Number"
                                    onChange={this.handleFormChange}
                                />
                            </FormGroup>

                            <Checkbox name="c1" onChange={this.onInstructorChange.bind(this)}>
                                Are you a Professional instructor?
                            </Checkbox>

                            {this.state.isInstructor &&
                            <div>
                                <div>TODO: Here will be the certificate upload!</div>
                            </div>}




                            <Button id="submit" type="submit"
                                    disabled={!this.isFormValid()}
                            >Register</Button>
                            <AlertMessage
                                className="md-row md-full-width">{this.props.error ? `${this.props.error}` : ''}</AlertMessage>
                        </form>
                    </Col>
                </Row>
            </Page>
        );
    }
}

export default UserSignup;
