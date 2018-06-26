"use strict";

import React from 'react';
import {withRouter} from 'react-router-dom';

import Message from './Message';
import MessageInput from './MessageInput';
import * as messageActions from "../../state/actions/messageBoard";
import {connect} from "react-redux";
import SocketService from "../../services/SocketService";


class MessageBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: SocketService.getSocket()
        };
    }

    onAddMessage(message) {
        this.props.updateMessages(message);
    }

    listenToAddMessage() {
        console.log('Listening for addMessage');
        SocketService.listenForMessage(this.state.socket, message => this.onAddMessage(message));
    }

    joinTourRoom() {
        console.log('Joining tour room ', this.props.tourId);
        SocketService.joinTourRoom(this.state.socket, this.props.tourId);
    }

    componentDidMount() {
        // Register listener to receive messages
        this.listenToAddMessage();
        // Joining the tour socket room
        this.joinTourRoom();
    }

    componentWillUnmount() {
        // Clear messages from store
        this.props.clearMessages();
        // Disconnect socket
        SocketService.disconnect(this.state.socket);
    }

    render() {
        let messages = this.props.messages.map((message, index) => {
            return <Message key={index}{...message}/>
        });

        return (
            <div className={this.props.className}>
                {messages}
                <MessageInput socket={this.state.socket} userId={this.props.userId}
                              tourId={this.props.tourId} submitMessage={this.props.sendMessage}/>
            </div>
        );
    }

}

const mapStateToProps = store => {
    return {
        messages: store.messageBoard.messages,
        fetchState: store.messageBoard.fetchState
    }
};

const mapDispatchToProps = dispatch => {
    return {
        sendMessage: (socket, message) => {
            dispatch(messageActions.sendMessage(socket, message))
        },
        fetchMessageHistory: (tourId) => {
            dispatch(messageActions.fetchMessageHistory(tourId))
        },
        updateMessages: (message) => {
            dispatch(messageActions.updateMessages(message))
        },
        clearMessages: () => {
            dispatch(messageActions.clearMessages())
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(MessageBoard));