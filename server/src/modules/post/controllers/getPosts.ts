import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import { POST_INCLUDED_DATA } from "../post.constants";
import { IPostWithParents, ITweet } from "../post.types";
import { getPostParents } from "../utils/getPostParents";
import { findLike } from "../services/likeServices";
import { findTweet } from "../services/tweetServices";

const getPosts = async (req: Request, res: Response) => {
  const { limit = "0", skip = "0" } = req.query;
  try {
    const userId = req.app.locals.userId;
    const storedTweets = await prisma.tweet.findMany({
      take: parseInt(limit as string),
      skip: parseInt(skip as string),
      orderBy: {
        createdAt: "desc",
      },
    });
    const tweets: ITweet[] = [];
    for (let tweet of storedTweets) {
      const storedPost = await prisma.post.findFirst({
        where: { id: tweet.postId },
        include: POST_INCLUDED_DATA,
      });
      if (!storedPost) continue;
      let currentPost: IPostWithParents = {
        ...storedPost,
        isLiked: false,
        isRetweet: false,
        parents: [],
      };
      currentPost.isLiked = !!(await findLike(tweet.postId, userId));
      const reTweet = await findTweet(tweet.postId, userId);
      if (reTweet && reTweet.userId !== currentPost.authorId) {
        currentPost.isRetweet = true;
      }
      if (currentPost.parentId) {
        const postParents = await getPostParents(currentPost.parentId, userId);
        currentPost.parents = postParents;
      }
      const myTweet: ITweet = { ...tweet, post: currentPost };
      tweets.push(myTweet);
    }
    return res.status(200).json({ tweets });
  } catch (err) {
    console.log("err : ", err);
    return res.status(500).send("Server Error");
  } finally {
    await prisma.$disconnect();
  }
};

export default getPosts;
