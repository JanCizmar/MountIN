"use strict";

import React from 'react';
import Message from './Message'
import {bindActionCreators} from 'react-redux'
import * as messageActions from "../../state/actions/messageBoard";

class MessageBoard extends React.Component {
    constructor(props) {
        super(props);
        this.props.socket.on('addMessage', message => {
            this.props.actions.updateMessages(message)
        });
    }

    componentDidMount() {
        // Connect to server websocket
        this.props.actions.connectToSocket();
        // Get message history over REST
        this.props.actions.fetchMessageHistory(this.props.tourId);
    }

    componentWillUnmount() {
        // Disconnect and delete message state
    }

    getMessages() {
        this.props.messages.map((message) => {
            return <Message key={message._id} {...message}/>
        });
    }

    render() {
        return (
            <div className={this.props.className}>
                <div className='message-list'>
                    {this.getMessages()}
                </div>
                <div className='message-input'>
                    <MessageInput onMessageSubmit={this.props.sendMessage}/>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        messages: state.messageBoard.messages,
        socket: state.messageBoard.socket
    }
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(messageActions, dispatch)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageBoard)