import { Router } from "express";
import {
    changeCurrentPassword,
    getCurrentUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
    updateAccountDetail,
    updatePicture,
    getUserDetails
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();


router.get("/", (req, res) => {
    res.json("Welcome User")
});

router.route("/registeruser").post(registerUser);
router.route("/login").post(loginUser);

// Secure routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(verifyJWT, refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").post(verifyJWT, getCurrentUser);
router.route("/update-account").post(verifyJWT, updateAccountDetail);
router.route("/update-profile-picture").post(verifyJWT, upload.single("profilePicture"), updatePicture)
router.route("/update-cover-image").post(verifyJWT, upload.single("coverImage"), updatePicture)
router.route("/user-details").post(verifyJWT, getUserDetails);

export default router;