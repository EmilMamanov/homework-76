import express, { Router } from 'express';
import { Message } from '../types';
import fileDb from '../fileDb';
import crypto from 'crypto';

const router: Router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { message, author } = req.body;
        const datetime = new Date().toISOString();
        const id = crypto.randomUUID();

        const newMessage: Message = { id, message, author, datetime };

        await fileDb.saveMessage(newMessage);
        res.json(newMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const messages = await fileDb.getMessages();
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
