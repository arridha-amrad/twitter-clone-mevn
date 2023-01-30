import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import { POST_INCLUDED_DATA } from "../post.constants";
import { getPostParents } from "../utils/getPostParents";

const getOnePost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const userId = req.app.locals.userId;
  try {
    const idUser = req.app.locals.userId;
    const storedPost = await prisma.post.findFirst({
      where: {
        id: postId,
      },
      include: {
        ...POST_INCLUDED_DATA,
        children: {
          orderBy: {
            createdAt: "desc",
          },
          include: POST_INCLUDED_DATA,
        },
      },
    });
    if (!storedPost) return res.status(404).json({ message: "post not found" });

    if (storedPost.parentId) {
      const postParents = await getPostParents(storedPost.parentId, userId, []);
      // @ts-ignore
      storedPost["parents"] = postParents;
    }

    const isLiked = await prisma.like.findFirst({
      where: {
        postId,
        userId: idUser,
      },
    });
    const isReposted = await prisma.repost.findFirst({
      where: {
        postId,
        userId,
      },
    });

    // @ts-ignore
    storedPost["isLiked"] = !!isLiked;

    // @ts-ignore
    storedPost["isReposted"] = !!isReposted;

    for (let currPost of storedPost.children) {
      const like = await prisma.like.findFirst({
        where: {
          postId: currPost.id,
          userId: idUser,
        },
      });
      const isReposted = await prisma.repost.findFirst({
        where: {
          postId,
          userId,
        },
      });
      // @ts-ignore
      currPost["isLiked"] = !!like;
      // @ts-ignore
      currPost["isReposted"] = !!isReposted;
    }
    return res.status(200).json({ post: storedPost });
  } catch (err) {
    console.log("err : ", err);
  } finally {
    await prisma.$disconnect();
  }
};

export default getOnePost;
