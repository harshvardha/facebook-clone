import { compareSync, hashSync, genSaltSync } from "bcrypt";
import { validationResult } from "express-validator";
import jsonwebtoken from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import dotenv from "dotenv";
import User from "../models/User.model.js";
import createError from "../errors/createError.js";
dotenv.config();

const postRegisterNewUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(createError(StatusCodes.BAD_REQUEST, "Please provide correct details."));
        }
        const { username, email, passWord } = req.body;
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return next(createError(StatusCodes.BAD_REQUEST, "User already exist"));
        }
        const saltVal = genSaltSync(12);
        const hashedPassword = hashSync(passWord, saltVal);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });
        const { password, ...others } = newUser;
        res.status(StatusCodes.CREATED).json(others);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const postLoginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(createError(StatusCodes.BAD_REQUEST, "Please provide correct login credentials."));
        }
        const { email, passWord } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return next(createError(StatusCodes.BAD_REQUEST, "User with email and password does not exist."));
        }
        const correctPassword = compareSync(passWord, user.password);
        if (!correctPassword) {
            return next(createError(StatusCodes.BAD_REQUEST, "Wrong username or password"));
        }
        const accessToken = jsonwebtoken.sign({
            id: user._id
        }, process.env.ACESS_TOKEN_SECRET, { expiresIn: "20m" });
        const { password, ...others } = user._doc;
        res.cookie("access_token", accessToken).status(StatusCodes.OK).json(others);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export {
    postRegisterNewUser,
    postLoginUser
};