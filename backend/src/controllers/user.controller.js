import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js"
import { passwordValidator } from "../utils/passwordValidator.js";
import { emailValidator } from "../utils/emailValidator.js";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../utils/cloudinaryUpload.js";
import { cloudinaryDelete } from "../utils/cloudinaryDelete.js";


const generateAccessTokenRefreshToken = async (userId) => {
	try {
		const user = await User.findById(userId);
		const refreshToken = user.generateRefreshToken();
		const accessToken = user.generateAccessToken();

		user.refreshToken = refreshToken;
		await user.save({ validateBeforeSave: false });
		return { refreshToken, accessToken };

	} catch (error) {
		throw new ApiError(500, "ERROR: error while generating access token and refresh token");
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
		[username, fullName, email, password].some((item) => typeof item !== "string" || item.trim() === "")
	) {
		throw new ApiError(400, "All fields are required");
	}

	const isEmailValid = emailValidator(email);
	const isPasswordValid = passwordValidator(password);

	if (!isEmailValid || !isPasswordValid) {
		throw new ApiError(
			400,
			"VALIDATION_ERROR: Please add a validate email and password",
			[
				!isEmailValid ? { field: "email", message: "Invalid email" } : null,
				!isPasswordValid ? { field: "password", message: "Invalid password" } : null
			].filter(Boolean)  // if any of them or both are true the errors array will contain the same errors
		)
	}

	const existedUser = await User.findOne({
		$or: [{ email }, { username }]
	})

	if (existedUser) {
		if (existedUser.email === email) {
			throw new ApiError(409, "Email Already Exists");
		}
		if (existedUser.username === username) {
			throw new ApiError(409, "Username Already Exists");
		}
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

	const { email, username, password } = req.body;

	if ((!email && !username) || !password) {
		throw new ApiError(400, "LOGIN_ERROR: email/username and password is required")
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

	const { refreshToken, accessToken } = await generateAccessTokenRefreshToken(user._id);
	console.log("generated tokens")

	const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

	const option = {
		httpOnly: true,
		secure: true
	}

	return res
		.status(200)
		.cookie("refreshToken", refreshToken, option)
		.cookie("accessToken", accessToken, option)
		.json(new ApiResponse(200, { user: loggedInUser, refreshToken, accessToken }, "User logged in successfully"));

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
			$unset: { refreshToken: "" }
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


const refreshAccessToken = asyncHandler(async (req, res) => {
	const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

	if (!incomingRefreshToken) {
		throw new ApiError(404, "ERROR: refresh token not found")
	}

	let decodedRefreshToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

	const user = await User.findById(decodedRefreshToken._id);

	if (user?.refreshToken !== incomingRefreshToken) {
		// await revokeAllUserTokens
		throw new ApiError(401, "ERROR: security violence detected. Please login again")
	}

	const { refreshToken: newRefreshToken, accessToken } = generateAccessTokenRefreshToken(user._id);

	const option = {
		httpOnly: true,
		secure: true
	}

	return res
		.status(200)
		.cookie("refreshToken", newRefreshToken, option)
		.cookie("accessToken", accessToken, option)
		.json(new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, ""))
})


const changeCurrentPassword = asyncHandler(async (req, res) => {
	/* Todos
			1> get old and new password frontend
			2> a> compare oldPassword and DB password using bcrypt
			3> if not a> throw error
			4> else create new password
	*/

	const { oldPassword, newPassword } = req.body;

	const user = await User.findById(req.user._id);
	const isValidPassword = await user.isPasswordCorrect(oldPassword);

	if (!isValidPassword) {
		throw new ApiError(400, "ERROR: Invalid Password")
	}

	const { refreshToken, accessToken } = await generateAccessTokenRefreshToken(user._id)

	user.password = newPassword;
	user.refreshToken = refreshToken;
	await user.save()

	const option = {
		httpOnly: true,
		secure: true
	}

	return res
		.status(200)
		.clearCookie("accessToken", option)
		.clearCookie("refreshToken", option)
		.json(new ApiResponse(200, {}, "Password Change successfully"));
})


const getCurrentUser = asyncHandler(async (req, res) => {
	return res
		.status(200)
		.json(new ApiResponse(200, req.user, "current user fetched successfully"))
})


const updateAccountDetail = asyncHandler(async (req, res) => {
	const { email, fullName, username, age } = req.body;

	if (!email && !fullName && !username && !age) {
		throw new ApiError(400, "Update field is empty");
	}

	let update = {};
	if (email) update.email = email;
	if (email) update.fullName = fullName;
	if (email) update.username = username;
	if (email) update.age = age;

	const user = await User.findByIdAndUpdate(
		req.user?._id,
		{
			$set: { update }
		},
		{
			new: true, runValidators: true
		}
	).select("-password -refreshTokenk")

	return res
		.status(200)
		.json(new ApiResponse(200, user, "account details updated successfully"))

})


const updatePicture = asyncHandler(async (req, res) => {
	const localImagePath = req.file?.path;
	if (!localImagePath) {
		throw new ApiError(400, "One image is required");
	}

	const updatingImageName = req.file?.fieldname;
	const updatingImageNamePublicId = updatingImageName + "PublicId"

	const user = await User.findById(req.user?._id);

	const deletePriviousImageCloudinary = await cloudinaryDelete([user[updatingImageNamePublicId]])
	if (!deletePriviousImageCloudinary) {
		throw new ApiError(500, "Can't able to delete image from cloudinary right now")
	}

	const uploadImageCloudinary = await uploadOnCloudinary(localImagePath);
	if (!uploadImageCloudinary) {
		throw new ApiError(500, "Can't able to upload image to cloudinary right now")
	}

	user[updatingImageName] = uploadImageCloudinary.secure_url;
	user[updatingImageNamePublicId] = uploadImageCloudinary.public_id;

	await user.save();

	const updatedUser = user.toObject();
	delete updatedUser.password;
	delete updatedUser.refreshToken;

	return res
		.status(200)
		.json(new ApiResponse(200, { user, deletedImage: deletePriviousImageCloudinary }, `${updatingImageName} has updated successfully`))

})


const getUserDetails = asyncHandler(async (req, res) => {
	const { username } = req.params;

	if (!username || !username?.trim()) {
		throw new ApiError(400, "username is missing");
	}

	const userDetailed = await User.aggregate([
		{
			$match: { username: username?.toLowerCase() }
		},
		{
			$lookup: {
				from: "follows",
				localField: "_id",
				foreignField: "following",
				as: "followers"
			}
		},
		{
			$lookup: {
				from: "follows",
				localField: "_id",
				foreignField: "follower",
				as: "following"
			}
		},
		{
			$addFields: {
				followersCount: {
					$size: "$followers",
				},
				followingCount: {
					$size: "$following"
				},
				isFollowed: {
					$cond: {
						if: { $in: [req.user?._id, "$followers.follower"] },
						then: true,
						else: false
					}
				}
			}
		},
		{
			$project: {
				username: 1,
				fullName: 1,
				email: 1,
				gender: 1,
				profilePicture: 1,
				coverImage: 1,
				dateOfBirth: 1,
				followersCount: 1,
				followingCount: 1,
				isFollowed: 1
			}
		}
	])

	return res
		.status(200)
		.json(new ApiResponse(200, userDetailed[0], "user detailed send successfully"));
})







export {
	registerUser,
	loginUser,
	logoutUser,
	refreshAccessToken,
	changeCurrentPassword,
	getCurrentUser,
	updateAccountDetail,
	updatePicture,
	getUserDetails,

}





/* a> console.log(req.file)
{
		"fieldname": "profilePicture",
		"originalname": "lion.jpg",
		"encoding": "7bit",
		"mimetype": "image/jpeg",
		"destination": "./public/temp",
		"filename": "lion.jpg",
		"path": "public\\temp\\lion.jpg",
		"size": 4091
}
*/