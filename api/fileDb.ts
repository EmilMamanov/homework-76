import { promises as fs } from 'fs';
import { Message } from './types';
import crypto from 'crypto';

const messagesFilePath: string = './messages/messages.json';

async function initializeMessagesFile() {
    try {
        await fs.access(messagesFilePath);
    } catch (error) {
        await fs.writeFile(messagesFilePath, '[]', 'utf-8');
    }
}

initializeMessagesFile();

const fileDb = {
    async init() {
        await initializeMessagesFile();
    },

    async saveMessage(message: Message): Promise<void> {
        await initializeMessagesFile();

        const { message: msg, datetime, id, author } = message || {};

        const messageId = id || crypto.randomUUID();
        const messageAuthor = author || "Default Author";

        const messagesContent = await fs.readFile(messagesFilePath, 'utf-8');
        const messages = JSON.parse(messagesContent) as Message[];

        messages.push({ id: messageId, message: msg, datetime, author: messageAuthor });

        await fs.writeFile(messagesFilePath, JSON.stringify(messages), 'utf-8');
    },


    async getMessages(): Promise<Message[]> {
        const messagesContent = await fs.readFile(messagesFilePath, 'utf-8');
        const messages = JSON.parse(messagesContent) as Message[];

        return messages.slice(0, 30);
    },
};

export default fileDb;
