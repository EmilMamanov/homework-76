import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

interface MessageInputProps {
    onSendMessage: (message: string, author: string) => void;
    setFilterDate: (date: string | null) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, setFilterDate }) => {
    const [message, setMessage] = useState('');
    const [author, setAuthor] = useState('');
    const [messageError, setMessageError] = useState<string>('');
    const [authorError, setAuthorError] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!message.trim()) {
            setMessageError('Message cannot be empty');
            return;
        } else {
            setMessageError('');
        }

        if (!author.trim()) {
            setAuthorError('Author cannot be empty');
            return;
        } else {
            setAuthorError('');
        }

        onSendMessage(message, author);
        setMessage('');
        setAuthor('');
        setFilterDate(null);
    };


    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Send a Message
            </Typography>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField
                        label="Message"
                        variant="outlined"
                        fullWidth
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        error={Boolean(messageError)}
                        helperText={messageError}
                        InputProps={{
                            startAdornment: (
                                <AccountCircleIcon fontSize="small" sx={{ mr: 1 }} />
                            ),
                        }}
                    />
                </div>
                <div>
                    <TextField
                        label="Author"
                        variant="outlined"
                        fullWidth
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        error={Boolean(authorError)}
                        helperText={authorError}
                        InputProps={{
                            startAdornment: (
                                <MailOutlineIcon fontSize="small" sx={{ mr: 1 }} />
                            ),
                        }}
                    />
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    endIcon={<SendIcon />}
                    sx={{ mt: 2 }}
                >
                    Send
                </Button>
            </form>
        </div>
    );
};

export default MessageInput;
