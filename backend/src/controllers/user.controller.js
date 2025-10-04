import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js"
import { passwordValidator } from "../utils/passwordValidator.js";
import { emailValidator } from "../utils/emailValidator.js";


const generateAccessTokenRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const refreshToken = await user.generateAccessToken();
        const accessToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});
        return { refreshToken, accessToken };

    } catch (error) {

    }
}


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
        $or: [{ email, username }]
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

    if (!createdUser) {
        throw new ApiError(500, "INTERNAL_SERVER_ERROR: user not created")
    }

    return res
        .status(201)
        .json(new ApiResponse(201, createdUser, "User created successfully"))

})


const loginUser = asyncHandler(async (req, res) => {

    /*  Todos
        1> fetch userId and password from frontend
        2> if !user throw error
        3> else find user by userId
        4> match password: if not matched throw error
        5> else set accessToken and refreshToken as cookies
        6> send user in response by selecting ("-password -refreshToken") 
    */

    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "LOGIN_ERROR: please enter a valid email or password")
    }

    const user = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (!user) {
        throw new ApiError(400, "ERROR: not a valid user");
    }

    const isValidPassword = await user.isPasswordCorrect(password);

    if (!isValidPassword) {
        throw new ApiError(401, "LOGIN_ERROR: invalid user or password")
    }

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const {refreshToken, accessToken} = generateAccessTokenRefreshToken(user._id);

    const option = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("refreshToken", refreshToken, option)
    .cookie("accessToken", accessToken, option)
    .json(new ApiResponse(200, {user: loggedInUser, refreshToken, accessToken}));

})


const logoutUser = asyncHandler(async (req, res) => {
    /*  Todos
       1> find the user using req.user
       2> remove refreshToken from that user
       3> remove refreshToken and accessToken in response
    */

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {refreshToken: ""}
        },
        {
            new: true
        }
    )

    const option = {
        httpOnly: true,
        secure: true
    }
    
    return res
    .status(200)
    .clearCookie("refreshToken", option)
    .clearCookie("accessToken", option)
    .json(new ApiResponse(200, {}, "Successfully logout"))

})








export {
    registerUser,
    loginUser,
    logoutUser
}