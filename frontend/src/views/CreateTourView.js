"use strict";

import React from 'react';
import CreateTour from '../components/CreateTour'

export class CreateTourView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <CreateTour/>
        );
    }
}