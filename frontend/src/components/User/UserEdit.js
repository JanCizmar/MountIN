"use strict";

import React from 'react';

import {AlertMessage} from '../AlertMessage';
import Page from '../Page';
import {Button, Col, ControlLabel, FormControl, FormGroup, Row} from "react-bootstrap";
import UserService from "../../services/UserService";


class UserEdit extends React.Component {
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
            isInstructor: false,

        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);


    }

    getuserdetails() {
        UserService.getUserDetails(UserService.getCurrentUser().id).then((data) => {
            this.setState({...this.state, ...data});
        }).catch((e) => {
            console.error(e);
            this.setState({
                error: e
            });
        });
    }

    componentDidMount() {
        this.getuserdetails();
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

    getFormValidStates() {
        return {
            username: this.state.changed && this.state.username.length ? this.state.username.length < 5 || this.state.username.length > 200 ? 'error' : 'success' : null,
            email: this.state.changed && this.state.email.length ? this.state.email.indexOf('@') < 1 || this.state.email.indexOf('.') < 3 ? 'error' : 'success' : null,
            firstName: this.state.changed && this.state.firstName.length ? this.state.firstName.length < 3 || this.state.firstName.length > 200 ? 'error' : 'success' : null,
            surname: this.state.changed && this.state.surname.length ? this.state.surname.length < 3 || this.state.surname.length > 200 ? 'error' : 'success' : null,
            phone: this.state.changed && this.state.phone.length ? this.state.phone.match('[^+0-9]') ? 'error' : 'success' : null
        };
    }

    isFormValid() {
        for (let state of Object.values(this.getFormValidStates())) {
            if (state === null) return false;
            if (state === 'error') return false;
        }
        return true;
    }

    onInstructorChange() {
        this.setState({...this.state, isInstructor: !this.state.isInstructor});
    };


    render() {
        return (
            <Page className="signup-page">
                <Row>{/*console.log(this.state)*/}
                    <Col className="signup-container" xs={10} md={6} sm={8} lg={6} xsOffset={1} mdOffset={3}
                         smOffset={2} lgOffset={3}>
                        <div className="signup-heading">Change account details</div>
                        <form onSubmit={this.handleSubmit}>
                            <Col className="name" md={6} sm={6}>
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
                            </Col>
                            <Col className="name" md={6} sm={6}>
                                <FormGroup
                                    md={6} sm={6}
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
                            </Col>
                            {/*<FormGroup
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
                            </FormGroup> */}
                            <FormGroup>
                                <ControlLabel>Username</ControlLabel>
                                <FormControl.Static>{this.state.username}</FormControl.Static>
                            </FormGroup>
                            <Col className="name" md={8} sm={8}>
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
                            </Col>
                            <Col className="name" md={4} sm={4}>
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
                            </Col>
                            <Col className="name" md={12} sm={12}>
                                {/*<Checkbox {props.professional && 'checked'} name="c1" onChange={(val) => {this.onInstructorChange.bind(this)(val);this.handleFormChange(val)}}>
                                    Are you a Professional instructor?
                                </Checkbox>*/}

                                {this.state.isInstructor &&
                                <div>
                                    <p>File upload here</p>
                                </div>}
                            </Col>

                            <Button className="signup-button" id="submit" type="submit"
                                    disabled={!this.isFormValid()}
                            >Change</Button>
                            <Col className="name" md={12} sm={12}>
                                <AlertMessage
                                    className="">{this.props.error ? `${this.props.error}` : ''}
                                </AlertMessage>
                            </Col>
                        </form>
                    </Col>
                </Row>
            </Page>
        );
    }
}

export default UserEdit;
