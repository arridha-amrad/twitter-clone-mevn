import { verifyAuthToken } from "@/utils/tokenHandler";
import express from "express";
import createComment from "./controllers/createComment";
import createPost from "./controllers/createPost";
import getPosts from "./controllers/getPosts";
import likePost from "./controllers/likePost";
import getOnePost from "./controllers/getOnePost";
import getPostChildren from "./controllers/getPostChildren";
import deletePost from "./controllers/deletePost";
import repost from "./controllers/repost";

const router = express.Router();

router.post("/create-post", createPost);
router.post("/like-post", verifyAuthToken, likePost);
router.post("/create-comment", verifyAuthToken, createComment);
router.get("/detail/:postId", verifyAuthToken, getOnePost);
router.get("/children/:postId", verifyAuthToken, getPostChildren);
router.get("/", verifyAuthToken, getPosts);
router.delete("/delete/:postId", verifyAuthToken, deletePost);
router.post("/repost/:postId", verifyAuthToken, repost);

export default router;
