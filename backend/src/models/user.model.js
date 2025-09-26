import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true     // Improves query performance on username and helps in searching
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Undefined"],
        default: "Undefined"
    },
    dateOfBirth: {
        type: Date,
    },
    profilePicture: {
        type: String
    },
    coverImage: {
        type: String
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    refreshToken: {
        type: String
    }
}, {
    timestamps: true
}
)




export const user = mongoose.model("User", userSchema);