import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

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

// Hash password before save
userSchema.pre('save', async function () {
    if (!this.isModified("password")) return

    try {
        this.password = await bcrypt.hash(this.password, 10)
    } catch (error) {
        throw new Error(`ERROR_WHILE_HASHING_PASSWORD: ${error}`)
    }
})


// compare password when required
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}





export const user = mongoose.model("User", userSchema);