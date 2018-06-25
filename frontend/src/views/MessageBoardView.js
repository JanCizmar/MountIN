"use strict";

import React from 'react';
import Page from "../components/Page";
import MessageBoard from "../components/MessageBoard/MessageBoard";

export class MessageBoardView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Page>
                <MessageBoard/>
            </Page>
        );
    }
}