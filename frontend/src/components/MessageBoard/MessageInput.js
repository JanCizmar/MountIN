"use strict";

import React from 'react';
import {Button, FormControl, FormGroup} from "react-bootstrap";

class MessageInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.className}>
                <form onSubmit={this.props.onSubmit}>
                    <FormGroup controlId="messageBoardInput">
                        <FormControl
                            type="text"
                            value={this.props.message}
                            placeholder="Enter your message"
                            onChange={this.props.onInputChange}
                        />
                    </FormGroup>

                    <Button id="submit" type="submit"
                            disabled={this.props.message === ''}
                    >Submit</Button>
                </form>
            </div>
        );
    }
}

export default MessageInput;