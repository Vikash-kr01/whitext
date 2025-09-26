import mongoose, { Mongoose, Schema } from "mongoose";

const postSchema = new Schema({
    owner: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    textContent: {
        type: String,
        trim: true
    },
    videoFiles: [{ type: Schema.Types.ObjectId, ref: "Video" }],
    imageFiles: [{type: Mongoose.Schema.Types.ObjectId, ref: "Image"}],
    reTweet: {type: Schema.Types.ObjectId, ref: "Post"},
    views: {type: Number},
    isPublished: {
        type: String,
        enum: ["public", "follower", "private"],
        default: "public"
    }
}, {
    timestamps: true
})