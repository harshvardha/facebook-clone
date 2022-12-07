import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import CustomError from "../errors/createError";
import Post from "../models/Post.model";
import User from "../models/User.model";
import { Document } from "mongoose";

const postCreatePost = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new CustomError(StatusCodes.UNPROCESSABLE_ENTITY, "Please provide description within 500 characters."));
        }
        const userId: string = req.user.id;
        const newPost = await Post.create({
            userId,
            ...req.body
        });
        res.status(StatusCodes.CREATED).json(newPost);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const putUpdatePost = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new CustomError(StatusCodes.UNPROCESSABLE_ENTITY, "Please provide description within 500 characters."));
        }
        const userId: string = req.user.id;
        const postId = req.params.postId;
        const post: any = await Post.findById(postId);
        if (post.userId === userId) {
            const updatedPost = await post.update({
                ...req.body
            }, { new: true });
            res.status(StatusCodes.OK).json(updatedPost);
        }
        else {
            return next(new CustomError(StatusCodes.BAD_REQUEST, "You can only update your posts."));
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const deletePost = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const userId: string = req.user.id;
        const postId: string = req.params.postId;
        const post: any = await Post.findById(postId);
        if (post.userId === userId) {
            await post.deleteOne();
            res.status(StatusCodes.OK).json({ message: "Post deleted." });
        }
        else {
            return next(new CustomError(StatusCodes.BAD_REQUEST, "You can only delete your posts."));
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const putLikePost = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const postId: string = req.params.postId;
        const userId: string = req.user.id;
        const post: Document | any = await Post.findById(postId);
        if (!post.likes.includes(userId)) {
            await post.updateOne({
                $push: { likes: userId }
            });
            res.status(StatusCodes.OK).json({ message: "Post liked." });
        }
        else {
            await post.updateOne({
                $pull: { likes: userId }
            });
            res.status(StatusCodes.OK).json({ message: "Post disliked." });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const putHeartPost = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const postId: string = req.params.postId;
        const userId: string = req.user.id;
        const post: Document | any = await Post.findById(postId);
        if (!post.hearts.includes(userId)) {
            await post.updateOne({
                $push: { hearts: userId }
            });
            res.status(StatusCodes.OK).json({ message: "Heart added." });
        }
        else {
            await post.updateOne({
                $pull: { hearts: userId }
            });
            res.status(StatusCodes.OK).json({ message: "Heart removed." })
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getPostById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postId: string = req.params.postId;
        const post = await Post.findById(postId);
        if (post) {
            return res.status(StatusCodes.OK).json(post);
        }
        res.status(StatusCodes.NOT_FOUND).json({ message: "Post not found." });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getTimelinePosts = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const userId: string = req.user.id;
        const user: Document | any = await User.findById(userId);
        const userPosts = await Post.find({ userId: userId }).populate("userId");
        const friendsPost = await Promise.all(
            user.following.map((friendId: string) => {
                Post.find({ userId: friendId }).populate("userId");
            })
        );
        res.status(StatusCodes.OK).json(userPosts.concat(...friendsPost));
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getUsersAllPosts = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const userId: string = req.user.id;
        const posts = await Post.find({ userId: userId }).populate("userId");
        if (posts) {
            res.status(StatusCodes.OK).json(posts);
        }
        else {
            next(new CustomError(StatusCodes.NOT_FOUND, "You have not posted yet."));
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export {
    postCreatePost,
    putUpdatePost,
    deletePost,
    putLikePost,
    putHeartPost,
    getPostById,
    getTimelinePosts,
    getUsersAllPosts
}