import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {

    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
            if (decoded) {
                return decoded
            }
            else {
                throw new ApiError(404, `ERROR: ${err || "access token not found"}`);
            }
        });

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(401, "ERROR: invalid access token");
        }

        req.user = user;
        next();

    } catch (error) {
        throw new ApiError(401, error?.message || "ACCESS_TOKEN_ERROR: invalid access token while authorization");
    }
}) 