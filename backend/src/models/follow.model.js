import mongoose, { Schema } from "mongoose";

const followSchema = new Schema({
    following: {    // whome the user follow
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    follower: {     // people who follow the user
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
})

export const Follow = mongoose.model("Follow", followSchema)