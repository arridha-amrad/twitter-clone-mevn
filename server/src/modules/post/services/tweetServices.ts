import prisma from "@/utils/prisma";
import { Tweet } from "@prisma/client";
import { IPost } from "../post.types";

export const findTweet = async (postId: string, userId: string) => {
  const tweet = await prisma.tweet.findFirst({
    where: {
      postId,
      userId,
    },
    include: {
      post: true,
    },
  });
  return tweet;
};

export const checkIsReTweet = (
  tweet: Tweet & { post: IPost },
  userId: string
) => {
  return (
    tweet && tweet.userId !== tweet.post.authorId && tweet.userId === userId
  );
};

export const createTweet = async (
  isRetweet: boolean,
  postId: string,
  userId: string
) => {
  return prisma.tweet.create({
    data: {
      postId,
      userId,
      isRetweet,
    },
  });
};
