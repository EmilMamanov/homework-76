import express, { Router } from 'express';
import { Message } from '../types';
import fileDb from '../fileDb';

const router: Router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { message } = req.body;
        const datetime = new Date().toISOString();
        const newMessage: Message = { message, datetime };

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
