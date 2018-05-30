"use strict";

import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import {UserLoginView} from "./views/UserLoginView";
import {UserSignupView} from "./views/UserSignupView";

import {LandingPageView} from "./views/LandingPageView";

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'Movie Example App',
            routes: [
                {component: UserLoginView, path: '/login'},
                {component: UserSignupView, path: '/register'},
                {component: LandingPageView, path: '/'},

            ]
        };
    }

    componentDidMount() {
        document.title = this.state.title;
    }

    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        {this.state.routes.map((route, i) => (<Route key={i} {...route}/>))}
                    </Switch>
                </Router>
            </div>
        );
    }
}

