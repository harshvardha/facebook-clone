import { Schema, model } from "mongoose";

const replyCommentSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default model("Reply", replyCommentSchema);