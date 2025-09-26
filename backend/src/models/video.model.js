import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        reg: "Post",
        required: true
    },
    videoFile: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

export const Video = mongoose.model("Video", videoSchema)