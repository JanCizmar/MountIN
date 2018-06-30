"use strict";

import React from 'react';
import {withRouter} from 'react-router-dom';

import Message from './Message';
import MessageInput from './MessageInput';
import * as messageActions from "../../state/actions/messageBoard";
import {connect} from "react-redux";
import SocketService from "../../services/SocketService";
import EmojiOne from "emojione";

const sanitizeHtml = require('sanitize-html');
const allowedHtml = {
    allowedTags: ['img']
};

const io = SocketService.getSocket();

class MessageBoard extends React.Component {
    constructor(props) {
        super(props);
        console.log('Message board props', props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleEmojiClick = this.handleEmojiClick.bind(this);
        this.handleEmojiToggleClick = this.handleEmojiToggleClick.bind(this);
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

    handleSubmit(event) {
        event.preventDefault();
        let clean = sanitizeHtml(this.props.currentMessage, allowedHtml);
        console.log('Clean', clean);
        // If there is still something left after sanitization submit it
        if (clean !== '') {
            // Build the message
            let message = {
                tourId: this.props.tourId,
                userId: this.props.userId,
                username: this.props.username,
                userAvatar: '',     //TODO: Implement user avatar
                data: clean,
                createdAt: Date.now()
            };
            console.log('Send this to server', message);
            this.props.sendMessage(io, message);
        }
    }

    handleEmojiClick(emoji) {
        this.props.addEmoji(EmojiOne.toImage(emoji.native));
    }

    handleEmojiToggleClick() {
        this.props.toggleEmojiPicker();
    }

    componentDidMount() {
        // Fetch the message history
        this.props.fetchMessageHistory(this.props.tourId);
        // Joining the tour socket room
        this.joinTourRoom();
        // Register listener to receive messages
        this.listenToAddMessage();
    }

    componentWillUnmount() {
        // Clear messages from store
        this.props.clearMessages();
        // Disconnect socket
        SocketService.disconnect(io);
    }

    render() {
        let messages = this.props.messages.map((message, index) => {
            return <Message key={index} {...message}/>
        });
        console.log('All messages', this.props.messages);
        return (
            <div className="message-board-main">
                <div className="messages">
                    {messages}
                </div>
                <MessageInput messageData={this.props.currentMessage}
                              showEmojiPicker={this.props.showEmojiPicker}
                              onSubmit={this.handleSubmit}
                              onInputChange={this.handleInputChange}
                              handleEmojiClick={this.handleEmojiClick}
                              handleEmojiToggleClick={this.handleEmojiToggleClick}
                />
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        messages: store.messageBoard.messages,
        currentMessage: store.messageBoard.currentMessage,
        fetchState: store.messageBoard.fetchState,
        showEmojiPicker: store.messageBoard.showEmojiPicker
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
        clearCurrentMessage: () => {
            dispatch(messageActions.clearCurrentMessage())
        },
        updateCurrentMessage: (message) => {
            dispatch(messageActions.updateCurrentMessage(message))
        },
        addEmoji: (emoji) => {
            dispatch(messageActions.addEmoji(emoji));
        },
        toggleEmojiPicker: () => {
            dispatch(messageActions.toggleEmojiPicker());
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(MessageBoard));