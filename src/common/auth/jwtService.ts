import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as jsonwebtoken from "jsonwebtoken";

export function validateTokenMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers?.authorization
    const token = authHeader?.split(' ')[1]

    console.log('token', token)

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jsonwebtoken.verify(token, process.env.TOKEN_SECRET as string, (err, user) => {
        console.log('err', err)
        console.log('user', user)

        if (err) return res.sendStatus(StatusCodes.FORBIDDEN)

        next()
    })
}