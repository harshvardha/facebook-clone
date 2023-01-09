import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import createError from "../errors/createError.js";
import Post from "../models/Post.model.js";
import User from "../models/User.model.js";

const postCreatePost = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
            return next(createError(StatusCodes.UNPROCESSABLE_ENTITY, "Please provide description within 500 characters."));
        }
        const userId = req.user.id;
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

const putUpdatePost = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(createError(StatusCodes.UNPROCESSABLE_ENTITY, "Please provide description within 500 characters."));
        }
        const userId = req.user.id;
        const postId = req.params.postId;
        const post = await Post.findById(postId);
        if (post.userId === userId) {
            const updatedPost = await post.update({
                ...req.body
            }, { new: true });
            res.status(StatusCodes.OK).json(updatedPost);
        }
        else {
            return next(createError(StatusCodes.BAD_REQUEST, "You can only update your posts."));
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const deletePost = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const postId = req.params.postId;
        const post = await Post.findById(postId);
        if (post.userId === userId) {
            await post.deleteOne();
            res.status(StatusCodes.OK).json({ message: "Post deleted." });
        }
        else {
            return next(createError(StatusCodes.BAD_REQUEST, "You can only delete your posts."));
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const putLikePost = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const userId = req.user.id;
        const post = await Post.findById(postId);
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

const getPostById = async (req, res, next) => {
    try {
        const postId = req.params.postId;
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

const getTimelinePosts = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        const userPosts = await Post.find({ userId: userId });
        const friendsPost = await Promise.all(
            user.following.map(friendId => {
                return Post.find({ userId: friendId });
            })
        );
        res.status(StatusCodes.OK).json(userPosts.concat(...friendsPost));
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getUsersAllPosts = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const posts = await Post.find({ userId: userId });
        if (posts) {
            res.status(StatusCodes.OK).json(posts);
        }
        else {
            next(createError(StatusCodes.NOT_FOUND, "You have not posted yet."));
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
    getPostById,
    getTimelinePosts,
    getUsersAllPosts
}