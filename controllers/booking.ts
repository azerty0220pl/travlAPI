import { Request, Response } from 'express';
import bookings from '../data/bookings.json';

const bookingController = (_req: Request, res: Response) => {
    res.json({ bookings: bookings });
}

export default bookingController;