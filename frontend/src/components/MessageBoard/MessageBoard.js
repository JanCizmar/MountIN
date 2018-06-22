"use strict";

import React from 'react';
import Message from './Message'
import {sendMessage} from "../../state/actions/messageBoard";

class MessageBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Load message history
    }

    componentWillUnmount() {
        // Delete state
    }

    getMessages() {
        props.messages.map((message) => {
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
                    <MessageInput onMessageSubmit={this.props.onSendMessage()}/>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        messages: state.messages
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSendMessage: (messageData) =>
            dispatch(sendMessage(messageData))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageBoard)