import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { isValidObjectId } from "mongoose";


const toggleLikeOfPost = asyncHandler(async (req, res) => {
    const postId = req.params?.postId;
    if (!postId && isValidObjectId(postId)) {
        throw new ApiError(404, "Invalid post id");
    }

    const user = req.user?._id;
    if (!user) {
        throw new ApiError(404, "User id not found");
    }

    let likeStatus;

    const likedPost = await Like.findOne({ post: postId, likedBy: user });
    if (likePost) {
        await Like.deleteOne(likedPost._id);
        likeStatus = "unlike"
    }
    else {

        const likePost = await Like.create({
            likedBy: user,
            post: postId
        })

        likeStatus = "like"

        if (!likePost) {
            throw new ApiError(500, "Internal server error while like a post");
        }
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, `post ${likeStatus} successfully`));
})








export {
    toggleLikeOfPost,

}