"use strict";

import React from 'react';

import Header from './Header';
import {Footer} from './Footer';
import {Grid} from "react-bootstrap";


export default class Page extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: ''
        }
    }

    render() {
        return (
            <section>
                <Header title="MountIn"/>
                <Grid>
                    {this.props.children}
                </Grid>
                <Footer/>
            </section>
        );
    }
}