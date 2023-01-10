import { verifyAuthToken } from "@/utils/tokenHandler";
import express from "express";
import createComment from "./controllers/createComment";
import createPost from "./controllers/createPost";
import getPosts from "./controllers/getPosts";
import likePost from "./controllers/likePost";

const router = express.Router();

router.post("/create-post", verifyAuthToken, createPost);
router.post("/like-post", verifyAuthToken, likePost);
router.post("/create-comment", verifyAuthToken, createComment);
router.get("/", verifyAuthToken, getPosts);

export default router;
