import React from 'react';
import { Message } from '../../types';
import '../../App.css';

interface MessageListProps {
    messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    return (
        <div className="message-block">
            <h2 className="chat-title">Chat Messages</h2>
            <ul>
                {messages.map((message) => (
                    <li key={message._id}>
                        <strong>{message.author}:</strong> {message.message} ({message.datetime})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MessageList;