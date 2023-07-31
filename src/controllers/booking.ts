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
        bookingService.fetchPage(parseInt(req.query.page as string) || 0, parseInt(req.query.limit as string) || 10, filters[req.query.filter as string || "all"], orders[req.query.order as string || "order"]).then(x => {
            if (typeof x === 'string')
                return res.json({ error: true, message: x });
            else
                return res.json({ error: false, booking: x });
        });
    },
    getById: (req: Request, res: Response) => {
        bookingService.fetchById(req.params.id).then(x => {
            if (typeof x === 'string')
                return res.json({ error: true, message: x });
            else
                return res.json({ error: false, booking: x });
        });
    },
    update: (req: Request, res: Response) => {
        let book = req.body.booking;
        book.id = req.params.id;

        bookingService.update(book).then(x => {
            if (x === 'Booking updated')
                return res.json({ error: false, booking: x });
            else
                return res.json({ error: true, message: x });
        });
    },
    new: (req: Request, res: Response) => {
        bookingService.new(req.body.booking).then(x => {
            if (x === 'Booking saved')
                return res.json({ error: false, booking: x });
            else
                return res.json({ error: true, message: x });
        });
    }
};

export default bookingController;