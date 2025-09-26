import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema({
    likedBy: {
        type: mongoose.Schema.Types.ObjectId,
        reg: "User",
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
}, {
    timestamps: true
})

export const Like = mongoose.model("Like", likeSchema)