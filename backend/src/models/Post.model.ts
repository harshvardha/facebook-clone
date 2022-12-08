import { Schema, model } from "mongoose";

const postSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
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
    },
    comments: {
        type: Array,
        default: []
    }
}, { timestamps: true });

export default model("Post", postSchema);