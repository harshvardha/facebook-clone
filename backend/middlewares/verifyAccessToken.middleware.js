import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import createError from "../errors/createError.js";
import { StatusCodes } from "http-status-codes";
dotenv.config();

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (!authHeader?.startsWith("Bearer")) {
            return res.sendStatus(StatusCodes.UNAUTHORIZED);
        }
        const accessToken = authHeader.split(' ')[1];
        jsonwebtoken.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET,
            (error, user) => {
                if (error) {
                    return next(createError(StatusCodes.FORBIDDEN, "Token is not valid!"));
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