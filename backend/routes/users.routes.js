import { Router } from "express";
import { check } from "express-validator";
import {
    putUpdateUser,
    putUpdatePassword,
    deleteUser,
    getUser,
    putFollowUser,
    putUnfollowUser,
    getUserById
} from "../controllers/user.controllers.js";
import verifyToken from "../middlewares/verifyAccessToken.middleware.js";

const userRouter = Router();

// update user
userRouter.put(
    "/update",
    [
        check("email").isEmail(),
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

// get user by id
userRouter.get("/user/:userId", verifyToken, getUserById);

// follow a user
userRouter.put("/follow/:userId", verifyToken, putFollowUser);

// unfollow a user
userRouter.put("/unfollow/:userId", verifyToken, putUnfollowUser);

export default userRouter;