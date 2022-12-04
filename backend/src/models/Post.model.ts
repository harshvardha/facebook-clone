import { Schema, model } from "mongoose";

const postSchema: Schema = new Schema({
    userId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        max: 500
    },
    image: {
        type: String
    },
    likes: {
        type: Array,
        default: []
    }
}, { timestamps: true });

export default model("Post", postSchema);