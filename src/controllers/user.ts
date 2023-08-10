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
        userService.fetchPage(parseInt(req.query.page as string) || 0,
            parseInt(req.query.limit as string) || 10,
            filters[req.query.filter as string || "all"],
            orders[req.query.order as string || "name"]).then(data => {
                if (typeof data === 'string')
                    return res.json({ error: true, message: data });
                else
                    userService.count().then(count => {
                        return res.json({ error: false, booking: data, count: count });
                    });
            });
    },
    getById: (req: Request, res: Response) => {
        userService.fetchById(req.params.id).then(data => {
            if (typeof data === 'string')
                return res.json({ error: true, message: data });
            else
                return res.json({ error: false, user: data });
        });
    },
    update: (req: Request, res: Response) => {
        let user = req.body.user;
        user.id = req.params.id;

        userService.update(user).then(data => {
            if (data === 'User updated')
                return res.json({ error: false, message: data });
            else
                return res.json({ error: true, message: data });
        });
    },
    new: (req: Request, res: Response) => {
        userService.new(req.body.user).then(data => {
            if (data === 'User saved')
                return res.json({ error: false, message: data });
            else
                return res.json({ error: true, message: data });
        });
    }
};

export default userController;