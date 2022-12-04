import { Router } from "express";
import { check } from "express-validator";
import {
    postRegisterNewUser,
    postLoginUser
} from "../controllers/authentication.controllers";

const authenticationRouter = Router();

// register new user
authenticationRouter.post(
    "/register",
    [
        check("email").normalizeEmail().isEmail().isLength({ max: 50 }),
        check("username").isLength({ min: 3, max: 20 }),
        check("passWord").isLength({ min: 6 })
    ],
    postRegisterNewUser
);

// login user
authenticationRouter.post(
    "/login",
    [
        check("email").isEmail().isLength({ max: 50 }),
        check("passWord").isLength({ min: 6 })
    ],
    postLoginUser
);

export default authenticationRouter;