import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import { POST_INCLUDED_DATA } from "../post.constants";
import { getPostParents } from "../utils/getPostParents";
import { IPostWithParents, ITweet } from "../post.types";
import { createTweet } from "../services/tweetServices";

const createComment = async (req: Request, res: Response) => {
  const { body, postId } = req.body;
  const userId = req.app.locals.userId;
  try {
    const parentPost = await prisma.post.findFirst({ where: { id: postId } });
    if (!parentPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    const newPost = await prisma.post.create({
      include: POST_INCLUDED_DATA,
      data: {
        parentId: postId,
        authorId: userId,
        body,
        createdAt: new Date(),
      },
    });
    const parents = await getPostParents(postId, userId);
    const comment: IPostWithParents = {
      ...newPost,
      isLiked: false,
      isRetweet: false,
      parents,
      medias: [],
    };
    const newTweet = await createTweet(newPost.id, userId);
    const tweet: ITweet = { ...newTweet, post: comment };
    return res.status(201).json({ tweet });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  } finally {
    await prisma.$disconnect();
  }
};

export default createComment;
