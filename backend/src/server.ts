import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "mongoose";
const helmet = require("helmet");
import morgan from "morgan";
import CustomError from "./interface/Error";
import authenticationRouter from "./routes/authentication.routes";
import postRouter from "./routes/posts.routes";
import userRouter from "./routes/users.routes";
import commentRouter from "./routes/comments.routes";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI: string = process.env.DATABASE_URI || "";

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors({
    origin: "*"
}));

app.use("/authentication", authenticationRouter);
app.use("/posts", postRouter);
app.use("/users", userRouter);
app.use("/comments", commentRouter);

app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message || "Server error. We are fixing it";
    return res.status(status).json({
        success: false,
        status,
        message
    });
});

connect(MONGO_URI, () => {
    console.log("MONGO DB CONNECTED");
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});