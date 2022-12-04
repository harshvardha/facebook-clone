import Comment from "../models/Comment.model";
import ReplyComment from "../models/CommentReply.model"
import CustomError from "../errors/createError";
import Post from "../models/Post.model";
import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";

const addComment = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const userId: string = req.user.id;
        const postId: string = req.params.postId;
        const { description } = req.body;
        await Comment.create({
            userId,
            postId,
            description
        });
        res.status(StatusCodes.CREATED).json({ message: "Comment Created." });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const deleteComment = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;
        const userId: string = req.user.id;
        const comment = await Comment.findById(id);
        const post = await Post.findById(id);
        if (comment?.userId === userId || post?.userId === userId) {
            await Comment.findByIdAndDelete(id);
            res.status(StatusCodes.OK).json({ message: "Comment Deleted" });
        }
        else {
            next(new CustomError(StatusCodes.FORBIDDEN, "You can only delete your comments."));
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postId = req.params.postId;
        const comments = await Comment.find({ postId: postId });
        if (comments) {
            res.status(StatusCodes.OK).json(comments);
        }
        else {
            next(new CustomError(StatusCodes.NOT_FOUND, "No Comments Found."));
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const addReplyToComment = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const commentId = req.params.commentId;
        const comment = await Comment.findById(commentId);
        if (comment) {
            const userId = req.user.id;
            const { postId, description } = req.body;
            const replyComment = await ReplyComment.create({
                userId,
                postId,
                description
            });
            await comment.updateOne({
                $push: { reply: replyComment._id }
            });
            res.status(StatusCodes.CREATED).json({ message: "Comment added." });
        }
        else {
            next(new CustomError(StatusCodes.NOT_FOUND, "Comment to which you are replying does not exist."));
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export {
    addComment,
    deleteComment,
    getComments,
    addReplyToComment
};