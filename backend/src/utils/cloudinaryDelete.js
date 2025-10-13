import { v2 as cloudinary } from "cloudinary"
import { ApiError } from "./ApiError"


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