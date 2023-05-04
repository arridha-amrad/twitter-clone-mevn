import prisma from "@/utils/prisma";
import { Request, Response } from "express";
import { saveFiles } from "../services/filesServices";
import { getPostData } from "../tweet.constants";

const createPost = async (req: Request, res: Response) => {
  const postDescription = req.body.description;
  const files = req.files?.files;
  try {
    const authenticatedUserId = req.app.locals.userId;
    const newPost = await prisma.post.create({
      data: {
        body: postDescription,
        authorId: authenticatedUserId,
      },
    });

    if (files) {
      await saveFiles(newPost.id, files);
    }

    const newTweet = await prisma.tweet.create({
      data: {
        isRetweet: false,
        userId: authenticatedUserId,
        postId: newPost.id,
      },
      include: {
        _count: { select: { children: true } },
        post: {
          include: getPostData(authenticatedUserId),
        },
      },
    });
    return res.status(201).json({ tweet: newTweet });
  } catch (err) {
    console.log("err : ", err);
    return res.sendStatus(500);
  }
};

export default createPost;
