"use strict";

import React from 'react';
import {FormGroup, FormControl, Button} from "react-bootstrap";
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import ContentEditable from 'react-contenteditable';


class MessageInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.className}>
                <form onSubmit={this.props.onSubmit}>
                    <div className={'messageBoard-input'}>
                        <ContentEditable
                            html={this.props.messageData}
                            onChange={this.props.onInputChange}
                        />
                    </div>
                    <Button id="submit" type="submit"
                            disabled={this.props.messageData === ''}
                    >Submit</Button>
                </form>
                <Picker set='emojione' title='' onSelect={this.props.handleEmojiClick} />
                <span onClick={this.props.toggleEmojiPicker}>{'😎'}</span>
            </div>
        );
    }
}

export default MessageInput;