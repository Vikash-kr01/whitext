import { Comment } from "../models/comment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { mongoose, isValidObjectId } from "mongoose";
import { Post } from "../models/post.model.js";

const commentOnPost = asyncHandler(async (req, res) => {
    const postId = req.params?.postId;
    if (!post && isValidObjectId(postId)) {
        throw new ApiError(404, "Invalid post id")
    }

    const userId = req.user?._id;

    const post = Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "Invalid post id, while commenting on this post")
    }

    const content = req.body?.comment;
    if (!content || !content.trim()) {
        throw new ApiError(400, "Comment field can't be empty")
    }

    const comment = await Comment.create({
        content,
        post: post?._id,
        commentedBy: userId
    })

    if (!comment) {
        throw new ApiError(500, "internal error while commenting the post");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "successfully commented on this post"));
})






export {
    commentOnPost
}