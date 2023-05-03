import { authenticationGuard } from "@/utils/authenticationGuard";
import express from "express";
import createComment from "./controllers/createComment";
import createPost from "./controllers/createPost";
import getPosts from "./controllers/getPosts";
import likePost from "./controllers/likePost";
import getOnePost from "./controllers/getOnePost";
import getPostChildren from "./controllers/getPostChildren";
import deletePost from "./controllers/deletePost";
import retweet from "./controllers/retweet";

const router = express.Router();

router.post("/create-post", authenticationGuard, createPost);
router.post("/like-post", authenticationGuard, likePost);
router.post("/create-comment", authenticationGuard, createComment);
router.get("/detail/:tweetId", authenticationGuard, getOnePost);
router.get("/children/:postId", authenticationGuard, getPostChildren);
router.get("/", authenticationGuard, getPosts);
router.delete("/delete/:postId", authenticationGuard, deletePost);
router.post("/retweet", authenticationGuard, retweet);

export default router;
