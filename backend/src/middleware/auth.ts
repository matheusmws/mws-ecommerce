import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import User from "../models/User";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) throw new ApiError(401, "Unauthorized");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        if (typeof decoded.id !== 'string') throw new ApiError(400, "Invalid ID");

        req.user = await User.findById(decoded.id);
        if (!req.user) throw new ApiError(404, "User not found");

        next();
    } catch (error) {
        if (error instanceof ApiError) {
            next(error);
        } else {
            next(new ApiError(500, "Internal Server Error"));
        }
    }
};
