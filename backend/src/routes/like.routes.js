import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    toggleLikeOfComment,
    toggleLikeOfPost,

} from "../controllers/like.controller.js"

const router = Router();


router.route('/post/:postId').post(verifyJWT, toggleLikeOfPost);
router.route('/comment/:commentId').post(verifyJWT, toggleLikeOfComment);





export default router;