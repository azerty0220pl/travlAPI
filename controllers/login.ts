import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import UserModel from '../models/user';
import 'dotenv/config';

const user: UserModel = {
    id: -1,
    name: "admin",
    email: "email@adress.com",
    phone: "123456789",
    joined: "some date",
    description: "Some hardcoded description",
    status: "Active"
}

const loginController = (req: Request, res: Response) => {
    if (req.body.username === user.name && req.body.password === "password")
        res.status(202).json({
            user: user,
            token: sign(String(user.id), process.env.TOKEN_KEY!)
        });
    else
        return res.status(401).json({ error: true, message: "Not Authorized" });
}

export default loginController;