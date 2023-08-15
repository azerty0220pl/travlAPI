import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import userService from '../services/user';
import 'dotenv/config';
import UserModel from '../models/user';
import bcrypt from "bcrypt";

const loginController = {
    login: async (req: Request, res: Response) => {
        console.log(req.body.username === "admin" && req.body.password === "password");
        const user = await userService.fetchOne(req.body.username);
        if (typeof (user) !== "string" && await bcrypt.compare(req.body.password, user.password))
            return res.status(202).json({
                error: false,
                user: user,
                token: sign(String((user as UserModel)._id), process.env.TOKEN_KEY!)
            });
        return res.status(401).json({ error: true, message: "Not Authorized" });
    },
    logged: (req: Request, res: Response) => {
        userService.fetchOne(req.body.username).then(user => {
            if (typeof (user) !== "string")
                return res.status(202).json({
                    error: false,
                    user: user
                });
            return res.status(401).json({ error: true, message: "Not Authorized" });
        })
    }
}

export default loginController;