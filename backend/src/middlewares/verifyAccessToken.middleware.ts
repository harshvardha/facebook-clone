import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import CustomError from "../errors/createError";
import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
dotenv.config();

const verifyToken = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const authHeader: string = req.headers.authorization || req.headers.Authorization || "";
        if (!authHeader?.startsWith("Bearer")) {
            return res.sendStatus(StatusCodes.UNAUTHORIZED);
        }
        const accessToken = authHeader.split(' ')[1];
        const secretKey: string = process.env.ACCESS_TOKEN_SECRET || "";
        jsonwebtoken.verify(
            accessToken,
            secretKey,
            (error, user) => {
                if (error) {
                    return next(new CustomError(StatusCodes.FORBIDDEN, "Token is not valid!"));
                }
                req.user = user;
                next();
            }
        );
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export default verifyToken;