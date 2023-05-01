import prisma from "@/utils/prisma";
import { Tweet } from "@prisma/client";
import { QUERY_AUTHOR_DATA } from "../post.constants";
import { IPost } from "../post.types";

export const findTweet = async (postId: string, userId: string) => {
  const tweet = await prisma.tweet.findFirst({
    where: {
      postId,
      userId,
    },
    include: {
      post: true,
      user: {
        select: QUERY_AUTHOR_DATA,
      },
    },
  });
  return tweet;
};

export const checkIsReTweet = async(
  postId: string,
  userId: string
) => {
  const tweet = await prisma.tweet.findFirst({
    where: {
      userId,
      postId,
      isRetweet: true
    }
  })
  return !!tweet
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
    include: {
      user: {
        select: QUERY_AUTHOR_DATA,
      },
    },
  });
};
