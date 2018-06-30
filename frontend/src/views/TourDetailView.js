"use strict";

import React from 'react';
import TourDetailPage from "../components/Tours/TourDetailPage";
import UserService from "../services/UserService";
import * as actions from "../state/actions/tourDetail"
import connect from "react-redux/es/connect/connect";
import Loading from "../components/Loading";
import Modal from "react-bootstrap/es/Modal";
import Button from "react-bootstrap/es/Button";

class TourDetailPageView extends React.Component {

    componentDidMount() {
        this.props.dispatch(actions.getTourData(this.props.match.params.id));
    }

    onJoinTourToggle() {
        this.props.dispatch(actions.joinTourToggle());
    }

    onJoinToggleConfirmed() {
        this.props.dispatch(actions.joinToggleConfirmed(this.props.match.params.id, !this.props.state.joined));
    }

    onCloseModal() {
        this.props.dispatch(actions.closeModal());
    }

    render() {
        return (
            !this.props.state.data || this.props.state.loading && <Loading/> ||
            <TourDetailPage {...this.props.state.data}
                            onJoinTourToggle={this.onJoinTourToggle.bind(this)}
                            userId={UserService.getCurrentUser() && UserService.getCurrentUser().id}
                            username={UserService.getCurrentUser().username}
                            joined={this.props.state.joined}
                            mapCenter={this.props.state.mapCenter}
            >
                <div className="static-modal">
                    <Modal
                        onHide={this.onCloseModal.bind(this)}
                        show={this.props.state.showJoinDialog}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Join tour
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Do you really want to join the tour? You may leave the tour 24 hours before it's taking
                            place.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.onJoinToggleConfirmed.bind(this)}>Join</Button>
                            <Button onClick={this.onCloseModal.bind(this)}>Close</Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal
                        onHide={this.onCloseModal.bind(this)}
                        show={this.props.state.showLeaveDialog}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Leave tour
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Do you really want to leave this tour? :(
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.onJoinToggleConfirmed.bind(this)}>Leave</Button>
                            <Button onClick={this.onCloseModal.bind(this)}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </TourDetailPage>
        );
    }
}

export default connect(store => {
    return {
        state: store.tourDetail
    }
})(TourDetailPageView);
