import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import userService from '../services/user';
import 'dotenv/config';
import UserModel from '../models/user';
import bcrypt from "bcrypt";

const loginController = {
    login: (req: Request, res: Response) => {
        userService.fetchOne(req.body.username).then(async user => {
            if (typeof (user) !== "string") {
                const x = await bcrypt.compare(req.body.password, user.password)
                if (x)
                    return res.status(202).json({
                        error: false,
                        user: user,
                        token: sign(String((user as UserModel)._id), process.env.TOKEN_KEY!)
                    });

                return res.status(401).json({ error: true, message: "Not Authorized" });
            }
            
            return res.status(401).json({ error: true, message: "Not Authorized" });
        });
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