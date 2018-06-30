"use strict";

import React from 'react';
import {Button} from "react-bootstrap";
import 'emoji-mart/css/emoji-mart.css';
import {Emoji, Picker} from 'emoji-mart';
import ContentEditable from 'react-contenteditable';


class MessageInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let emojiset = 'emojione';
        let picker;
        if (this.props.showEmojiPicker) {
            picker = <Picker set={emojiset} title='' onSelect={this.props.handleEmojiClick} showPreview={false}
                             emojiSize	={16} style={{ position: 'absolute', bottom: '75px', left: '5px' }} />;
        }

        return (
            <div className="conversation-compose">
                    {picker}
                <div className="input-msg">
                    <form onSubmit={this.props.onSubmit}>
                        <Emoji className="emoji block" emoji='smiley' onClick={this.props.handleEmojiToggleClick} set={emojiset} size={24}/>

                        <ContentEditable
                            className="input-msg-box block"
                            html={this.props.messageData}
                            onChange={this.props.onInputChange}
                        />

                        <Button className="send block" id="submit" type="submit"
                                disabled={this.props.messageData === ''}
                        >
                            <span className="glyphicon glyphicon-circle-arrow-right "/>

                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default MessageInput;