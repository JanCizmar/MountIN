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
            picker = <Picker set={emojiset} title='' onSelect={this.props.handleEmojiClick} showPreview={false}/>;
        }

        return (
            <div className={this.props.className}>
                {picker}
                <div className={'messageBoard-input'}>
                    <form onSubmit={this.props.onSubmit}>
                        <ContentEditable
                            html={this.props.messageData}
                            onChange={this.props.onInputChange}
                        />
                        <Emoji emoji='smiley' onClick={this.props.handleEmojiToggleClick} set={emojiset} size={24}/>

                        <Button id="submit" type="submit"
                                disabled={this.props.messageData === ''}
                        >Submit</Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default MessageInput;