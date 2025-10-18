import mongoose, { Mongoose, Schema } from "mongoose";

const mediaSchema = new Schema({
    publicId: { type: String, required: true },
    url: { type: String, required: true },
    resourceType: { type: String, enum: ["image", "video", "raw"], required: true },
    formate: { type: String },
    width: { type: Number },
    height: { type: Number },
    duration: { type: Number },
    size: { type: Number },
    order: { type: Number, default: 0 }
}, {
    _id: true, timestamps: true
})

const postSchema = new Schema({
    owner: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        trim: true
    },
    media: {
        type: [mediaSchema],
        validate: {
            validator: function (arr) {
                // example rule: total items <= 6 and not both many videos and many images
                if (!arr) return true;
                if (arr.length > 6) return false;
                const videos = arr.filter(m => m.resourceType === "video").length;
                // allow at most 1 video (typical for social apps)
                if (videos > 1) return false;
                return true;
            },
            message: "Too many media items or too many videos."
        }
    },
    rePost: { type: Schema.Types.ObjectId, ref: "Post" },
    views: { type: Number },
    isPublished: {
        type: String,
        enum: ["public", "follower", "private"],
        default: "public"
    }
}, {
    timestamps: true
})

export const Post = mongoose.model("Post", postSchema);