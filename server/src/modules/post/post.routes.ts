import { verifyAuthToken } from "@/utils/tokenHandler";
import express from "express";
import createPost from "./controllers/createPost";
import getPosts from "./controllers/getPosts";

const router = express.Router();

router.post("/create-post", verifyAuthToken, createPost);
router.get("/", verifyAuthToken, getPosts);

export default router;
