"use strict";

import React from 'react';
import MessageBoard from '../components/MessageBoard/MessageBoard'

export class CreateTourView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <MessageBoard/>
        );
    }
}