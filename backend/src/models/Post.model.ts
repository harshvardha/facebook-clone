import { Schema, model, Types } from "mongoose";

const postSchema: Schema = new Schema({
    userId: {
        type: Types.ObjectId,
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
    },
    hearts: {
        type: Array,
        default: []
    }
}, { timestamps: true });

export default model("Post", postSchema);