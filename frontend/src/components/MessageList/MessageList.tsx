import React from 'react';
import { Message } from '../../types';
import '../../App.css';
import { List, ListItem, Typography } from '@mui/material';
import dayjs from 'dayjs';

interface MessageListProps {
    messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    return (
        <div className="message-block">
            <Typography variant="h6" gutterBottom>
                Chat Messages
            </Typography>
            <List>
                {messages.map((message) => (
                    <ListItem key={message._id}>
                        <Typography>
                            <strong>{message.author}:</strong> {message.message} ({formatMessageDate(message.datetime)})
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

const formatMessageDate = (datetime: string): string => {
    const messageDate = dayjs(datetime);
    const today = dayjs();

    if (messageDate.isSame(today.subtract(1, 'day'), 'day')) {
        return 'Вчера';
    }

    if (!messageDate.isSame(today, 'day')) {
        if (messageDate.year() !== today.year()) {
            return messageDate.format('DD.MM.YYYY HH:mm');
        }

        return messageDate.format('DD.MM HH:mm');
    }

    return messageDate.format('HH:mm');
};

export default MessageList;
