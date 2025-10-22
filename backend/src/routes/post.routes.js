import { Router } from "express";
import {
    createPost,
    deletePost,

} from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();

router.route("/create-post").post(verifyJWT, upload.array("files", 6), createPost);
router.route("/delete-post").delete(verifyJWT, deletePost)

export default router;  