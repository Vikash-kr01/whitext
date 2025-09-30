import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();


router.get("/", (req, res) => {
    res.json("Welcome User")
})

router.route("/registeruser").get(registerUser)




export default router;