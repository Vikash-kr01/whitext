import mongoose, {Schema} from "mongoose";

const followSchema = new Schema({
    following: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    follower: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
})

export const Follow = mongoose.model("Follow", followSchema)