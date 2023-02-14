import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import { createTweet, findTweet } from "../services/tweetServices";
import { Tweet } from "@prisma/client";

const reTweet = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const userId = req.app.locals.userId;
  try {
    const storedPost = await prisma.post.findFirst({ where: { id: postId } });

    if (!storedPost) return res.sendStatus(404);

    const storedTweet = await findTweet(postId, userId);

    let message = "";
    let tweet: Tweet | null = null;
    if (!storedTweet) {
      tweet = await createTweet(postId, userId);
      message = "retweet";
    } else {
      tweet = await prisma.tweet.delete({
        where: {
          id: storedTweet.id,
        },
      });
      message = "unRetweet";
    }
    return res.status(200).json({ message, tweet });
  } catch (err) {
    return res.sendStatus(500);
  }
};

export default reTweet;
