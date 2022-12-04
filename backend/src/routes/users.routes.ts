import { Router } from "express";
import { check } from "express-validator";
import {
    putUpdateUser,
    putUpdatePassword,
    deleteUser,
    getUser,
    putFollowUser,
    putUnfollowUser
} from "../controllers/user.controllers";
import verifyToken from "../middlewares/verifyAccessToken.middleware";

const userRouter = Router();

// update user
userRouter.put(
    "/update",
    [
        check("email").isLength({ max: 50 }).isEmail(),
        check("username").isLength({ min: 3, max: 50 })
    ],
    verifyToken,
    putUpdateUser
);

// update password
userRouter.put(
    "/updatePassword",
    [
        check("password").isLength({ min: 6 })
    ],
    verifyToken,
    putUpdatePassword
);

// delete user
userRouter.delete("/delete", verifyToken, deleteUser);

// get a user
userRouter.get("/search", getUser);

// follow a user
userRouter.put("/follow/:userId", verifyToken, putFollowUser);

// unfollow a user
userRouter.put("/unfollow/:userId", verifyToken, putUnfollowUser);

export default userRouter;