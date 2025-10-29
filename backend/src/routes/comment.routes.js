import { Router } from "express";
import {
    commentOnComment,
    commentOnPost
} from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/post/:postId').post(verifyJWT, commentOnPost);
router.route('/comment/:commentId').post(verifyJWT, commentOnComment);

export default router;