import { Router } from "express";
import {
    createPost,
    deletePost,
    updatePost,

} from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();

router.route("/create-post").post(verifyJWT, upload.array("files", 6), createPost);
router.route("/delete-post/:postId").delete(verifyJWT, deletePost)
router.route("/update-post/:postId").patch(verifyJWT, upload.array("files", 6), updatePost);

export default router;  