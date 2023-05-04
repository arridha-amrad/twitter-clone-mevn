import { IPost } from "../tweet.types";
import prisma from "@/utils/prisma";
import { POST_INCLUDED_DATA } from "../tweet.constants";
import { findLike } from "../services/likeServices";
import { findTweet } from "../services/tweetServices";

export const getPostParents = async (
  postId: string,
  userId: string
): Promise<IPost[]> => {
  const parents: IPost[] = [];
  const post = await prisma.post.findFirst({
    where: {
      id: postId,
    },
    include: POST_INCLUDED_DATA,
  });
  if (!post) return parents;
  const isLiked = await findLike(postId, userId);
  const isRetweet = await findTweet(postId, userId);
  const postResult: IPost = {
    ...post,
    isLiked: !!isLiked,
    isRetweet: !!isRetweet,
  };
  parents.push(postResult);

  if (post.parentId === null) return parents;
  return getPostParents(post.parentId, userId);
};
