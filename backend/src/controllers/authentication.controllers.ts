import { compareSync, hashSync, genSaltSync } from "bcrypt";
import { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import jsonwebtoken from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import dotenv from "dotenv";
import User from "../models/User.model";
import CustomError from "../errors/createError";
dotenv.config();

const postRegisterNewUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new CustomError(StatusCodes.BAD_REQUEST, "Please provide correct details."));
        }
        const { username, email, passWord } = req.body;
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return next(new CustomError(StatusCodes.BAD_REQUEST, "User already exist"));
        }
        const saltVal: string = genSaltSync(12);
        const hashedPassword: string = hashSync(passWord, saltVal);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });
        const { password, ...others } = newUser._doc;
        res.status(StatusCodes.CREATED).json(others);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const postLoginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
            return next(new CustomError(StatusCodes.BAD_REQUEST, "Please provide correct login credentials."));
        }
        const { email, passWord } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return next(new CustomError(StatusCodes.BAD_REQUEST, "User with email and password does not exist."));
        }
        const correctPassword = compareSync(passWord, user.password);
        if (!correctPassword) {
            return next(new CustomError(StatusCodes.BAD_REQUEST, "Wrong username or password"));
        }
        const secretKey: Secret = process.env.ACCESS_TOKEN_SECRET || "";
        const accessToken: string = jsonwebtoken.sign({
            id: user._id
        }, secretKey, { expiresIn: "20m" });
        const { password, ...others } = user._doc;
        res.status(StatusCodes.OK).json({ accessToken, others });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export {
    postRegisterNewUser,
    postLoginUser
};