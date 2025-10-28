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
    if (likedPost) {
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


const toggleLikeOfComment = asyncHandler(async (req, res) => {
    const commentId = req.params?.commentId;
    const userId = req.user?._id;

    if (!commentId || isValidObjectId(commentId)) {
        throw new ApiError(404, "Invalid comment id found")
    }

    if (!userId) {
        throw new ApiError(404, "user id not found");
    }

    let likeStatus;

    const likedComment = await Like.findOne({likedBy: userId, comment: commentId});
    if (likedComment) {
        await Like.deleteOne(likedComment._id);
        likeStatus = "unliked"
    }
    else {
        let likeComment = await Like.create({likedBy: userId, comment: commentId})
        if (!likeComment) {
            throw new ApiError(500, "internal error while like a comment");
        }
        likeStatus = "liked"
    }

    return res
    .status(200)
    .jso(new ApiResponse(200, {}, `comment ${likeStatus} successfully`))
})





export {
    toggleLikeOfPost,
    toggleLikeOfComment
}