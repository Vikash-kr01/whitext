import { Router } from "express";

const router = Router();


router.get("/", (req, res) => {
    res.json("Welcome User")
})




export default router;