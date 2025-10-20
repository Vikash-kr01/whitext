import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinaryUpload.js";
import { Post } from "../models/post.model.js";



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

    const uploadMedia = await Promise.all(
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




export {
    createPost
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