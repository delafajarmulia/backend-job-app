import User from "../models/User";
import { JWT_SECRET } from "../utils/variables";
import { NextFunction, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { AuthRequest } from "../utils/types";

export const authMiddleware = async(req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(403).json({ error: 'Unauthorized request!'})
        return
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = verify(token, JWT_SECRET) as JwtPayload
        const id = payload.id 
        const userData = await User.findOne({_id: id})
        if(!userData){
            res.status(403).json({ error: 'Unathorized request! '})
            return
        }

        req.user = {
            id: userData._id,
            name: userData.name,
            email: userData.email,
            // role: userData.role,
        };

        next()
    } catch (error) {
        res.status(401).json({
            message: 'Invalid or expired token'
        })
        return
    }
}