import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import { POST_INCLUDED_DATA, QUERY_AUTHOR_DATA } from "../post.constants";
import { getPostParents } from "../utils/getPostParents";
import { checkIsReTweet, findTweet } from "../services/tweetServices";
import { findLike } from "@/modules/post/services/likeServices";
import { IPostWithParentsAndChildren } from "../post.types";

const getOnePost = async (req: Request, res: Response) => {
  const { tweetId } = req.params;
  const userId = req.app.locals.userId;
  try {
    const storedTweet = await prisma.tweet.findFirst({
      where: {
        id: tweetId,
      },
      include: {
        user: {
          select: QUERY_AUTHOR_DATA,
        },
        post: {
          include: {
            ...POST_INCLUDED_DATA,
            children: {
              orderBy: {
                createdAt: "desc",
              },
              include: POST_INCLUDED_DATA,
            },
          },
        },
      },
    });

    if (!storedTweet)
      return res.status(404).json({ message: "post not found" });

    const myPost: IPostWithParentsAndChildren = {
      ...storedTweet.post,
      medias: [],
      children: [],
      parents: [],
      isLiked: false,
      isRetweet: false,
    };

    return res.status(200).json({ tweet: storedTweet });
    // const storedPost = await prisma.post.findFirst({
    //   where: {
    //     id: postId,
    //   },
    //   include: {
    //     ...POST_INCLUDED_DATA,
    //     children: {
    //       orderBy: {
    //         createdAt: "desc",
    //       },
    //       include: POST_INCLUDED_DATA,
    //     },
    //   },
    // });

    // if (!storedTweet) return res.status(404).json({ message: "post not found" });

    // const {post} = storedTweet

    // const myPost: IPostWithParentsAndChildren = {...post, parents: [], isLiked: false, isRetweet: false, medias: []}

    // if (post.parentId) {
    //   const postParents = await getPostParents(post.parentId, userId);
    //   // @ts-ignore
    //   storedPost["parents"] = postParents;
    // }

    // const isLiked = await prisma.like.findFirst({
    //   where: {
    //     postId,
    //     userId,
    //   },
    // });

    // const isRetweet = await checkIsReTweet(post.id, userId)

    // // @ts-ignore
    // storedPost["isLiked"] = !!isLiked;

    // // @ts-ignore
    // storedPost["isRetweet"] = !!isRetweet;

    // for (let currPost of post.children) {
    //   const like = await findLike(currPost.id, userId);
    //   // @ts-ignore
    //   currPost["isLiked"] = !!like;
    //   // @ts-ignore
    //   currPost["isReTweet"] = await checkIsReTweet(currPost.id, userId);
    // }

    // return res.status(200).json({ post: storedPost });
  } catch (err) {
    console.log("err : ", err);
  } finally {
    await prisma.$disconnect();
  }
};

export default getOnePost;
