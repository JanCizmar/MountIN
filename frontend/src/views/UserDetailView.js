"use strict";

import React from 'react';

import UserDetail from '../components/User/UserDetail';
import * as actions from "../state/actions/userDetail";
import connect from "react-redux/es/connect/connect";
import Loading from "../components/Loading";
import UserService from "../services/UserService";


class UserDetailView extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id || UserService.getCurrentUser().id;
        this.props.dispatch(actions.getUserData(id));
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
