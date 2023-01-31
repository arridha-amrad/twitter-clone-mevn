import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import { POST_INCLUDED_DATA } from "../post.constants";
import { IPostWithParents } from "../post.types";
import { getPostParents } from "../utils/getPostParents";

const getPosts = async (req: Request, res: Response) => {
  const { limit = "0", skip = "0" } = req.query;
  try {
    const userId = req.app.locals.userId;
    const posts = await prisma.post.findMany({
      take: parseInt(limit as string),
      skip: parseInt(skip as string),
      orderBy: {
        createdAt: "desc",
      },
      include: POST_INCLUDED_DATA,
    });
    const myPosts: IPostWithParents[] = [];
    for (const post of posts) {
      let currentPost: IPostWithParents = {
        ...post,
        isLiked: false,
        isReposted: false,
        parents: [],
        medias: [],
      };
      const isLiked = await prisma.like.findFirst({
        where: {
          postId: post.id,
          userId,
        },
      });
      const isReposted = await prisma.repost.findFirst({
        where: {
          postId: post.id,
          userId,
        },
      });
      const medias = await prisma.media.findMany({
        where: {
          postId: post.id,
        },
      });
      currentPost.medias = medias;
      currentPost.isLiked = !!isLiked;
      currentPost.isReposted = !!isReposted;
      if (currentPost.parentId) {
        const postParents = await getPostParents(
          currentPost.parentId,
          userId,
          currentPost.parents
        );
        currentPost.parents = postParents;
      }
      myPosts.push(currentPost);
    }
    return res.status(200).json({ posts: myPosts });
  } catch (err) {
    console.log("err : ", err);
    return res.status(500).send("Server Error");
  } finally {
    await prisma.$disconnect();
  }
};

export default getPosts;
