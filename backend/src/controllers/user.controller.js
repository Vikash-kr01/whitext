import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js"
import { passwordValidator } from "../utils/passwordValidator.js";
import { emailValidator } from "../utils/emailValidator.js";





const registerUser = asyncHandler(async (req, res) => {
    // Thing to do in this controller :-
    // user's details from frontend
    // validation - not empty, check email and password through regex.
    // a> check is user already exist
    // if a> return Error("User already exist")
    // if not a> create user; entry in DB
    // a> check if the user created remove both refreshToken and password in response
    // if not b> return error
    // if b> return res

    const { username, fullName, email, password } = req.body;

    if (
        [username, fullName, email, password].some((item) => item.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    if (!passwordValidator(password) || !emailValidator(email)) {
        throw new ApiError(400, "VALIDATION_ERROR: Please add a validate email and password")
    }

    const existedUser = await User.findOne({
        $or: [{email, username}]
    })

    if (existedUser) {
        throw new ApiError(409, "ERROR: either email or username already exist")
    }

    const user = await User.create({
        username, fullName, email, password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );
    
    if(!createdUser) {
        throw new ApiError(500, "INTERNAL_SERVER_ERROR: user not created")
    }

    return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User created successfully"))

})












export {
    registerUser
}