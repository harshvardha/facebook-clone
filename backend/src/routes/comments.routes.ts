import { Router } from "express";
import * as commentControllers from "../controllers/comment.controllers";
import verifyToken from "../middlewares/verifyAccessToken.middleware";

const commentRouter = Router();

commentRouter.post("/add/:postId", verifyToken, commentControllers.addComment);
commentRouter.delete("/:id", verifyToken, commentControllers.deleteComment);
commentRouter.get("/:postId", commentControllers.getComments);
commentRouter.post("/reply/:commentId", verifyToken, commentControllers.addReplyToComment);
commentRouter.put("/like/:commentId", verifyToken, commentControllers.putLikeOnComment);
commentRouter.put("/like/reply/:commentId", verifyToken, commentControllers.putLikeOnReplyComment);
commentRouter.put("/heart/:commentId", verifyToken, commentControllers.putHeartOnComment);
commentRouter.put("/heart/reply/:commentId", verifyToken, commentControllers.putHeartOnReplyComment);

export default commentRouter;