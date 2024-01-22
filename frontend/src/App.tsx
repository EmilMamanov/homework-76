import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageList from './components/MessageList/MessageList';
import MessageInput from './components/MessageInput/MessageInput';
import { Message } from './types';
import './App.css';

const API_URL = 'http://localhost:8000/messages';

const App: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [filterDate, setFilterDate] = useState<string | null>(null);

    useEffect(() => {
        const intervalId = setInterval(fetchMessages, 5000);

        return () => clearInterval(intervalId);
    }, [filterDate]);

    const fetchMessages = async () => {
        try {
            const url = filterDate ? `${API_URL}?datetime=${filterDate}` : API_URL;

            const response = await axios.get(url);
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
                <MessageInput onSendMessage={sendMessage} setFilterDate={setFilterDate} />
            </div>
        </div>
    );
};

export default App;
