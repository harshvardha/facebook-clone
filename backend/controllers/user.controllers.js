import User from "../models/User.model.js";
import createError from "../errors/createError.js";
import { StatusCodes } from "http-status-codes";
import { validationResult } from "express-validator";
import { genSaltSync, hashSync } from "bcrypt";

const putUpdateUser = async (req, res, next) => {
    try {
        const { errors } = validationResult(req);
        const { email, username } = req.body;
        if (email) {
            const index = errors.findIndex(error => error.param === "email");
            if (index !== -1) {
                return next(createError(StatusCodes.BAD_REQUEST, "Please provide correct email."));
            }
        }
        if (username) {
            const index = errors.findIndex(error => error.param === "username");
            if (index !== -1) {
                return next(createError(StatusCodes.BAD_REQUEST, "Please provide username with length between 3 and 50."));
            }
        }
        const userId = req.user.id;
        const updatedUser = await User.findByIdAndUpdate(userId, { ...req.body }, { new: true });
        const { password, updatedAt, ...others } = updatedUser._doc;
        res.status(StatusCodes.OK).json(others);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const putUpdatePassword = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(createError(StatusCodes.BAD_REQUEST, "Please provide password with min length 6."));
        }
        const userId = req.user.id;
        const { password } = req.body;
        const saltVal = genSaltSync(12);
        const hashPassword = hashSync(password, saltVal);
        await User.findByIdAndUpdate(userId, {
            $set: { password: hashPassword }
        });
        res.status(StatusCodes.OK).json({ message: "Account password updated." });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const userId = req.user.id;
        await User.findByIdAndDelete(userId);
        res.status(StatusCodes.OK).json({ message: "User deleted." });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getUser = async (req, res, next) => {
    try {
        const { query } = req.query;
        if (!query) {
            return next(createError(StatusCodes.UNPROCESSABLE_ENTITY, "Don't provide empty search query."));
        }
        const foundUser = await User.find({ username: query });
        if (!foundUser) {
            return next(createError(StatusCodes.OK)).json({ message: "User not found" });
        }
        const { password, updatedAt, ...others } = foundUser[0]._doc;
        res.status(StatusCodes.OK).json(others);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const putFollowUser = async (req, res, next) => {
    try {
        const id = req.params.userId;
        const userId = req.user.id;
        if (id !== userId) {
            const user = await User.findById(userId);
            const followedUser = await User.findById(id);
            if (!user.following.includes(id)) {
                await user.updateOne({ $push: { following: id } });
                await followedUser.updateOne({ $push: { followers: userId } });
                res.status(StatusCodes.OK).json({ message: `You followed ${followedUser.username}` });
            }
            else {
                return next(createError(StatusCodes.BAD_REQUEST, "You already follow this user."));
            }
        }
        else {
            return next(createError(StatusCodes.BAD_REQUEST, "You cannot follow yourself."));
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const putUnfollowUser = async (req, res, next) => {
    try {
        const id = req.params.userId;
        const userId = req.user.id;
        if (id !== userId) {
            const user = await User.findById(userId);
            const unFollowedUser = await User.findById(id);
            if (user.following.includes(id)) {
                await user.updateOne({ $pull: { following: id } });
                await unFollowedUser.updateOne({ $pull: { followers: userId } });
                res.status(StatusCodes.OK).json({ message: `You unfollowed ${unFollowedUser.username}` });
            }
        }
        else {
            return next(createError(StatusCodes.UNPROCESSABLE_ENTITY, "You cannot unfollow yourself."));
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getUserById = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        console.log(userId);
        if (!userId) {
            return next(createError(StatusCodes.BAD_REQUEST, "Please provide user id."));
        }
        const user = await User.findById(userId);
        console.log(user);
        if (!user) {
            return next(createError(StatusCodes.NOT_FOUND, "User not found."));
        }
        const response = {
            profilePicture: user.profilePictureUrl,
            username: user.username
        };
        res.status(StatusCodes.OK).json(response);
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