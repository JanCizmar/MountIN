import {
    SEND_MESSAGE
} from "../actions/messageBoard";

export default function messages(messages = [], action) {
    switch(action.type) {
        case SEND_MESSAGE:
           return [
               ...messages,
               action.messageData
           ]
        default:
            return messages;
    }
}