import { Router } from "express";
import { check } from "express-validator";
import {
    deletePost,
    getPostById,
    getTimelinePosts,
    postCreatePost,
    putLikePost,
    putUpdatePost
} from "../controllers/post.controller.js";
import verifyToken from "../middlewares/verifyAccessToken.middleware.js";

const postRouter = Router();

// create a post
postRouter.post(
    "/create",
    [
        check("description").isLength({ max: 500 })
    ],
    verifyToken,
    postCreatePost
);

// update a post
postRouter.put(
    "/upadte/:postId",
    [
        check("description").isLength({ max: 500 })
    ],
    verifyToken,
    putUpdatePost
);

// delete a post
postRouter.delete("/delete/:postId", verifyToken, deletePost);

// like a post
postRouter.put("/like/:postId", verifyToken, putLikePost);

// get timeline posts
postRouter.get("/timeline", verifyToken, getTimelinePosts);

// get a post
postRouter.get("/:postId", getPostById);

export default postRouter;