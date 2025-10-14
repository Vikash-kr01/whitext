import { v2 as cloudinary } from "cloudinary"
import { ApiError } from "./ApiError.js"


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const cloudinaryDelete = async (publicIds = []) => {

    if (!Array.isArray(publicIds) || !publicIds.length) {
        throw new ApiError(400, "CLOUDINARY_DELETE_ERROR: no file provided for deletion");
    }

    try {
        const deletedImages = await cloudinary.api.delete_resources(publicIds, { resource_type: "image" });
        // console.log(deletedImages)  // see bottom a>
        const deletedVideos = await cloudinary.api.delete_resources(publicIds, { resource_type: "video" });

        return {
            deletedImages: deletedImages.deleted,
            deletedVideos: deletedVideos.deleted
        }
    } catch (error) {
        throw new ApiError(500, `CLOUDIANRY_DELETE_ERROR: ${error || "error while deleting image"}`);
    }
}

export { cloudinaryDelete };





/*  a>  console.log(deletedImages) 
    {
        deleted: { npbdd5ofwjbnuabxe7ze: 'deleted' },
        deleted_counts: { npbdd5ofwjbnuabxe7ze: { original: 1, derived: 0 } },
        partial: false,
        rate_limit_allowed: 500,
        rate_limit_reset_at: 2025-10-14T13:00:00.000Z,
        rate_limit_remaining: 497
    }
*/