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


// routes declaration
app.get("/", (req, res) => {
    res.send("Hello world")
})

app.use("/app/user", userRouter)



export { app };