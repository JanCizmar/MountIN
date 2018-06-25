"use strict";

import React from 'react';
import {withRouter} from 'react-router-dom';

import Message from './Message';
import MessageInput from './MessageInput';
import * as messageActions from "../../state/actions/messageBoard";
import {connect} from "react-redux";
import io from "../../services/SocketService";


class MessageBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socketAPI: io(),
            socket: io().getSocket()
        };
        console.log(this.state);
        this.listenToAddMessage = this.listenToAddMessage.bind(this);
    }

    listenToAddMessage() {
        console.log('Listening for addMessage');
        this.state.socketAPI.listenForMessage(this.state.socket, function(payload) {
           this.props.updateMessages(payload);
        });
    }

    componentDidMount() {
        // Register listener to receive messages
        this.listenToAddMessage(this.state.socket);
    }

    componentWillUnmount() {
        // Clear messages from store
        this.props.clearMessages();
        // Disconnect socket
        this.state.socket.disconnect();
    }

    render() {
        let messages = this.props.messages.map((message, index) => {
            return <Message key={index}{...message}/>
        });

        return (
            <div className={this.props.className}>
                {messages}
                <MessageInput socket={this.state.socket} onMessageSubmit={this.props.sendMessage}/>
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