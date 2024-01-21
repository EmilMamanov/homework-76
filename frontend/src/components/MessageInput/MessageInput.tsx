import React, { useState } from 'react';
import SendIcon from '../../assets/pngwing.com.png';
import AuthorIcon from '../../assets/author-icon.png';
import MessageIcon from '../../assets/message-icon.png';

interface MessageInputProps {
    onSendMessage: (message: string, author: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && author.trim()) {
            onSendMessage(message, author);
            setMessage('');
        }
    };

    return (
        <div>
            <h2>Send a Message</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-block">
                    <label>
                        <img src={MessageIcon} alt="Author Icon" className="input-icon" />
                        <input className="message-input" type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        <img src={AuthorIcon} alt="Author Icon" className="input-icon" />
                        <input className="author-input" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                    </label>
                </div>
                <button className="send-btn" type="submit">
                    <img className="send-btn-icon" src={SendIcon} alt="Paper Plane Icon" />
                </button>
            </form>
        </div>
    );
};

export default MessageInput;