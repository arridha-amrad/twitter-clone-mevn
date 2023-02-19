import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import { Tweet } from "@prisma/client";

const reTweet = async (req: Request, res: Response) => {
  const { postId, isRetweet } = req.body;
  const userId = req.app.locals.userId;
  console.log("postId : ", postId);
  console.log("isRetweet : ", isRetweet);

  try {
    const storedPost = await prisma.post.findFirst({ where: { id: postId } });

    if (!storedPost) return res.sendStatus(404);

    let tweet: Tweet | null = null;

    if (!isRetweet) {
      tweet = await prisma.tweet.create({
        data: {
          postId,
          userId,
          isRetweet: true,
        },
      });
    } else {
      tweet = await prisma.tweet.findFirst({
        where: {
          postId,
          userId,
          isRetweet: true,
        },
      });
      if (!tweet) return res.sendStatus(404);
      await prisma.tweet.delete({ where: { id: tweet.id } });
    }
    return res.status(200).json({ tweet });
  } catch (err) {
    return res.sendStatus(500);
  }
};

export default reTweet;
