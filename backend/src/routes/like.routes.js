import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    toggleLikeOfPost
} from "../controllers/like.controller.js"

const router = Router();


router.route('/post/:postId').post(verifyJWT, toggleLikeOfPost)






export default router;