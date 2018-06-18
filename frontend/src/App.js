"use strict";

import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import {UserLoginView} from "./views/UserLoginView";
import {UserSignupView} from "./views/UserSignupView";

import {LandingPageView} from "./views/LandingPageView";
import {CreateTourView} from "./views/CreateTourView";
import {ListPageView} from "./views/ListPageView";
import ExampleView from "./views/ExampleView";

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'MountIN',
            routes: [
                {component: UserLoginView, path: '/login'},
                {component: CreateTourView, path: '/createTour'},
                {component: UserSignupView, path: '/register'},
                {component: ListPageView, path: '/list'},
                {component: ExampleView, path: '/example'},
                {component: LandingPageView, path: '/'}

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

