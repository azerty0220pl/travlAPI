import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import userService from '../services/user';
import 'dotenv/config';
import UserModel from '../models/user';

const loginController = (req: Request, res: Response) => {
    userService.fetchOne(req.body.username).then(user => {
        if (typeof(user) !== "string" && req.body.password === (user as UserModel).password)
            res.status(202).json({
                error: false,
                user: user,
                token: sign(String((user as UserModel).id), process.env.TOKEN_KEY!)
            });
        else
            return res.status(401).json({ error: true, message: "Not Authorized" });
    })
}

export default loginController;