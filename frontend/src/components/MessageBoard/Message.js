"use strict";

export default function Message(props) {
    return (
        <div className="message">
            <div className="message-username">{props.username}</div>
            <div className="message-data">{props.data}</div>
        </div>
    );
}
