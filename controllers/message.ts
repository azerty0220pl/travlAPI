import { Request, Response } from 'express';
import messages from '../data/messages.json';

const messageController = (_req: Request, res: Response) => {
    res.json({ messages: messages });
}

export default messageController;