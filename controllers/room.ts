import { Request, Response } from 'express';
import rooms from '../data/rooms.json';

const roomController = (_req: Request, res: Response) => {
    res.json({ rooms: rooms });
}

export default roomController;