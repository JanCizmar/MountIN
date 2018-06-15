"use strict";

import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import {UserLoginView} from "./views/UserLoginView";
import {UserSignupView} from "./views/UserSignupView";

import {LandingPageView} from "./views/LandingPageView";
import {CreateTourView} from "./views/CreateTourView";
import {ListPageView} from "./views/ListPageView";
import {ImageUploadView} from "./views/ImageUploadView"

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
                {component: ImageUploadView, path: '/uploadImage'},
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

