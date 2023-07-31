import { Request, Response } from 'express';
import roomService from '../services/room';

interface Orders { [key: string]: { [key: string]: 1 | -1 } };
const orders: Orders = {
    number: { name: 1 },
    ascending: { price: 1 },
    descending: { price: -1 },
    status: { }
}

interface Filters { [key: string]: object };
const filters: Filters = {
    all: {},
    available: {  },
    booked: {  }
}

const roomController = {
    getPage: (req: Request, res: Response) => {
        roomService.fetchPage(parseInt(req.query.page as string) || 0, parseInt(req.query.limit as string) || 10, filters[req.query.filter as string || "all"], orders[req.query.order as string || "number"]).then(x => {
            if (typeof x === 'string')
                return res.json({ error: true, message: x });
            else
                return res.json({ room: x });
        });
    },
    getById: (req: Request, res: Response) => {
        roomService.fetchById(req.params.id).then(x => {
            if (typeof x === 'string')
                return res.json({ error: true, message: x });
            else
                return res.json({ room: x });
        });
    },
    update: (req: Request, res: Response) => {
        roomService.update(req.body.room).then(x => {
            if (x === 'Room updated')
                return res.json({ error: false, message: x });
            else
                return res.json({ error: true, message: x });
        });
    },
    new: (req: Request, res: Response) => {
        roomService.new(req.body.room).then(x => {
            if (x === 'Room saved')
                return res.json({ error: false, message: x });
            else
                return res.json({ error: true, message: x });
        });
    }
};

export default roomController;