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
    active: { left: { $exists: false } },
    inactive: { left: { $exists: true } }
}

const userController = {
    getPage: (req: Request, res: Response) => {
        userService.fetchPage(parseInt(req.query.page as string) || 0, parseInt(req.query.limit as string) || 10, filters[req.query.filter as string || "all"], orders[req.query.order as string || "name"]).then(x => {
            if (typeof x === 'string')
                return res.json({ error: true, message: x });
            else
                return res.json({ users: x });
        });
    },
    getById: (req: Request, res: Response) => {
        userService.fetchById(req.params.id).then(x => {
            if (typeof x === 'string')
                return res.json({ error: true, message: x });
            else
                return res.json({ user: x });
        });
    },
    update: (req: Request, res: Response) => {
        userService.update(req.body.user).then(x => {
            if (x === 'User updated')
                return res.json({ error: false, message: x });
            else
                return res.json({ error: true, message: x });
        });
    },
    new: (req: Request, res: Response) => {
        userService.new(req.body.user).then(x => {
            if (x === 'User saved')
                return res.json({ error: false, message: x });
            else
                return res.json({ error: true, message: x });
        });
    }
};

export default userController;