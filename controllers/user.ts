import { Request, Response } from 'express';
import users from '../data/users.json';

const userController = (_req: Request, res: Response) => {
    res.json({ users: users });
}

export default userController;