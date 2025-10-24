import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinaryUpload.js";
import { cloudinaryDelete } from "../utils/cloudinaryDelete.js";
import { Post } from "../models/post.model.js";
import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js"
import { Like } from "../models/like.model.js"


const createPost = asyncHandler(async (req, res) => {
    /*
        1> fetch data for post req.body
        2> check data available if not throw error
        3> create post
        4> 
    */

    const userId = req.user._id;
    const { text, isPublished } = req.body;
    const files = req.files; // comes from multer

    const uploadMedia = await Promise.all( // b>
        // another way to do this from b>
        files.map(async (file, index) => {
            // const resourceType = file.mimetype.startsWith("video") ? "video" : "image";
            const result = await uploadOnCloudinary(file.path);

            return {
                publicId: result.public_id,
                url: result.secure_url,
                resourceType: result.resource_type,
                format: result.format,
                width: result.width,
                height: result.height,
                duration: result.duration,
                size: result.bytes,
                order: index
            };
        })
    );

    const post = await Post.create({
        owner: userId,
        text,
        isPublished,
        media: uploadMedia
    })

    return res
        .status(200)
        .json(new ApiResponse(200, post, "Post created successfully"));
})


const deletePost = asyncHandler(async (req, res) => {
    const postId = req.params?.postId;
    if (!postId && !mongoose.isValidObjectId(postId)) {
        throw new ApiError(400, "Invalid post id");
    }

    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(400, "post not found while deleting");
    }

    const owner = post.owner;
    const user = req.user._id;
    if (String(owner) !== String(user)) {
        throw new ApiError(402, "Unauthorized to take this action");
    }

    let deleteMediaFromCloudinary;
    if (user.media) {
        deleteMediaFromCloudinary = await Promise.allSettled(
            user.media.map(async (file) => {
                await cloudinaryDelete(file.publicId);
            })
        )
    }

    if (!deleteMediaFromCloudinary) {
        throw new ApiError(500, "Can't able to delete media file from cloudinary")
    }

    const deletedComments = await Comment.deleteMany({ post: post._id });
    if (deletedComments) console.log(`deleted comments count ${deletedComments.deletedCount}`);
    const deletedLikes = await Likes.deleteMany({ post: post._id });
    if (deletedLikes) console.log(`deleted comments count ${deletedLikes.deletedCount}`);

    const deletedPost = await post.deleteOne();

    if (!deletedPost) {
        throw new ApiError(500, "Invalid post id or internal error while deleting post");
    }

    return res
        .status(400)
        .json(new ApiResponse(200, { deleteMediaFromCloudinary, deletePost }, "Deleted post successfully"));
})

const updatePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    if (!postId && mongoose.isValidObjectId(postId)) {
        throw new ApiError(400, "Post id not found");
    }

    const post = await Post.findById(req.params.postId);
    if (!post) {
        throw new ApiError(400, "Invalid id to find a post");
    }

    const userId = req.user._id;
    const postOwner = post.owner;
    if (String(userId) !== String(postOwner)) {
        throw new ApiError(502, "Unauthorized to delete this post");
    }

    const { text } = req.body;
    if (!text && !post.media) {
        throw new ApiError(400, "Invalid update: require some text to update");
    }
    post.text = text;


    const { updateMedia } = req.body;
    let deletedMedia;
    let updatedMedia;
    if (updateMedia) {
        deletedMedia = await Promise.allSettled(
            post.media.map(async (mediaFile) => {
                return await cloudinaryDelete(mediaFile.publicId)
            })
        )
        // post.media = "";
        if (req.files && Array.isArray(req.files) && req.files.length) {
            updatedMedia = await Promise.allSettled(
                req.files.map(async (file, index) => {
                    const result = await uploadOnCloudinary(file.path)
                    return {
                        publicId: result.public_id,
                        url: result.secure_url,
                        resourceType: result.resource_type,
                        format: result.format,
                        width: result.width,
                        height: result.height,
                        size: result.size,
                        order: index
                    }
                })
            )
            post.media = updatedMedia;
        }
    }

    await post.save();

    return res
        .status(200)
        .json(new ApiResponse(200, post, "Post updated successfully"))
})



export {
    createPost,
    deletePost,
    updatePost,

}



/*  a> console.log(req.files)
    [
        {
            fieldname: 'files',
            originalname: 'lion.jpg',
            encoding: '7bit',
            mimetype: 'image/jpeg',
            destination: './public/temp',
            filename: 'lion.jpg',
            path: 'public\\temp\\lion.jpg',
            size: 4091
        },
        {
            fieldname: 'files',
            originalname: 'girl_two.jpg',
            encoding: '7bit',
            mimetype: 'image/jpeg',
            destination: './public/temp',
            filename: 'girl_two.jpg',
            path: 'public\\temp\\girl_two.jpg',
            size: 29864
        },
        {
            fieldname: 'files',
            originalname: 'videoplayback.mp4',
            encoding: '7bit',
            mimetype: 'video/mp4',
            destination: './public/temp',
            filename: 'videoplayback.mp4',
            path: 'public\\temp\\videoplayback.mp4',
            size: 5175930
        }
]
*/


/*  b> another way to do that
    const uploadedMedia = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const resourceType = file.mimetype.startsWith("video") ? "video" : "image";

      const result = await uploadToCloudinary(file.buffer, "posts", resourceType);

      uploadedMedia.push({
        publicId: result.public_id,
        url: result.secure_url,
        resourceType: result.resource_type,
        format: result.format,
        width: result.width,
        height: result.height,
        duration: result.duration,
        size: result.bytes,
        order: i
      });
    }
*/