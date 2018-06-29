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

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleEmojiClick = this.handleEmojiClick.bind(this);
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

    handleInputChange(event, value) {
        console.log('HandleInputChnage', value)
        this.props.updateCurrentMessage(value);
    }

    handleSubmit() {
        let clean = sanitizeHtml(this.props.currentMessage, allowedHtml);
        console.log('Clean', clean);
        // If there is still something left after sanitization submit it
        if (clean !== '') {
            // Build the message
            let message = {
                tourId: this.props.tourId,
                creator: this.props.userId,
                data: clean
            };
            this.props.sendMessage(io, message);
        }
    }

    handleEmojiClick(emoji) {
        console.log('Emoji-Object', emoji);
        this.props.addEmoji(EmojiOne.toImage(emoji.native));
    }

    handleEmojiToggleClick() {
        this.props.toggleEmojiPicker();
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
            console.log(message);
            return <Message key={index}
                            message={message.data}
                            {...message}/>
        });

        return (
            <div className={this.props.className}>
                {messages}
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