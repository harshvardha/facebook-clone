import { Schema, model } from "mongoose";

const commentSchema = new Schema({
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
    },
    reply: {
        type: Array,
        default: []
    }
}, { timestamps: true });

export default model("comments", commentSchema);