import { Request, Response } from 'express';
import messageService from '../services/message';

interface Orders { [key: string]: { [key: string]: 1 | -1 } };
const orders: Orders = {
    date: { date: 1 }
}

interface Filters { [key: string]: object };
const filters: Filters = {
    all: {},
    read: { read: false, archived: false },
    archived: { archived: false }
}

const messageController = {
    getPage: (req: Request, res: Response) => {
        messageService.fetchPage(parseInt(req.query.page as string) || 0, parseInt(req.query.limit as string) || 10, filters[req.query.filter as string || "all"], orders[req.query.order as string || "date"]).then(x => {
            if (typeof x === 'string')
                return res.json({ error: true, message: x });
            else
                return res.json({ error: false, message: x });
        });
    },
    getById: (req: Request, res: Response) => {
        messageService.fetchById(req.params.id).then(x => {
            if (typeof x === 'string')
                return res.json({ error: true, message: x });
            else
                return res.json({ error: false, message: x });
        });
    },
    update: (req: Request, res: Response) => {
        let msg = req.body.booking;
        msg.id = req.params.id;

        messageService.update(msg).then(x => {
            if (x === 'Message updated')
                return res.json({ error: false, message: x });
            else
                return res.json({ error: true, message: x });
        });
    },
    new: (req: Request, res: Response) => {
        messageService.new(req.body.message).then(x => {
            if (x === 'Message saved')
                return res.json({ error: false, message: x });
            else
                return res.json({ error: true, message: x });
        });
    }
};

export default messageController;