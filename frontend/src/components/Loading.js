"use strict";

import React from 'react';
import ReactLoading from 'react-loading';

export default function Loading() {
    const style = {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "50px",
        marginBottom: "50px"
    };

    return (<div style={style}><ReactLoading type="spin" color="green"/></div>);
};