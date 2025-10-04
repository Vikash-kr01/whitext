import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();


router.get("/", (req, res) => {
    res.json("Welcome User")
})    

router.route("/registeruser").post(registerUser)
router.route("/login").post(loginUser)

// Secure routes
router.route("/logout").post(verifyJWT, logoutUser)

export default router;