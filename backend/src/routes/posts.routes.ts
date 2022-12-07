import { Router } from "express";
import { check } from "express-validator";
import {
    deletePost,
    getPostById,
    getTimelinePosts,
    postCreatePost,
    putLikePost,
    putUpdatePost,
    getUsersAllPosts,
    putHeartPost
} from "../controllers/post.controller";
import verifyToken from "../middlewares/verifyAccessToken.middleware";

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
    "/update/:postId",
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

// heart a post
postRouter.put("/heart/:postId", verifyToken, putHeartPost);

// get timeline posts
postRouter.get("/timeline", verifyToken, getTimelinePosts);

// get user's all posts
postRouter.get("/allPosts", verifyToken, getUsersAllPosts);

// get a post
postRouter.get("/:postId", getPostById);

export default postRouter;