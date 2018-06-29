"use strict";

import React from 'react';

import UserDetail from '../components/UserDetail';
import * as actions from "../state/actions/userDetail";
import connect from "react-redux/es/connect/connect";
import Loading from "../components/Loading";


class UserDetailView extends React.Component {
    componentDidMount() {
        this.props.dispatch(actions.getUserData(this.props.match.params.id));
    }

    render() {
        return (
            !this.props.state.data || this.props.state.loading && <Loading/> || <UserDetail {...this.props.state.data}/>
        );
    }
}

export default connect(store => {
    return {
        state: store.userDetail
    }
})(UserDetailView);
