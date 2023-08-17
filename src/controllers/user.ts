import { Request, Response } from 'express';
import userService from '../services/user';

interface Orders { [key: string]: { [key: string]: 1 | -1 } };
const orders: Orders = {
    name: { name: 1 },
    joined: { joined: 1 }
}

interface Filters { [key: string]: object };
const filters: Filters = {
    all: {},
    active: { status: true },
    inactive: { status: false }
}

const userController = {
    getPage: (req: Request, res: Response) => {
        userService.fetchPage(
            parseInt(req.query.page as string) || 0,
            parseInt(req.query.limit as string) || 10,
            filters[req.query.filter as string || "all"],
            orders[req.query.order as string || "name"]).then(data => {
                if (typeof data === 'string')
                    return res.status(400).json({ error: true, message: data });
                else
                    userService.count(filters[req.query.filter as string || "all"]).then(count => {
                        return res.json({ error: false, user: data, count: count });
                    });
            });
    },
    getById: (req: Request, res: Response) => {
        userService.fetchById(req.params.id).then(data => {
            if (typeof data === 'string')
                return res.status(400).json({ error: true, message: data });
            else
                return res.json({ error: false, user: data });
        });
    },
    update: (req: Request, res: Response) => {
        userService.update(req.body.user).then(data => {
            if (typeof (data) !== 'string')
                return res.json({ error: false, user: data });
            else
                return res.status(400).json({ error: true, message: data });
        });
    },
    new: (req: Request, res: Response) => {
        userService.new(req.body.user).then(data => {
            if (data === 'User saved')
                return res.json({ error: false, user: data });
            else
                return res.status(400).json({ error: true, message: data });
        });
    }
};

export default userController;