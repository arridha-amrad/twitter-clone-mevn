import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import UserRoutes from "@/modules/user/user.routes";
import PostRoutes from "@/modules/post/post.routes";
import cors from "cors";

const port = process.env.PORT;

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/user", UserRoutes);
app.use("/api/posts", PostRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
