import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageList from './components/MessageList/MessageList';
import MessageInput from './components/MessageInput/MessageInput';
import { Message } from './types';
import './App.css';

const API_URL = 'http://localhost:8000/messages';

const App: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const intervalId = setInterval(fetchMessages, 5000);

        return () => clearInterval(intervalId);
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(API_URL);
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async (message: string, author: string) => {
        try {
            console.log('Sending message:', { message, author });
            const requestData = {
                message,
                author,
            };

            await axios.post(API_URL, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            await new Promise(resolve => setTimeout(resolve, 1000));

            await fetchMessages();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div>
            <h1 className="app-title">Attractor chat</h1>
            <div className="chat-block">
                <MessageList messages={messages} />
                <MessageInput onSendMessage={sendMessage} />
            </div>
        </div>
    );
};

export default App;
