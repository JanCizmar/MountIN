"use strict";

import React from 'react';
import {withRouter} from 'react-router-dom';

import Message from './Message';
import MessageInput from './MessageInput';
import * as messageActions from "../../state/actions/messageBoard";
import {connect} from "react-redux";
import SocketService from "../../services/SocketService";

const io = SocketService.getSocket();


class MessageBoard extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.currentMessage);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    onAddMessage(message) {
        this.props.updateMessages(message);
    }

    listenToAddMessage() {
        console.log('Listening for addMessage');
        SocketService.listenForMessage(io, message => this.onAddMessage(message));
    }

    joinTourRoom() {
        console.log('Joining tour room ', this.props.tourId);
        SocketService.joinTourRoom(io, this.props.tourId);
    }

    handleInputChange(event) {
        this.props.updateCurrentMessage(event.target.value);
    }

    handleSubmit() {
        // Build the message
        let message = {
            tourId: this.props.tourId,
            creator: this.props.userId,
            data: this.props.currentMessage
        };
        this.props.sendMessage(io, message);
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
        SocketService.disconnect(io);
    }

    render() {
        let messages = this.props.messages.map((message, index) => {
            return <Message key={index}{...message}/>
        });

        return (
            <div className={this.props.className}>
                {messages}
                <MessageInput message={this.props.currentMessage} onSubmit={this.handleSubmit}
                              onInputChange={this.handleInputChange}/>
            </div>
        );
    }

}

const mapStateToProps = store => {
    return {
        messages: store.messageBoard.messages,
        currentMessage: store.messageBoard.currentMessage,
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
        },
        updateCurrentMessage: (message) => {
            dispatch(messageActions.updateCurrentMessage(message))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(MessageBoard));