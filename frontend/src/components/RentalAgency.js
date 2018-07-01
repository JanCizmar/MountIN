"use strict";

import React from 'react';

import {connect} from "react-redux";
import * as actions from "../state/actions/rentalAgency";

class RentalAgency extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.props.dispatch(actions.fetchRentalAgencies());
    }
    render() {
        console.log(this.props.state.data);
        let elements = this.props.state.data.map(agency => { return (
        <div className="agency" key={agency._id}>
            <div className="name">{agency.name}</div>
            <div className="website"><a href={agency.website} target="_blank">{agency.website}</a></div>
            <div className="phone">Phone:&nbsp;{agency.contact.phone}</div>
            <div className="email">Email:&nbsp;{agency.contact.email}</div>

            <div className="types">Equipments: {agency.equipmentTypes.map(eq => <span key={eq}>{eq}&nbsp;</span>)}</div>
        </div>)
        });
        return (
            <div>
                {elements}
            </div>

        );
    }
}


export default connect(store => {
    return {
        state: store.rentalAgencies
    }
})(RentalAgency);