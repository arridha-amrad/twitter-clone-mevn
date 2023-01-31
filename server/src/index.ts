import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import UserRoutes from "@/modules/user/user.routes";
import PostRoutes from "@/modules/post/post.routes";
import cors from "cors";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";

const port = process.env.PORT;

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(cookieParser());
app.use("/api/user", UserRoutes);
app.use("/api/posts", PostRoutes);

app.listen(port, () => {
  cloudinary.v2.config({
    api_key: process.env.CLOUDINARY_KEY!,
    api_secret: process.env.CLOUDINARY_SECRET!,
    cloud_name: process.env.CLOUDINARY_NAME!,
  });
  console.log(`Server running at http://localhost:${port}`);
});
