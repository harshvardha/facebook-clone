import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authenticationRouter from "./routes/authentication.routes.js";
import userRouter from "./routes/users.routes.js";
import postRouter from "./routes/posts.router.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use(helmet());
app.use(morgan("common"));

app.use("/api/authentication", authenticationRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "Server error,  We are fixing it!";
    return res.status(status).json({
        success: false,
        status,
        message
    });
});

mongoose.connect(process.env.DATABASE_URI)
    .then(result => {
        console.log("MONGO DB CONNECTED");
    })
    .catch(error => {
        console.log(error);
    });

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend Server is running.");
});