import { Router } from "express";
import {
    commentOnPost
} from "../controllers/comment.controller.js";

const router = Router();

router.route('/post/:postId').post(commentOnPost)


export default router;