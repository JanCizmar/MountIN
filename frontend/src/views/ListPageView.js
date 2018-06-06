"use strict";

import React from 'react';
import ListPage from '../components/Tours/ListPage'

export class ListPageView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ListPage/>
        );
    }
}