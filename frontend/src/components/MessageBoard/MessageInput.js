"use strict";

import React from 'react';
import {FormGroup, FormControl, Button} from "react-bootstrap";
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import ContentEditable from 'react-sane-contenteditable';


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
                            tagName="h1"
                            className="my-class"
                            content={this.props.messageData}
                            editable={true}
                            maxLength={140}
                            multiLine={false}
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