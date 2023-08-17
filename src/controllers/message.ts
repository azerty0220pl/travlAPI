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
        messageService.fetchPage(parseInt(req.query.page as string) || 0,
            parseInt(req.query.limit as string) || 10,
            filters[req.query.filter as string || "all"],
            orders[req.query.order as string || "date"]).then(data => {
                if (typeof data === 'string')
                    return res.status(500).json({ error: true, message: data });
                else
                    messageService.count(filters[req.query.filter as string || "all"]).then(count => {
                        return res.json({ error: false, booking: message, count: count });
                    });
            });
    },
    getById: (req: Request, res: Response) => {
        messageService.fetchById(req.params.id).then(data => {
            if (typeof data === 'string')
                return res.status(500).json({ error: true, message: data });
            else
                return res.json({ error: false, message: data });
        });
    },
    update: (req: Request, res: Response) => {
        let msg = req.body.booking;
        msg.id = req.params.id;

        messageService.update(msg).then(data => {
            if (data === 'Message updated')
                return res.json({ error: false, message: data });
            else
                return res.status(500).json({ error: true, message: data });
        });
    },
    new: (req: Request, res: Response) => {
        messageService.new(req.body.message).then(data => {
            if (data === 'Message saved')
                return res.json({ error: false, message: data });
            else
                return res.status(500).json({ error: true, message: data });
        });
    }
};

export default messageController;