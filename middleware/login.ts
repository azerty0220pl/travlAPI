import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import 'dotenv/config';

const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization)
        if (verify(req.headers.authorization, process.env.TOKEN_KEY!))
            return next();
    return res.status(401).json({error: true, message: "Not Authorized"});
}

export default isAuthorized;