import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

const verifyJWT = async (req, res, next) => {

    try {
        const token = req.cookeis.accessToken || req.header();

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
            if (decoded) {
                return decoded
            }
            else {
                throw new ApiError(404, "ERROR: access token not found");
            }
        });

        const user = await User.findById(decodedToken._id).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(404, "ERROR: invalid access token");
        }

        req.user = user;
        next();

    } catch (error) {
        throw new ApiError(404, "ACCESS_TOKEN_ERROR: invalid access token while authorization");
    }
}