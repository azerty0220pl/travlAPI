import { Request, Response } from 'express';
import bookingService from '../services/booking';

interface Orders { [key: string]: { [key: string]: 1 | -1 } };
const orders: Orders = {
    order: { order: 1 },
    name: { name: 1 },
    in: { in: 1 },
    out: { out: 1 }
}

interface Filters { [key: string]: object };
const filters: Filters = {
    all: {},
    progress: { refund: false }
}

const bookingController = {
    getPage: (req: Request, res: Response) => {
        bookingService.fetchPage(parseInt(req.query.page as string) || 0,
            parseInt(req.query.limit as string) || 10,
            filters[req.query.filter as string || "all"],
            orders[req.query.order as string || "order"]).then(data => {
                if (typeof data === 'string')
                    return res.status(400).json({ error: true, message: data });
                else
                    bookingService.count(filters[req.query.filter as string || "all"]).then(count => {
                        return res.json({ error: false, booking: data, count: count });
                    });
            });
    },
    getById: (req: Request, res: Response) => {
        bookingService.fetchById(req.params.id).then(data => {
            if (typeof data === 'string')
                return res.status(400).json({ error: true, message: data });
            else
                return res.json({ error: false, booking: data });
        });
    },
    update: (req: Request, res: Response) => {
        bookingService.update(req.body.booking).then(data => {
            if (typeof data === 'string')
                return res.status(400).json({ error: true, message: data });
            else
                return res.json({ error: false, booking: data });
        });
    },
    new: (req: Request, res: Response) => {
        bookingService.new(req.body.booking).then(data => {
            if (data !== 'Booking saved')
                return res.status(400).json({ error: true, message: data });
            else
                return res.json({ error: false, booking: data });
        });
    }
};

export default bookingController;