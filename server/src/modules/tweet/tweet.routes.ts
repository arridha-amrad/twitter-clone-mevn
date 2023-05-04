import { authenticationGuard } from "@/utils/authenticationGuard";
import express from "express";
import createReply from "./controllers/createReply";
import createTweet from "./controllers/createTweet";
import loadTweets from "./controllers/loadTweets";
import likeTweet from "./controllers/likeTweet";
import getOnePost from "./controllers/getOnePost";
import getPostChildren from "./controllers/getPostChildren";
import deleteTweet from "./controllers/deleteTweet";
import retweet from "./controllers/retweet";
import { sanitize } from "@/utils/sanitizeInput";

const router = express.Router();

router.post("/", sanitize, authenticationGuard, createTweet);
router.get("/", loadTweets);
router.post("/like", authenticationGuard, likeTweet);
router.delete("/:tweetId", authenticationGuard, deleteTweet);
router.post("/reply", sanitize, authenticationGuard, createReply);
router.get("/detail/:tweetId", authenticationGuard, getOnePost);
router.get("/children/:tweetId", authenticationGuard, getPostChildren);
router.post("/retweet", authenticationGuard, retweet);

export default router;
