import { Request, Response } from 'express';
import roomService from '../services/room';

interface Orders { [key: string]: { [key: string]: 1 | -1 } };
const orders: Orders = {
    number: { name: 1 },
    ascending: { price: 1 },
    descending: { price: -1 },
    status: {}
}

interface Filters { [key: string]: object };
const filters: Filters = {
    all: {},
    available: {},
    booked: {}
}

const roomController = {
    getPage: (req: Request, res: Response) => {
        roomService.fetchPage(parseInt(req.query.page as string) || 0,
            parseInt(req.query.limit as string) || 10,
            filters[req.query.filter as string || "all"],
            orders[req.query.order as string || "number"]).then(data => {
                if (typeof data === 'string')
                    return res.status(400).json({ error: true, message: data });
                else
                    roomService.count(filters[req.query.filter as string || "all"]).then(count => {
                        return res.json({ error: false, room: data, count: count });
                    });
            });
    },
    getById: (req: Request, res: Response) => {
        roomService.fetchById(req.params.id).then(data => {
            if (typeof data === 'string')
                return res.status(400).json({ error: true, message: data });
            else
                return res.json({ error: false, room: data });
        });
    },
    update: (req: Request, res: Response) => {
        roomService.update(req.body.room).then(data => {
            if (typeof data === 'string')
                return res.status(400).json({ error: true, message: data });
            else
                return res.json({ error: false, room: data });
        });
    },
    new: (req: Request, res: Response) => {
        roomService.new(req.body.room).then(data => {
            if (data !== "Room saved")
                return res.status(400).json({ error: true, message: data });
            else
                return res.json({ error: false, room: data });
        });
    }
};

export default roomController;