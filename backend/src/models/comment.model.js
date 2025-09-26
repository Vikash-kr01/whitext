import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema({
    content: {  // what you have comment
        type: String,
        required: true,
        trim: true
    },
    commentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        reg: "User",
        required: true
    },
    post: {     // if you have commented on post
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    comment: {  // if you have commented on comment
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
}, {
    timestamps: true
})

export const Like = mongoose.model("Like", likeSchema)