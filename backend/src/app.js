import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.static("public"));
app.use(express.json({ limit: "17kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Import routes
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import likeRouter from "./routes/like.routes.js";
import commentRouter from "./routes/comment.routes.js";


// routes declaration
app.get("/", (req, res) => {
    res.send("Welcome to whitext")
})

app.use("/app/api/v1/user", userRouter)
app.use("/app/api/v1/post", postRouter)
app.use("/app/api/v1/toggle-like", likeRouter)
app.use("/app/api/v1/comment", commentRouter);



export { app };