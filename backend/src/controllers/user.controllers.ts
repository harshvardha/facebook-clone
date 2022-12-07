import User from "../models/User.model";
import CustomError from "../errors/createError";
import { StatusCodes } from "http-status-codes";
import { Result, ValidationError, validationResult } from "express-validator";
import { genSaltSync, hashSync } from "bcrypt";
import { Request, Response, NextFunction } from "express";
import { Document } from "mongoose";

const putUpdateUser = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const { errors }: any = validationResult(req);
        const { email, username } = req.body;
        if (email) {
            const index = errors.findIndex((error: ValidationError) => error.param === "email");
            if (index !== -1) {
                return next(new CustomError(StatusCodes.BAD_REQUEST, "Please provide correct email."));
            }
        }
        if (username) {
            const index = errors.findIndex((error: ValidationError) => error.param === "username");
            if (index !== -1) {
                return next(new CustomError(StatusCodes.BAD_REQUEST, "Please provide username with length between 3 and 50."));
            }
        }
        const userId: string = req.user.id;
        const updatedUser: Document | any = await User.findByIdAndUpdate(userId, { ...req.body }, { new: true });
        const { password, updatedAt, ...others } = updatedUser._doc;
        res.status(StatusCodes.OK).json(others);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const putUpdatePassword = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const errors: Result<ValidationError> = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new CustomError(StatusCodes.BAD_REQUEST, "Please provide password with min length 6."));
        }
        const userId: string = req.user.id;
        const { password } = req.body;
        const saltVal: string = genSaltSync(12);
        const hashPassword: string = hashSync(password, saltVal);
        await User.findByIdAndUpdate(userId, {
            $set: { password: hashPassword }
        });
        res.status(StatusCodes.OK).json({ message: "Account password updated." });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const deleteUser = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const userId: string = req.user.id;
        await User.findByIdAndDelete(userId);
        res.status(StatusCodes.OK).json({ message: "User deleted." });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { query } = req.query;
        if (!query) {
            return next(new CustomError(StatusCodes.UNPROCESSABLE_ENTITY, "Don't provide empty search query."));
        }
        const foundUser = await User.find({ username: query });
        if (!foundUser) {
            return next(new CustomError(StatusCodes.OK, "User not found"));
        }
        const { password, updatedAt, ...others } = foundUser[0]._doc;
        res.status(StatusCodes.OK).json(others);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const searchId = req.params.userId;
        if (!searchId) {
            return next(new CustomError(StatusCodes.UNPROCESSABLE_ENTITY, "Please provide correct user id."));
        }
        const foundUser = await User.findById(searchId);
        if (!foundUser) {
            return next(new CustomError(StatusCodes.NOT_FOUND, "User not found"));
        }
        const { password, updatedAt, ...others } = foundUser._doc;
        res.status(StatusCodes.OK).json(others);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const putFollowUser = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.userId;
        const userId: string = req.user.id;
        if (id !== userId) {
            const user: Document | any = await User.findById(userId);
            const followedUser: Document | any = await User.findById(id);
            if (!user.following.includes(id)) {
                await user.updateOne({ $push: { following: id } });
                await followedUser.updateOne({ $push: { followers: userId } });
                res.status(StatusCodes.OK).json({ message: `You followed ${followedUser.username}` });
            }
            else {
                return next(new CustomError(StatusCodes.BAD_REQUEST, "You already follow this user."));
            }
        }
        else {
            return next(new CustomError(StatusCodes.BAD_REQUEST, "You cannot follow yourself."));
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const putUnfollowUser = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.userId;
        const userId: string = req.user.id;
        if (id !== userId) {
            const user: Document | any = await User.findById(userId);
            const unFollowedUser: Document | any = await User.findById(id);
            if (user.following.includes(id)) {
                await user.updateOne({ $pull: { following: id } });
                await unFollowedUser.updateOne({ $pull: { followers: userId } });
                res.status(StatusCodes.OK).json({ message: `You unfollowed ${unFollowedUser.username}` });
            }
        }
        else {
            return next(new CustomError(StatusCodes.UNPROCESSABLE_ENTITY, "You cannot unfollow yourself."));
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export {
    putUpdateUser,
    putUpdatePassword,
    deleteUser,
    getUser,
    getUserById,
    putFollowUser,
    putUnfollowUser
}