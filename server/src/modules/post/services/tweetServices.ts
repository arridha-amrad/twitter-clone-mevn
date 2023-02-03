import prisma from "@/utils/prisma";
import { Tweet } from "@prisma/client";

export const findRetweet = async (
  postId: string,
  userId: string
): Promise<Tweet | null> => {
  const reTweet = await prisma.tweet.findFirst({
    where: {
      postId,
      userId,
    },
  });
  return reTweet;
};
