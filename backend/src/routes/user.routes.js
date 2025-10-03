import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";

const router = Router();


router.get("/", (req, res) => {
    res.json("Welcome User")
})    

router.route("/registeruser").post(registerUser)
router.route("/login").post(loginUser)



export default router;