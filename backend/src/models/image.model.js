import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        reg: "Post",
        required: true
    },
    imageFile: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export const Image = mongoose.model("Image", imageSchema)