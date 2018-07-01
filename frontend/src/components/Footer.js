"use strict";

import React from 'react';
import Styled from 'styled-components';


class PlainFooter extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.className}>
                <p>© {new Date().getFullYear()} MountIN. All rights reserved.</p>
            </div>
        );
    }
}

export const Footer = Styled(PlainFooter)`
    clear: both;
    position: relative;
    z-index: 10;
    height: 3em;
    margin-top: -3em;
    left: 0;
    right: 0;
    color:white;
    > p {
        text-align: center;
        margin: 0 0 -20px;
    }
`;