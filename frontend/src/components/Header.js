"use strict";

import React from 'react';
import {Toolbar, Button} from 'react-md';
import {withRouter} from 'react-router-dom'

import KebabMenu from './KebabMenu';


class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Toolbar
                colored
                nav={<div style={{display: "inline"}} className="buttons__group">
                    <Button onClick={() => this.props.history.push('/')} icon>home</Button>
                    <Button onClick={() => this.props.history.push('/list')} flat>List</Button>
                </div>
                }
                title={this.props.title}
                actions={<KebabMenu id="toolbar-colored-kebab-menu"/>}>
            </Toolbar>
        );
    }
}

export default withRouter(Header);